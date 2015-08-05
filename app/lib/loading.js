module.exports = function(){
	// Global widget vars
	var view, activityIndicator, overlay;
	
	function setup(){
		// Android view for the alert dialog
	    view = Ti.UI.createView({
	        width: Ti.UI.SIZE,
	        height: Ti.UI.SIZE
	    });
	
	    // The activity indicator wich performs visual feedback
	    activityIndicator = Ti.UI.createActivityIndicator({
	        top: '10dp',
	        bottom: '10dp'
	    });
	
	    // Append activity indicator to the android view
	    view.add(activityIndicator);
	    
	    overlay = Ti.UI.createAlertDialog({
	        androidView: view
	    });
	    
	    overlay.title = "";//options.title;
	    activityIndicator.message = " Carregando..."; //options.message;
	}
	/*
	var win = Ti.UI.createWindow({
	  backgroundColor: '#FFF',
	  opacity:0.8,
	  modal:true,
	  fullscreen: true,
	  zIndex:9999
	});
	
	var style;
	if (Ti.Platform.name === 'iPhone OS') {
		style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
	} else {
		style = Ti.UI.ActivityIndicatorStyle.DARK;
	}

	var activityIndicator = Ti.UI.createActivityIndicator({
	  color: '#000',
	  font: {fontFamily:'Helvetica Neue', fontSize:12, fontWeight:'bold'},
	  message: ' Carregando...',
	  style:style,
	  top:"50%",
	  left:"40%",
	  height:Ti.UI.SIZE,
	  width:Ti.UI.SIZE
	});
	
	win.addEventListener('open', function (e) {
		Ti.API.info("Open window loading");
	  //activityIndicator.show();
	});
	win.add(activityIndicator);
	
	*/
	var _show = function(){
		overlay.show();
        activityIndicator.show();
		//win.open();
		//win.activity.actionBar.hide();
		//activityIndicator.show();
	};
	
	var _hide = function(){
		activityIndicator.hide();
    	overlay.hide();
		//activityIndicator.hide();
		//win.close();
	};
	
	setup();
	return {
		show:_show
		,hide:_hide
	};
};