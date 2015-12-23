const NEW_API_FIREFOX_VERSION = 44;
const PAGE_URL = 'http://localhost:3000/';

const { Cc, Ci } = require('chrome');
const { version } = require('sdk/system/xul-app');
const tabs = require('sdk/tabs');
const url = require('sdk/url');
const { viewFor } = require('sdk/view/core');

const newtaboverride = {
	lastClipboardUrl : false,
	timer : false,

	init : function () {
		newtaboverride.override(PAGE_URL);
	},

	override : function (newTabUrl) {
		console.log(version);
		if (version < NEW_API_FIREFOX_VERSION) {
			require('resource:///modules/NewTabURL.jsm').NewTabURL.override(newTabUrl);
		} else {
			const aboutNewTabService = Cc['@mozilla.org/browser/aboutnewtab-service;1'].getService(Ci.nsIAboutNewTabService);

			aboutNewTabService.newTabURL = newTabUrl;
		}
	},

	reset : function () {
		if (version < NEW_API_FIREFOX_VERSION) {
			require('resource:///modules/NewTabURL.jsm').NewTabURL.reset();
		} else {
			const aboutNewTabService = Cc['@mozilla.org/browser/aboutnewtab-service;1'].getService(Ci.nsIAboutNewTabService);

			aboutNewTabService.resetNewTabURL();
		}
	}
};

tabs.on('ready', function (tab) {
	if (tab.url === PAGE_URL) {
		// Clear URL from location bar
		var iOService = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
		var newuri = iOService.newURI('about:blank', null, null);
		viewFor(tab).linkedBrowser.webNavigation.setCurrentURI(newuri);
	}
	// var newuri = Services.io.newURI('http://www.bing.com/', null, null);
});

const main = () => {
	newtaboverride.init();
};

exports.main = main;

exports.onUnload = function (reason) {
	if (reason === 'uninstall' || reason === 'disable') {
		newtaboverride.reset();
	}
};
