function onError(error) {
  console.log(`Error: ${error}`);
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
  }
}

if (chrome) {
  chrome.storage.sync.get(onGot);
} else {
  browser.storage.sync.get().then(onGot, onError);
}
