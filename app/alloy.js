// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Globals.api = function(){
	var url = "Coloque aqui a uri da API";
	return {
		base:url + '/credenciado'
	};
};


Alloy.Collections.UFs = new Backbone.Collection();
Alloy.Collections.Cidades = new Backbone.Collection();
Alloy.Collections.TiposCredenciados = new Backbone.Collection();
Alloy.Collections.Credenciados = new Backbone.Collection();
Alloy.Collections.CredenciadosFiltrados = new Backbone.Collection();
Alloy.Collections.Credenciado = new Backbone.Collection();
Alloy.Collections.Favoritos = Alloy.createCollection('favoritos');

Alloy.Globals.openPref = function(){
	var ctrl = Alloy.createController('preferencias');
	if (OS_IOS) {
		var navWin = Ti.UI.iOS.createNavigationWindow({
			modal: true,
			window: ctrl.getView()
		});
		ctrl.navWin = navWin;
		navWin.open();
	} else {
		ctrl.getView().open();
	}
};