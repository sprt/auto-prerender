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

document.addEventListener("mouseover", function(evt) {
  var el = evt.target;
  
  if (el.tagName != 'A' || el.href.trim().length == 0 ||
      el.href.startsWith("https") || el.href.startsWith("javascript:") ||
      el.href == stripHash(window.location.href) + el.hash) {
    return;
  }
  
  // TODO: no dupe prerenders
  // TODO: fifo
  window.setTimeout(function() {
    if (!hasHover(el)) {
      return;
    }
    
    var link = document.createElement("link");
    link.rel = "prerender";
    link.href = el.href;
    document.head.appendChild(link);
    
    console.log("Prerendering", el.href);
  }, WAIT);
});
