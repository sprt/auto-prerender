var WAIT = 200; // in ms

function hasHover(el) {
  return el.parentNode.querySelector(":hover") === el;
}

document.addEventListener("mouseover", function(evt) {
  var el = evt.target;
  
  // TODO: ignore links to anchors in this page
  if (el.tagName != 'A' || el.href.trim().length == 0 ||
      el.href.startsWith("https") || el.href.startsWith("javascript:")) {
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
