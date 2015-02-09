var Bootstrap = {
    config: {
      BASE: 'http://localhost/EVBE/'  
    },
    init: function() {
        Bootstrap.loadScripts(function() {
            Bootstrap.loadStylesheet('//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css');
            Bootstrap.loadStylesheet(Bootstrap.config.BASE + 'lib/jquery-ui/jquery-ui.min.css');
            
            GUI.init();
        });
    },
    loadScripts: function(callback) {
        $.ajax({
           url: Bootstrap.config.BASE + 'lib/jquery-ui/jquery-ui.min.js',
           dataType: 'script',
           cache: 'true'
        }).done(function() {
            $.ajax({
                url: Bootstrap.config.BASE + 'modules/EVBE.js',
                dataType: 'script',
                cache: 'true'
            }).done(function() {
                $.ajax({
                    url: Bootstrap.config.BASE + 'modules/GUI.js',
                    dataType: 'script',
                    cache: 'true'
                }).done(function() {
                    if(typeof callback === 'function') {
                     callback();
                    } 
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