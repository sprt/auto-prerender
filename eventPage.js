var prerenderingTabs = {
  // tabId: url, ...
};

var prerenderedTabs = {
  // tabId: url, ...
};

chrome.privacy.network.networkPredictionEnabled.set({value: true});

chrome.runtime.onMessage.addListener(function(request, sender, sendMessage) {
  console.log("Received message", request, sender.tab);
  if (request.prerendering !== undefined) {
    prerenderingTabs[sender.tab.id] = request.prerendering;
  } else if (request.prerendered !== undefined) {
    var url = request.prerendered;
    for (var key in prerenderingTabs) {
      if (url == prerenderingTabs[key]) {
        prerenderedTabs[sender.tab.id] = url;
        console.log("Auto Prerender prerendered", url);
      }
    }
  }
});
