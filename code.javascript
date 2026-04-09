//Declare Variables
// Username and Password Section
var loginInfoU = getColumn("LoginInfo", "Username");
var loginInfoP = getColumn("LoginInfo", "Password");
var playBoiFaces = getColumn("playBoiFaces", "Face");
var playBoiLabels = getColumn("playBoiFaces", "FaceName");
var userLevels = getColumn("LoginInfo", "Level");
var punches = getColumn("LoginInfo", "punches");
var ids = getColumn("LoginInfo", "id");
var MaxLevel = getColumn("LoginInfo", "MaxLevel");
// Game Act 1 Section
var hits = 0;
var level = 0;
var levelGallery = 1;
var healthBar = ["5.png", "4.png", "3.png", "2.png", "1.png", "0.png"];
var healthDecrease = 1;
var gameUsername = "";
var gamePassword = "";
var id = 0;
var punchesIndex = 0;
var punch = 0;
var indexGallery = 0;
// sign up section

//Social Media Section
var galleryImages = getColumn("RandomImages", "randomImages");
var galleryName = getColumn("RandomImages", "randomName");
var index = 0;

hideElement("error");

onEvent("newBetaSignUp", "click", function( ) {
  BooRadleyDidIt.updateScreen("betaSignUpScreen", "functionFiller", "play.gif");
});


onEvent("signUpBtn", "click", function( ) {
  
  var betaUsername = getText("betaUsername");
  var betaPassword = getText("betaPassword");
  var usernameExists = false;

    for (var i = 0; i < loginInfoU.length; i++) {
      if (betaUsername == loginInfoU[i]) {
        usernameExists = true;
        break;
     }
     if (betaUsername == "" || betaPassword == "") {
        usernameExists = true; 
        break;
     } 
    }

    if (!usernameExists && betaPassword == getText("betaReEnterPassword")) {
      createRecord("LoginInfo", {Username: betaUsername, Password: betaPassword, Level: 1, punches: 0, MaxLevel: levelGallery}, function() {
      });
      BooRadleyDidIt.updateScreen("startGameScreen", "functionFiller", "check.png");
      level = 1;
      gameUsername = getText("betaUsername");
      gamePassword = getText("betaPassword");
      id = ids[ids.length-1];
      id++;
      punchesIndex = ids.length-1;
      punchesIndex++;
      levelGallery = 1;
    } else if (usernameExists) {
      showElement("error");
      setText("error", "Username Exists or credentials empty");
    } else {
      showElement("error");
      setText("error", "perhaps you re-entered password wrong");
    }
});


// login section

hideElement("loginError");

onEvent("betaLogin", "click", function( ) {
  BooRadleyDidIt.updateScreen("userLoginScreen", "functionFiller", "play.gif");
});

onEvent("logInBtn", "click", function( ) {
  var Username = getText("Username");
  var Password = getText("Password");
  for (var i = 0; i < loginInfoU.length; i++) {
      if (Username == loginInfoU[i] && Password == loginInfoP[i]) {
        BooRadleyDidIt.updateScreen("startGameScreen", "functionFiller", "play.gif");
        level = userLevels[i];
        levelGallery = MaxLevel[i];
        gameUsername = getText("Username");
        gamePassword = getText("Password");
        id = ids[i];
        punchesIndex = i;
        punch = punches[punchesIndex];
        playSound("ytmp3.co.za---purple-drip-boy-----34-Let--39-s-Go-Gambling--34--x-X-Slide-(Full-TikTok-Remix)--made-by-purple-drip-boy-.mp3", true);
        break;
     }else{
       showElement("loginError");
     }
  }
});

// gameplay ACT 1

hideElement("comebackLbl");
hideElement("youWin");

onEvent("startBtn", "click", function( ) {
  if (level <= playBoiFaces.length-1) {
      hideElement("youWin");
      showElement("playboiImg");
      showElement("healthBar");
      BooRadleyDidIt.updateScreen("gameScreen", "playboiImg", playBoiFaces[level]);
      BooRadleyDidIt.updateScreen("gameScreen", "healthBar", healthBar[0]);
    } else { // fix later
      setScreen("gameScreen");
      showElement("youWin");
      hideElement("playboiImg");
      hideElement("healthBar");
    } 
  
});

onEvent("playboiImg", "click", function( ) {
  punch++;
  updateRecord("LoginInfo", {id: id, Username: gameUsername, Password: gamePassword, Level: level, punches: punch, MaxLevel: levelGallery}, function() {
  });
  
  
  timedLoop(500, function() {
    setPosition("playboiImg",0 ,15, 295, 245);
    timedLoop(1000, function( ) {
      setPosition("playboiImg", 15, 15, 285, 215);
      stopTimedLoop();
    });
  });
  
  hits++;
  
  for (var i = 1; i <= level; i++) {
    var threshold = i + 5; // Adjust the threshold based on the level

    while (hits >= threshold) {
      BooRadleyDidIt.updateScreen("gameScreen", "healthBar", healthBar[0 + healthDecrease]);
      hits = 0;
      healthDecrease++;
    }
}


  if (healthDecrease >= healthBar.length-1) {
    healthDecrease = 0;
    level++;
    levelGallery = level;
    updateRecord("LoginInfo", {id: id, Username: gameUsername, Password: gamePassword, Level: level+1, punches:punch, MaxLevel: levelGallery}, function() {
    });
    if (level <= playBoiFaces.length-1) {
      BooRadleyDidIt.updateScreen("gameScreen", "playboiImg", playBoiFaces[level]);
      BooRadleyDidIt.updateScreen("gameScreen", "healthBar", healthBar[0]);
    } else {
      hideElement("playboiImg");
      hideElement("healthBar");
      showElement("youWin");
    }
  }

  
});

onEvent("backToHmPage", "click", function( ) {
  if (level > playBoiFaces.length-1) {
    updateRecord("LoginInfo", {id: id, Username: gameUsername, Password: gamePassword, Level: 1, punches: punch, MaxLevel: levelGallery}, function() {
    });
    level = 1;
    BooRadleyDidIt.updateScreen("startGameScreen", "welcomeBackImg", "welcomeBack.png");
  } else {
    BooRadleyDidIt.updateScreen("startGameScreen", "welcomeBackImg", "welcomeBack.png");
  }
});

onEvent("backToGame", "click", function( ) {
  setScreen("startGameScreen");
  if (level > playBoiFaces.length-1) {
    updateRecord("LoginInfo", {id: id, Username: gameUsername, Password: gamePassword, Level: 1, punches: punch, MaxLevel: levelGallery}, function() {
    });
    level = 1;
    BooRadleyDidIt.updateScreen("startGameScreen", "welcomeBackImg", "welcomeBack.png");
  } else {
    BooRadleyDidIt.updateScreen("startGameScreen", "welcomeBackImg", "welcomeBack.png");
  }
});

onEvent("backToGameGallery", "click", function( ) {
  setScreen("startGameScreen");
  if (level > playBoiFaces.length-1) {
    level = 1;
    updateRecord("LoginInfo", {id: id, Username: gameUsername, Password: gamePassword, Level: 1, punches: punch, MaxLevel: levelGallery}, function() {
    });
    BooRadleyDidIt.updateScreen("startGameScreen", "welcomeBackImg", "welcomeBack.png");
  } else {
    BooRadleyDidIt.updateScreen("startGameScreen", "welcomeBackImg", "welcomeBack.png");
  }
});


onEvent("settingsMiddle", "click", function( ){
  BooRadleyDidIt.updateScreen("statsScreen", "userImage", "icon://fa-user");
  StatItUp("You can look at your stats later, Just get back to the game by clicking the bottom button.");
});

onEvent("galleryInGame", "click", function( ) {
  BooRadleyDidIt.updateScreen("galleryScreen", "faceDisplay", "Screenshot-2023-11-27-9.38.34-AM.png");
  galleryViewer(0);
});

onEvent("galleryBeginning", "click", function( ) {
  BooRadleyDidIt.updateScreen("galleryScreen", "faceDisplay", "Screenshot-2023-11-27-9.38.34-AM.png");
  galleryViewer(0);
});

onEvent("Next", "click", function( ) {
  galleryViewer(1);
});

onEvent("Back", "click", function( ) {
  galleryViewer(-1);
});

onEvent("settingsEnd", "click", function( ){
  BooRadleyDidIt.updateScreen("statsScreen", "userImage", "icon://fa-user");
  StatItUp("Can we get a 100% for this project??");
});


function StatItUp(Message) {
  setText("usernameSettingslbl", gameUsername);
  setText("infolbl", Message);
  if (punch >= 200) {
    setText("punchScore", "PUNCHES: " + punch);
    setProperty("punchScore", "text-color", "red");
    
  } else {
    setText("punchScore", "PUNCHES: " + punch);
    setProperty("punchScore", "text-color", "gray");
  }
  for(var i = 1; i <= 4; i++) {
    setImageURL("faceCollected" + i, playBoiFaces[i]);
  }
}

function galleryViewer(turn) {
  var facesEarned = [];
  var lblsEarned = [];
  indexGallery = indexGallery + turn;
  

  for (var i = 1; i < levelGallery; i++) {
    appendItem(facesEarned,playBoiFaces[i]); 
    appendItem(lblsEarned, playBoiLabels[i]); 
  }

  if (indexGallery > facesEarned.length-1) {
    indexGallery = 0;
  }

  if (facesEarned.length < 1) {
    showElement("comebackLbl");
    return;
  }

  if (indexGallery < 0) {
    indexGallery = facesEarned.length-1;
  }

  hideElement("comebackLbl");
  setImageURL("faceDisplay", facesEarned[indexGallery]);
  setText("faceNamelbl", lblsEarned[indexGallery]);
}

onEvent("socialMediabtn", "click", function( ) {
  setScreen("Post");
  
});

onEvent("Back", "click", function( ) {
  setScreen("startGameScreen");
});


// the stuff



onEvent("selectPhoto", "change", function( ) {
  var photo = getImageURL("selectPhoto");
  setImageURL("photo", photo);
});

onEvent("nextbtn", "click", function( ) {
  setScreen("gallery");
  var photo = getImageURL("selectPhoto");
  var name = getText("enterName");
  createRecord("RandomImages", {randomImages:photo, randomName:name}, function() {
    galleryImages = getColumn("RandomImages", "randomImages");
    galleryName = getColumn("RandomImages", "randomName");
  });
});

onEvent("left", "click", function( ) {
  leftRight("left");
});

onEvent("right",  "click", function( ) {
  leftRight("right");
});

function leftRight(type) {
  if(type == "left") {
    if(index == 0) {
      index = galleryName.length-1;
      Display();
    } else {
      index--;
      Display();
    }
    
  } else {
    if(index == galleryName.length-1) {
      index = 0;
      Display();
    }else {
      index++;
      Display();
    }
  }
}


function Display() {
  setImageURL("galleryImage", galleryImages[index]);
  setText("label2", galleryName[index]);
}
