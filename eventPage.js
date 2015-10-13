// http://stackoverflow.com/a/8809472/407054
function uuid() {
  var d = Date.now();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

var tabs = [];

chrome.privacy.network.networkPredictionEnabled.set({value: true});

chrome.runtime.onMessage.addListener(function(message, sender, sendMessage) {
  console.log("Received message", message, sender.tab);
  
  switch(message.type) {
    case "tabPrerendering":
      var id = uuid();
      tabs.push({
        id: id,
        prerenderingTabId: sender.tab.id,
        url: message.payload.url,
        prerenderedTabId: null,
        loadedTime: null,
        navigatedTime: null
      });
      window.setTimeout(function() {
        tabs.forEach(function(tab, i, arr) {
          if (tab.id === id) {
            arr.splice(i, 1);
          }
        });
      }, 60000);
      break;
    
    case "tabPrerendered":
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
