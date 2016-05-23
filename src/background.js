function parse_url(l_url) {
	return l_url.replace(/^(([^:/?#]+):)?(\/\/([^/?#]*)|\/\/\/)?([^?#]*)(\\?[^#]*)?(#.*)?/,'$3').replace('//', '');
}

function set_badge(ip) {
	if(!ip){
		chrome.browserAction.setIcon({path: {'19': 'icon_gray.png'}});
	}else if(ip == '127.0.0.1'){
		chrome.browserAction.setIcon({path: {'19': 'icon_red.png'}});
	}else{
		chrome.browserAction.setIcon({path: {'19': 'icon_green.png'}});
	}
}

function update_current_tab () {
	chrome.tabs.query({active: true}, function (tabs) {
		var tab = tabs[0];
		if (tab && tab.url && (tab.url.length > 0)) {
			set_badge(localStorage.getItem(parse_url(tab.url)));
		}

	}); 
}

chrome.webRequest.onCompleted.addListener(function (d) {
	if (d.url && d.ip) {
		try {
			localStorage.setItem(parse_url(d.url), d.ip);
		} catch (e) {
			// storage full - figure out how to delete 'old' url's
		}
		update_current_tab();
	}
}, {'urls' : [], 'types' : ['main_frame']});

chrome.tabs.onUpdated.addListener(function (tab_id, tab) {
	update_current_tab();
});

chrome.tabs.onActivated.addListener(function (active_info) {
	update_current_tab();
});

chrome.windows.onFocusChanged.addListener(function (window_id) {
	update_current_tab();
});
