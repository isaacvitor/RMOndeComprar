var args = arguments[0] || {};

var ufService = require('services/uf')();
var cidadeService = require('services/cidade')();

var ufsData = [];
var colUfs = Ti.UI.createPickerColumn();

var ufPref = Ti.App.Properties.getString('uf');
var cidadePref = Ti.App.Properties.getString('cidade');
var ufsListPref = Ti.App.Properties.getString('ufList');
var cidadeListPref = Ti.App.Properties.getString('cidadeList');

$.winPref.addEventListener("open", function(e){
	
});


function setUF(e){
	Ti.API.info("SETUF");
	if(e.row.title != "UF"){
		//Reset cidadePref
		Ti.App.Properties.setString( "cidade", null );
		
		cidadeService.list(e.row.title, function(err, cidades){
			if(err){ Ti.API.info(err);return;}
			cidades.unshift({uf:"uf",cidade:"Cidade"});
			Alloy.Collections.Cidades.reset(cidades);
			//Ti.App.Properties.setString('cidadeList', JSON.stringify(cidades) );
			//selectCidade(cidades);
		});
		Ti.App.Properties.setString( "uf", e.row.title );
	}else{
		Ti.App.Properties.setString( "uf", null );	
	}
	
};

function selectUF(ufs){
	if(ufPref != null){
		for(i=0; i < ufs.length; i++){
			if(ufPref == ufs[i].uf){
				$.pkrUF.setSelectedRow(0, i, false);
			}
		}	
	}else{
		$.pkrUF.setSelectedRow(0, 0, false);		
	}
}

function selectCidade(cidades){
	if(cidadePref != null){
		for(i=0; i < cidades.length; i++){
			if(cidadePref == cidades[i].cidade){
				$.pkrCidade.setSelectedRow(0, i, false);
			}
		}	
	}else{
		$.pkrCidade.setSelectedRow(0, 0, false);		
	}
}

function setCidade(e){
	if(e.row.cidade != ""){
		Ti.App.Properties.setString( "cidade", e.row.title );
		
		$.winPref.close();
	}else{
		Ti.App.Properties.setString( "cidade", null );	
	}
};

function listUFs(){
	ufService.list(function(err, ufs){
		//Caso ocorra um erro
		if(err){ Ti.API.info(err);return;}
		ufs.unshift({uf:"UF"});
		Alloy.Collections.UFs.reset(ufs);
		//Salvando a lista da ufs nas propriedades para 
		//Ti.App.Properties.setString('ufList', JSON.stringify(ufs) );
		//selectUF(ufs);
	});
}

function closeWindow(e){
	$.winPref.close();
}

listUFs();