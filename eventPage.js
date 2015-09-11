var tabs = [];

chrome.privacy.network.networkPredictionEnabled.set({value: true});

chrome.runtime.onMessage.addListener(function(message, sender, sendMessage) {
  console.log("Received message", request, sender.tab);
  
  switch(message.type) {
    case "prerendering":
      tabs.push({
        prerenderingTabId: sender.tab.id,
        url: message.payload.url,
        prerenderedTabId: null
      });
      break;
    
    case "prerendered":
      tabs.forEach(function(tab, i) {
        if (message.payload.url === tab.url) {
          tabs[i].prerenderedTabId = sender.tab.id;
          console.log("Prerendered:", url)
        }
      });
      break;
    
    case "loaded":
    case "clicked":
      // ...
      break;
    
    default:
      throw "Unknown message type";
  }
});
