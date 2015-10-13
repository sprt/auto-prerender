function onload() {
  chrome.runtime.sendMessage({
    type: "tabLoaded",
    payload: {
      url: window.location.href,
      time: window.performance.now()
    }
  });
  window.removeEventListener("load", onload);
}

window.addEventListener("load", onload);

function onvisibilitychange() {
  // NOTE: Chrome doesn't fire the `prerender` -> `hidden` event
  // properly for background tabs.  It's fired just before `visible`
  // event instead (which is fired properly).
  // This means `payload.time` will be inaccurate for background tabs;
  // it'll represent the time when the tab was first visible, instead
  // of when it was spawned.
  if (["hidden", "visible"].indexOf(document.visibilityState) === -1) {
    return;
  }
  chrome.runtime.sendMessage({
    type: "tabNavigated",
    payload: {
      url: window.location.href,
      time: window.performance.now()
    }
  });
  document.removeEventListener("visibilitychange", onvisibilitychange);
}

document.addEventListener("visibilitychange", onvisibilitychange);

if (document.visibilityState === "prerender") {
  chrome.runtime.sendMessage({
    type: "tabPrerendered",
    payload: {url: window.location.href}
  });
}
