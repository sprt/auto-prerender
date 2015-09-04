document.addEventListener("mouseover", function(evt) {
  var el = evt.target;
  
  // TODO: ignore links to anchors in this page
  // TODO: ignore HTTPs
  if (el.tagName != 'A' || el.href.trim().length == 0 ||
      el.href.startsWith("javascript:")) {
    return;
  }
  
  // TODO: no dupe prerenders
  // TODO: fifo
  var link = document.createElement("link");
  link.rel = "prerender";
  link.href = el.href;
  document.head.appendChild(link);
  
  console.log("Prerendering", el.href);
});
