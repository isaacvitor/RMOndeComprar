var api = require('alloy').Globals.api();
var loading = require('loading')();

module.exports = (function(){
	var _listTypes = function(uf,cidade, cb){
		loading.show();
		var xhr = Ti.Network.createHTTPClient();
		var uri = api.base+'/'+uf + '/' + cidade;
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
	
	var _list = function(uf,cidade, idTipo, cb){
		loading.show();
		var xhr = Ti.Network.createHTTPClient();
		var uri = api.base+'/'+uf + '/' + cidade + '/' + idTipo;
		xhr.open('GET', uri);
		xhr.onload = function () {
			//Ti.API.info(this.responseText);
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
	
	var _get = function(uf,cidade, idTipo, idCredenciado, cb){
		loading.show();
		var xhr = Ti.Network.createHTTPClient();
		var uri = api.base+'/'+uf + '/' + cidade + '/' + idTipo + '/' +idCredenciado;
		xhr.open('GET', uri);
		xhr.onload = function () {
			//Ti.API.info(this.responseText);
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
		listTypes:_listTypes
		,list:_list
		,get:_get
	};
})();
