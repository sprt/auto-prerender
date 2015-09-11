var WAIT = 200; // in ms

var lastPrerenderedURL = null;

var prerenderLink = document.createElement("link");
prerenderLink.rel = "prerender";

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
    
    if (lastPrerenderedURL !== null) {
      document.head.removeChild(prerenderLink);
    }
    
    prerenderLink.href = anchor.href;
    document.head.appendChild(prerenderLink);
    
    lastPrerenderedURL = anchor.href;
    
    chrome.runtime.sendMessage({
      type: "prerendering",
      payload: {url: anchor.href}
    });
    
    console.log("Prerendering", anchor.href, tab.id);
  }, WAIT);
});
