var args = arguments[0] || {};
var credenciadoService = require('services/credenciado');

var isFav = false;
var credenciadoFavorito = {};

function closeWindow(e){
	$.credenciadoDetailWindow.close();
}

function getCredenciado(codigoCategoria, credenciadoID){
	var uf = Ti.App.Properties.getString('uf');
	var cidade = Ti.App.Properties.getString('cidade');
	
	credenciadoService.get(uf,cidade, codigoCategoria, credenciadoID, function(err, credenciado){
		if(err){ Ti.API.error(err);return;}
		
		Ti.API.info(JSON.stringify(credenciado) ); 
		credenciadoFavorito = credenciado[0];
		setCredenciado(credenciado[0]);
	});
}

function setCredenciado(cred){
	$.labFantasia.setText( cred.fantasia );
	$.labRazao.setText( cred.razaoSocial );
	$.labEndereco.setText( cred.endereco );
	$.labBairro.setText( cred.bairro );
	$.labComplemento.setText( cred.complemento );
	
	for(i = 0; i < cred.telefones.length; i++){
		var labTelefone = Titanium.UI.createLabel({
		    text: cred.telefones[i],
		    tel: cred.telefones[i],
		    color: '#FF6600',
		    font: {
		        fontSize: 16,
		        fontWeight: 'normal'
		    },
		    width: 'auto',
		    textAlign: 'left',
		    top: 3,
		    left:15,
		    height: 'auto'
		});
		labTelefone.addEventListener("click", function(e){
			ligarPara("0"+ e.source.text);
		});
		$.vwTelefones.add(labTelefone);
	}
	Ti.API.info(JSON.stringify(cred.telefones) );
}

/*** INI Tratamento favorito ***/
	function doActionFavoritos(){
		if(isFav){
			removeFavorito();//Remove dos favoritos
		}else{
			addFavorito();//Adiciona aos favoritos
		}
		changeFavoritoTitle(); //Muda o texto do botão alem de mudar o estado de isFav
	}
	
	function changeFavoritoTitle(){
		if( isFavorito( credenciadoFavorito ) ){
			$.btFavorito.title = 'Remover Favorito';
			isFav = true;
		}else{
			$.btFavorito.title = 'Adicionar Favorito';
			isFav = false;
		}
	}
	
	function isFavorito( cred ){
		var fav = Alloy.Collections.Favoritos.get(cred.id);
		if(fav)
			return true;
			return false;
	}
	
	function addFavorito(){
		var schem = {
			id:credenciadoFavorito.id,
		    fantasia: credenciadoFavorito.fantasia,
		    razaoSocial: credenciadoFavorito.razaoSocial,
		    endereco: credenciadoFavorito.endereco,
		    bairro: credenciadoFavorito.bairro,
		    cidade: credenciadoFavorito.cidade,
		    uf: credenciadoFavorito.uf,
		    complemento: credenciadoFavorito.complemento,
			telefones:JSON.stringify(credenciadoFavorito.telefones)
		};
		
		var favorito = Alloy.createModel('favoritos', schem); 
		favorito.save();
		Alloy.Collections.Favoritos.fetch();
	}
	
	function removeFavorito(){
		if(isFavorito( credenciadoFavorito )){
			var fav = Alloy.Collections.Favoritos.get( credenciadoFavorito.id );
			fav.destroy();
		}
	}

/*** FIM Tratamento favorito ***/

function verMapa(){
	var cred = credenciadoFavorito;
	var address = cred.endereco + ", " + cred.bairro + ", " +cred.cidade + " - " + cred.uf;
	var intent = Ti.Android.createIntent({
        action: Ti.Android.ACTION_VIEW,
        data:'geo:0,0+?q='+address
    });
    Ti.Android.currentActivity.startActivity(intent);
}

function ligarPara(tel){
	var intent = Ti.Android.createIntent({
        action: Ti.Android.ACTION_VIEW,
        data:'tel:'+tel
    });
    Ti.Android.currentActivity.startActivity(intent);
}

$.credenciadoDetailWindow.addEventListener("open", function(e){
	if(args.idCredenciado){
		var cred = (Alloy.Collections.Favoritos.get(args.idCredenciado)).toJSON();
		cred.telefones = JSON.parse(cred.telefones);
		credenciadoFavorito = cred; //Guardando para uso nos favoritos e outros
		setCredenciado( cred );
	}else{
		getCredenciado(args.codigoCategoria, args.credenciadoID);
	}
	changeFavoritoTitle();
});