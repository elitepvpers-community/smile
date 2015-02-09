var Bootstrap = {
    config: {
      remoteUrl: 'https://rawgit.com/elitepvpers-community/smile/requirejs/',
      remoteScriptsUrl: "https://rawgit.com/elitepvpers-community/smile/requirejs/scripts/" 
    },
    init: function() { 
        Bootstrap.loadScript(Bootstrap.config.remoteScriptsUrl + 'require.js', function()
        {
            Bootstrap.loadStylesheet('//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
                    Bootstrap.loadStylesheet(Bootstrap.config.remoteScriptsUrl + 'lib/jquery-ui/jquery-ui.min.css');
                    require([Bootstrap.config.remoteScriptsUrl + "lib/jquery-ui/external/jquery/jquery.js"], function(jquery) {
                        require([Bootstrap.config.remoteScriptsUrl + "lib/jquery-ui/jquery-ui.js"], function(jqueryui) {
                            require([Bootstrap.config.remoteScriptsUrl + "modules/EVBE.js"], function(evbe) {
                                require([Bootstrap.config.remoteScriptsUrl + "modules/GUI.js"], function(gui) {
                                    EVBE.init();
                                    GUI.createUI();
                                });
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