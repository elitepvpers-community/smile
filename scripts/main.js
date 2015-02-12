var Bootstrap = {
    config: {
      remoteUrl: 'https://rawgit.com/elitepvpers-community/smile/jquery_fix/'
    },
    init: function() { 
        var remoteScriptsUrl = Bootstrap.config.remoteUrl + "scripts";
        Bootstrap.loadScript(remoteScriptsUrl + '/require.js', function()
        {
            requirejs.config({
                baseUrl: remoteScriptsUrl
            });

            Bootstrap.loadStylesheet('//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
            Bootstrap.loadStylesheet(remoteScriptsUrl + '/lib/jquery-ui/jquery-ui.min.css');
            require(["lib/jquery-ui/external/jquery/jquery.min"], function($) 
            {
                require(["modules/EVBE",
                         "modules/GUI",
                         "modules/Smiley"], function(jqueryUI, evbe, gui, smiley) 
                {
                    EVBE.init();
                    GUI.createUI();
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
