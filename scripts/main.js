var Bootstrap = {
    config: {
      remoteUrl: 'https://rawgit.com/elitepvpers-community/smile/extended_editor/'
    },
    init: function() { 
        var remoteScriptsUrl = Bootstrap.config.remoteUrl + "scripts";
        Bootstrap.loadScript(remoteScriptsUrl + '/require.js', function()
        {
            requirejs.config({
                baseUrl: remoteScriptsUrl,
                paths: {
                  jquery: "lib/jquery-ui/external/jquery/jquery.min",
                  jqueryui: "lib/jquery-ui/jquery-ui.min",
                  evbe: "modules/EVBE",
                  gui: "modules/GUI",
                  smiley: "modules/Smiley"
                },
                shim: {
                    jqueryui: {
                      deps: ["jquery"]
                    },
                    gui: {
                      exports: "gui",
                      deps: ["jqueryui", "smiley"]
                    },
                    evbe: {
                      exports: "evbe",
                      deps: ["smiley"]
                    }
                }
            });

            define('jquery-private', ['jquery'], function (jq) {
                return jq.noConflict( true );
            });

            Bootstrap.loadStylesheet('//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
            Bootstrap.loadStylesheet(remoteScriptsUrl + '/lib/jquery-ui/jquery-ui.min.css');
   
            require(["jquery-private", "evbe", "gui"], function(jq, evbe, gui) 
            {
                EVBE.init();
                new GUI(jq).create()
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
