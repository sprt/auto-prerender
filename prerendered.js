function onLoad() {
  if (document.visibilityState != "prerender") {
    return;
  }
  chrome.runtime.sendMessage({
    type: "loaded",
    payload: {url: window.location.href}
  });
  window.removeEventListener("load", onLoad);
}

function onVisibilityChange() {
  // XXX: (2015-09-09) When opening a new tab, Chrome isn't firing the
  // prerender -> hidden event until when the tab is actually visible.
  if (["visible", "hidden"].indexOf(document.visibilityState) == -1) {
    return;
  }
  chrome.runtime.sendMessage({
    type: "clicked",
    payload: {url: window.location.href}
  });
  document.removeEventListener("visibilitychange", onVisibilityChange);
}

window.addEventListener("load", onLoad);
document.addEventListener("visibilitychange", onVisibilityChange);

if (document.visibilityState == "prerender") {
  chrome.runtime.sendMessage({
    type: "prerendered",
    payload: {url: window.location.href}
  });
}
