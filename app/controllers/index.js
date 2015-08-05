var credenciadoService = require('services/credenciado');
var prefIsOpen = false;

function listCategorias(uf, cidade){
	credenciadoService.listTypes(uf, cidade, function(err, tipos){
		if(err){ Ti.API.info(err);loading.hide();return;}
		var i = 0;
		tipos.forEach(function(tipo){
			tipo.id = i; i++;
			tipo.ico = 'images/ico_' + tipo.codigo + '.png';
		});
		Alloy.Collections.TiposCredenciados.reset(tipos); 
	});
}

function initConfigPref(){
	var uf = Ti.App.Properties.getString('uf');
	var cidade = Ti.App.Properties.getString('cidade');
	
	Ti.API.info("uf: "+ uf);
	Ti.API.info("cidade: "+ cidade);
	
	if(uf == null || cidade == null){
		openPref();
	}else{
		listCategorias(uf, cidade);
	}
	
}

var openPref = Alloy.Globals.openPref;

$.index.addEventListener('open', function(){
	prefIsOpen = true;
	initConfigPref();
	
});

$.index.addEventListener('focus', function(){
	if(!prefIsOpen){
		initConfigPref();		
	}else{
		prefIsOpen = false;
	}
});

$.index.open();