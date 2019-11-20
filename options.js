var accountsList;
var accountInput;
var colorInput;

var accountStore = {};

var dataAccountName = "data-account-name";
var dataColor = "data-color";

function upsertAccount(acct, color, load) {
  accountStore[acct] = color;
  if (!load) {
    if (chrome) {
      chrome.storage.sync.set(accountStore);
    } else {
      browser.storage.sync.set(accountStore);
    }
  }
}

function removeAccount(acct) {
  delete accountStore[acct];
  if (chrome) {
    chrome.storage.sync.remove(acct);
  } else {
    browser.storage.sync.remove(acct);
  }
}

function newAccountEle(name, color) {
  var li = document.createElement("li");
  li.setAttribute(dataAccountName, name);
  li.setAttribute(dataColor, color);
  var t = document.createTextNode(name);
  var c = document.createElement("INPUT");
  c.setAttribute("type", "color");
  c.value = color;
  li.appendChild(c);
  li.appendChild(t);
  if (name === "" || color === "") {
    console.log("must supply name and color");
    return;
  } else {
    accountsList.appendChild(li);
  }
  zero();
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  span.onclick = function() {
    var par = this.parentElement;
    removeAccount(par.getAttribute(dataAccountName));
    par.style.display = "none";
  };
  c.onchange = function() {
    var par = this.parentElement;
    upsertAccount(par.getAttribute(dataAccountName), this.value);
    par.setAttribute(dataColor, this.value);
  };
}

function zero() {
  accountInput.value = "";
  colorInput.value = "#ffffff";
}

function restoreOptions() {
  function setCurrent(result) {
    for (var acct in result) {
      if (!result.hasOwnProperty(acct)) continue;
      var color = result[acct];
      upsertAccount(acct, color, true);
      newAccountEle(acct, color);
    }
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  if (chrome) {
    chrome.storage.sync.get(setCurrent);
  } else {
    browser.storage.sync.get().then(setCurrent, onError);
  }
}

function init() {
  accountsList = document.getElementById("accounts");
  accountInput = document.getElementById("account");
  colorInput = document.getElementById("color");
  zero();
  restoreOptions();
}

function addAccount(e) {
  e.preventDefault();
  upsertAccount(accountInput.value, colorInput.value);
  newAccountEle(accountInput.value, colorInput.value);
}

document.addEventListener("DOMContentLoaded", init);
document.querySelector("form").addEventListener("submit", addAccount);
