var api = require('alloy').Globals.api();
var xhr = Ti.Network.createHTTPClient();
var loading = require('loading')();

module.exports = function(){
	var _list = function(uf, cb){
		loading.show();
		var uri = api.base+'/'+uf;
		xhr.open('GET', uri);
		xhr.onload = function () {
			var data = JSON.parse(this.responseText);
			cb(null, data);
			loading.hide();
		};
		
		xhr.onerror = function(e) {
			cb(e, null);
			loading.hide();
		};
		xhr.send();
	};
	return {
		list:_list
	};
};