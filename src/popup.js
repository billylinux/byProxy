chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
	var tab = tabs[0];
	if (tab && tab.url && (tab.url.length > 0)) {
		var ip = localStorage.getItem(chrome.extension.getBackgroundPage().parse_url(tab.url));
		document.getElementById('ip').innerText = ip ? ip : "unknow";
	}
}); 