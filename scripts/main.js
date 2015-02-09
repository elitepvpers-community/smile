var Bootstrap = {
    config: {
      remoteUrl: 'https://rawgit.com/elitepvpers-community/smile/requirejs/',
      remoteScriptsUrl: Bootstrap.config.remoteUrl + "scripts/" 
    },
    init: function() { 
        Bootstrap.loadScript(remoteScriptsUrl + 'require.js', function()
        {
            Bootstrap.loadStylesheet('//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
                    Bootstrap.loadStylesheet(Bootstrap.config.remoteScriptsUrl + 'lib/jquery-ui/jquery-ui.min.css');
                    require([Bootstrap.config.remoteScriptsUrl + "lib/jquery-ui/jquery-ui.js"], function(jquery) {
                        require([Bootstrap.config.remoteScriptsUrl + "modules/EVBE.js"], function(evbe) {
                            require([Bootstrap.config.remoteScriptsUrl + "modules/GUI.js"], function(gui) {
                                GUI.init();
                                EVBE.init();
                                GUI.createUI();
                            });
                        });
                    });
        })   
        
    },
    loadStylesheet: function(stylesheet) {
        $('head').append('<link rel="stylesheet" type="text/css" href="' + stylesheet + '" />');
    },
    loadScript: function(script, callback) {
        $.ajax({
           url: script,
           dataType: 'script',
           cache: 'true'
        }).done(function() {
            callback()
        });
    }
};

// Run
$(document).ready(function() {
   Bootstrap.init(); 
});