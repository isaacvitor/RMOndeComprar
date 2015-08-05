var args = arguments[0] || {};

$.favoritosWindow.addEventListener('open', function(){
	Alloy.Collections.Favoritos.fetch();
});

function openCredenciadoDetail(e){
	var ctrl = Alloy.createController('credenciadoDetail', {idCredenciado:e.rowData.credenciado_id});
	ctrl.getView().open();
}