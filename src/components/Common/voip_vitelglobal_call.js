function loadreq() {
  var req = false;
  req = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new window.ActiveXObject("microsoft.XMLHTTP");
  return req;
}

function loadviapost(url, id, parameters) {
  var req = loadreq();
  if (req) {
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
      }
    };
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send(parameters);
  }
}

export const clicktocal = (fromnum, tonum) => {
  var poststr =
    "fromnum=" + fromnum + "&tonum=" + tonum + "&vitelusername=ramk";
  loadviapost(
    "https://billing.vitelglobal.com/clicktocall/index.php",
    "",
    poststr
  );
};
