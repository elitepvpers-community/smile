var Bootstrap = {
    config: {
      remoteUrl: 'https://github.com/elitepvpers-community/smile/requirejs/'  
    },
    init: function() {     
        Bootstrap.loadStylesheet('//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
        Bootstrap.loadStylesheet(Bootstrap.config.remoteUrl + 'src/scripts/lib/jquery-ui/jquery-ui.min.css');
        require(["lib/jquery-ui/jquery-ui"], function(jquery) {
            require(["modules/EVBE"], function(util) {
                require(["modules/GUI"], function(util) {
                    GUI.init();
                });
            });
        });
    },
    loadStylesheet: function(stylesheet) {
        $('head').append('<link rel="stylesheet" type="text/css" href="' + stylesheet + '" />');
    }
};

// Run
$(document).ready(function() {
   Bootstrap.init(); 
});