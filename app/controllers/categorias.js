var args = arguments[0] || {};
var credenciadoService = require('services/credenciado');
var openPref = Alloy.Globals.openPref;

function openListCredenciados(e){
	var codigoCategoria = e.rowData.codigo;
	var ctrl = Alloy.createController('credenciados', codigoCategoria);
	$.categoriasTab.open(ctrl.getView());
}

function filtroBairro(collection) {
	return collection.where({bairro:'IMBUI'});
}

$.categoriaWindow.addEventListener('open',function(e){
	//$.aload.show();
});
