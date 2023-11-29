let id1;
let url2;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function windower(tabs) {
    chrome.windows.update(tabs[0].windowId,{focused:false}).then(() => {sleep(1984).then(() => {
        windower(tabs);
    });
    });
}
function listeners(url1,tabs) {
chrome.tabs.onActivated.addListener((id1,id2) => {
    sleep(250).then(() => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let id = tabs[0].id;
	let url2 = tabs[0].url;
	if (url2 != url1 && String(url2.slice(0,30)) != "https://docs.google.com/forms/" && String(url2.slice(0,20)) != "chrome://extensions/" && String(url2.slice(0,22)) != "docs.google.com/forms/") {
            /*
            chrome.notifications.create('', {
                title: 'Tab has been closed',
                message: url1 + ' '+ url2,
                iconUrl: '/chrome.png',
                type: 'basic'
            });
            */
            chrome.tabs.remove(id);
        } else {
            /*
            chrome.notifications.create('', {
                title: 'Tab has not been closed',
                message: url1 + ' '+ url2,
                iconUrl: '/chrome.png',
                type: 'basic'
            });
            */
        }
    });
    });
});
let active = true;
chrome.windows.onBoundsChanged.addListener(() => {
    if (!active) { return; }
	active = false;
	sleep(250).then(() => {
            chrome.windows.update(tabs[0].windowId,{state:"maximized"});
	    chrome.windows.update(tabs[0].windowId,{state:"fullscreen",focused:true});
	    active = true;
        });
    });
    chrome.windows.onFocusChanged.addListener(() => {
	if (!active) { return; }
	active = false;
	sleep(250).then(() => {
            chrome.windows.update(tabs[0].windowId,{state:"maximized"});
	    chrome.windows.update(tabs[0].windowId,{state:"fullscreen",focused:true});
	    active = true;
        });	    
    });
}
var activate = true;
chrome.runtime.onMessage.addListener(() => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        url1 = (' ' + tabs[0].url).slice(1);
        id1 = tabs[0].id;
        chrome.notifications.create('', {
            title: url1,
            message: 'Tab has been locked',
            iconUrl: '/chrome.png',
            type: 'basic'
        });
        if (activate) { 
	    chrome.windows.update(tabs[0].windowId,{state:"fullscreen"});
            chrome.windows.update(tabs[0].windowId,{state:"maximized"});
            chrome.windows.update(tabs[0].windowId,{state:"fullscreen"});
        }
        activate = false;
        listeners(url1,tabs);
        windower(tabs);
    }); 
});
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    windower(tabs);
});

