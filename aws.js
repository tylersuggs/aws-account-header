function onError(error) {
  console.log(`Error: ${error}`);
}

function getForegroundColors(bgColor) {
  var fgColors[];
  
  fgColors[0] = (bgColor.r * 299 + bgColor.g * 587 + bgColor.b * 114) / 1000 > 125 ? '#000000' : '#FFFFFF';
  fgColors[1] = fgColor[0] == '#000000' ? '#CCCCCC' : '#000000';
  
  return fgColors
}

function onGot(item) {
  var acct = document.getElementById("awsc-login-display-name-account")
    .textContent;
  if (item.hasOwnProperty(acct)) {
    document
      .querySelectorAll(
        "body #awsgnav #nav-menubar, body #awsgnav #nav-menubar .nav-menu, #nav-menu-right"
      )
      .forEach(function(ele) {
        ele.style.backgroundColor = item[acct];
      });
    
    var foreground = getForgroundColors(item[acct]);
    
    document
      .querySelectorAll(
        "body #awsgnav #nav-menubar"
      )
      .forEach(function(ele) {
        ele.style.textShadow.color = foreground[0];
      });
  }
}

if (chrome) {
  chrome.storage.sync.get(onGot);
} else {
  browser.storage.sync.get().then(onGot, onError);
}
