var codigoCategoria = arguments[0] || {};
var credenciadoService = require('services/credenciado');


function listCredenciados(){
	var uf = Ti.App.Properties.getString('uf');
	var cidade = Ti.App.Properties.getString('cidade');
	Ti.API.info(JSON.stringify(codigoCategoria));
	credenciadoService.list(uf,cidade, codigoCategoria, function(err, credenciados){
		if(err){ Ti.API.error(err);return;}
		Alloy.Collections.Credenciados.reset(credenciados); 
		Alloy.Collections.CredenciadosFiltrados.reset(credenciados);
	});
}

function closeWindow(e){
	$.credenciadosWindow.close();
}

$.credenciadosWindow.addEventListener("open", function() {
	//var actionbar = $.credenciadosWindow.activity.actionBar;
	//actionbar.navigationMode = 1; //Ativa uma espécie de menu no titulo 
	//Ti.API.info( JSON.stringify(actionbar) );//
	listCredenciados();
});

function filtroBairro(e) {
	var bairro = e.value.toUpperCase();
	var filtrados = [];
	var credenciados = Alloy.Collections.Credenciados.toJSON();
	if(e.value.length){
		credenciados.forEach(function(i){
			if(i.bairro.indexOf(bairro) != -1 ){
				filtrados.push(i);
			}
		});

		Alloy.Collections.CredenciadosFiltrados.reset(filtrados);
		return;
	}
	Alloy.Collections.CredenciadosFiltrados.reset(credenciados);
}

function openCredenciadoDetail(e){
	Ti.API.info(JSON.stringify(e.rowData.credenciado_id));
	var credenciadoID = e.rowData.credenciado_id;
	var ctrl = Alloy.createController('credenciadoDetail', {credenciadoID:credenciadoID, codigoCategoria:codigoCategoria});
	ctrl.getView().open();
}
