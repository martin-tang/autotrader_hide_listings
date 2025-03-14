var elClassName =
  "col-xs-12 result-item enhanced   priority-qa listing-redesign-dt";
var elArray;
var usrSettingHideHi;

chrome.storage.sync.get(["ath_setting_hide_highlight"]).then((result) => {
  console.log("Value is " + result.ath_setting_hide_highlight);
  usrSettingHideHi = result.ath_setting_hide_highlight;
  console.log(typeof usrSettingHideHi);
  console.log(usrSettingHideHi);
  logic();
});

navigation.addEventListener("navigate", (e) => {
  elArray = document.getElementsByClassName(elClassName);
  console.log("event listener fired.");
  logic();
});

if (!document.getElementsByClassName) {
  elArray = findElements(elClassName);
} else {
  elArray = document.getElementsByClassName(elClassName);
}

function logic(){
    if (usrSettingHideHi) {
        if (usrSettingHideHi == "highlight") {
          console.log("pinking");
          pinkify(elArray);
        } else if (usrSettingHideHi == "hide") {
          console.log("hiding");
          hideify(elArray);
        } else {
          console.log(
            "Autotrader.ca Extension: Hide/Highlighter encountered an error. Contact developer for assistance."
          );
        }
      }
}

// functions

function findElements(name) {
  var elArray = [];
  var tmp = document.getElementsByClassName(elClassName);
  var regex = new RegExp(
    "^.*" +
      "col-xs-12 result-item enhanced   priority-qa listing-redesign-dt" +
      ".*$"
  );
  console.log("check here" + tmp);
  for (var i = 0; i < tmp.length; i++) {
    if (regex.test(tmp[i].name)) {
      elArray.push(tmp[i]);
      console.log("Found one!");
    }
  }
  return elArray;
}
function pinkify(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].children[1].style.background = "pink";
  }
}
function hideify(arr) {
    console.log(arr);
  for (var i = 0; i < arr.length; i++) {
    arr[i].children[1].style.background = "blue";
    arr[i].innerHTML="<div></div>";
  }
}
