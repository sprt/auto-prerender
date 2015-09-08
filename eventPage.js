chrome.privacy.network.networkPredictionEnabled.set({value: true});

chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
  chrome.tabs.get(addedTabId, function(addedTab) {
    console.log("Replaced tab", addedTabId, addedTab);
  });
});
