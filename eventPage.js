var tabs = [];

chrome.privacy.network.networkPredictionEnabled.set({value: true});

chrome.runtime.onMessage.addListener(function(message, sender, sendMessage) {
  console.log("Received message", message, sender.tab);
  
  switch(message.type) {
    case "prerendering":
      tabs.push({
        prerenderingTabId: sender.tab.id,
        url: message.payload.url,
        prerenderedTabId: null,
        loadedTime: null,
        navigatedTime: null
      });
      break;
    
    case "prerendered":
      tabs.forEach(function(tab, i, arr) {
        if (message.payload.url === tab.url) {
          arr[i].prerenderedTabId = sender.tab.id;
        }
      });
      break;
    
    case "tabLoaded":
      tabs.forEach(function(tab, i, arr) {
        if (sender.tab.id === tab.prerenderedTabId) {
          arr[i].loadedTime = message.payload.time;
        }
      });
      break;
    
    case "tabNavigated":
      tabs.forEach(function(tab, i, arr) {
        if (sender.tab.id === tab.prerenderedTabId) {
          arr[i].navigatedTime = message.payload.time;
        }
      });
      break;
    
    default:
      throw "Unknown message type";
  }
});
