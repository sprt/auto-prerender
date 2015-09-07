var WAIT = 200; // in ms

function hasHover(el) {
  return el.parentNode.querySelector(":hover") === el;
}

function stripHash(url) {
  var a = document.createElement("a");
  a.href = url;
  a.hash = "";
  return a.href;
}

function findParentAnchor(el) {
  if (el.tagName == 'A') {
    return el;
  }
  while (el.parentNode !== null) {
    el = el.parentNode;
    if (el.tagName == 'A') {
      return el;
    }
  }
  return null;
}

var lastPrerenderedURL = null;

document.addEventListener("mouseover", function(evt) {
  var anchor = findParentAnchor(evt.target);
  
  if (anchor === null ||
      anchor.tagName != 'A' ||
      anchor.href.trim().length == 0 ||
      anchor.href.startsWith("https") ||
      anchor.href.startsWith("javascript:") ||
      anchor.href == stripHash(window.location.href) + anchor.hash ||
      anchor.href == lastPrerenderedURL) {
    return;
  }
  
  window.setTimeout(function() {
    if (!hasHover(anchor)) {
      return;
    }
    
    var link = document.createElement("link");
    link.rel = "prerender";
    link.href = anchor.href;
    document.head.appendChild(link);
    
    lastPrerenderedURL = anchor.href;
    console.log("Prerendering", anchor.href);
  }, WAIT);
});
