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

var lastPrerenderedURL = null;

document.addEventListener("mouseover", function(evt) {
  var el = evt.target;
  
  if (el.tagName != 'A' || el.href.trim().length == 0 ||
      el.href.startsWith("https") || el.href.startsWith("javascript:") ||
      el.href == stripHash(window.location.href) + el.hash ||
      el.href == lastPrerenderedURL) {
    return;
  }
  
  window.setTimeout(function() {
    if (!hasHover(el)) {
      return;
    }
    
    var link = document.createElement("link");
    link.rel = "prerender";
    link.href = el.href;
    document.head.appendChild(link);
    
    lastPrerenderedURL = el.href;
    console.log("Prerendering", el.href);
  }, WAIT);
});
