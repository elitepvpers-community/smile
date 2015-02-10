// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

// EVBE
var EVBE = {
    init: function() {
        var smileyCollection = SmileyCollection.deserialize('EVBE_Smiles');
        var settings = localStorage.getItem('EVBE_Settings');
        if (smileyCollection.smilies.length == 0) {
            EVBE.addStandardSmiles();
        }  

        if(settings === null) {
            EVBE.addStandardSettings();
            settings = localStorage.getItem('EVBE_Settings');
        }

        EVBE.placeHooks()
    },
    addStandardSettings: function() {
        var settings = {'showSmileyControl': true};
        
        localStorage.setItem('EVBE_Settings', JSON.stringify(settings));
    },
    addStandardSmiles: function() {
        var standards = [
            new Smiley('Halloween', Bootstrap.config.remoteUrl + 'images/1.gif'),
            new Smiley('Weihnachten', Bootstrap.config.remoteUrl + 'images/2.gif'),
            new Smiley('Blaues Auge', Bootstrap.config.remoteUrl + 'images/3.gif'),
            new Smiley('Katze', Bootstrap.config.remoteUrl + 'images/4.gif'),
            new Smiley('S&uuml;&szlig;es Ding', Bootstrap.config.remoteUrl + 'images/5.gif')
        ];

        var smileyCollection = new SmileyCollection(standards)
        smileyCollection.serialize('EVBE_Smiles');
        return;
    },
    appendSmiles: function(editmode) {
        var smileyCollection = SmileyCollection.deserialize('EVBE_Smiles');
        $(smileyCollection.smilies).each(function() {
            if (!editmode) {
                $('#EVBE_Edit').removeClass('editmode');
                $('#EVBE_Smileys').append('<div style="display: inline-block;"><img src="' + this.url + '" title="' + this.title + '" height="32px" width="32px" style="padding-right: 10px; cursor: pointer;" onclick="$(\'textarea[name=message]\').val($(\'textarea[name=message]\').val() + \'[IMG]' + this.url + '[/IMG]\');"></div>');
            } else {
                $('#EVBE_Edit').addClass('editmode');
                $('#EVBE_Smileys').append('<div style="display: inline-block;"><div style="position: relative; z-index: 1; left: 1px; color: red; cursor: pointer;" onclick="EVBE.deleteSmile(\'' + this.title + '\', \'' + this.url + '\');"><i class="fa fa-ban"></i></div><img src="' + this.url + '" title="' + this.title + '" height="32px" width="32px" style="top: -11px; position: relative; padding-right: 10px;"></div>');
            }
        });
        return;
    },
    launchEditMode: function() {
        $('#EVBE_Edit').click(function(e) {
            e.preventDefault();
            if ($('#EVBE_Edit').hasClass('editmode')) {
                EVBE.clearSmilies();
                EVBE.appendSmiles(false);
            } else {
                EVBE.clearSmilies();
                EVBE.appendSmiles(true);
            }
        });
    },
    clearSmilies: function() {
        $('#EVBE_Smileys').html('');
    },
    smileyExist: function(title, link) {
        var smiles = SmileyCollection.deserialize('EVBE_Smiles');
        result = false;
        $(smiles).each(function() {
            if(this.url === link || this.title === title) { 
                result = true;
            }
        });
       
        return result;
    },
    addSmiley: function() {
        $('#EVBE_addSmiley').click(function(e) {
            e.preventDefault();

            if ($('input[name=EVBE_Smiley_Title]').val() === "" || $('input[name=EVBE_Smiley_Link]').val() === "" || EVBE.smileyExist($('input[name=EVBE_Smiley_Title]').val(), $('input[name=EVBE_Smiley_Link]').val())) {
                return;
            }

            var smileyCollection = SmileyCollection.deserialize('EVBE_Smiles');
            smileyCollection.smilies.push(new Smiley($('input[name=EVBE_Smiley_Title]').val(), $('input[name=EVBE_Smiley_Link]').val()));
            smileyCollection.serialize('EVBE_Smiles');

            // clear inputs
            $('input[name=EVBE_Smiley_Title]').val('');
            $('input[name=EVBE_Smiley_Link').val('');

            EVBE.clearSmilies();
            EVBE.appendSmiles(false);
            return;
        });
    },
    deleteSmiles: function() {
        $('#EVBE_Delete').click(function(e) {
            e.preventDefault();
            var smileyCollection = new SmileyCollection();
            smileyCollection.serialize('EVBE_Smiles');
            EVBE.clearSmilies();
            EVBE.appendSmiles(false);
        });
    },
    deleteSmile: function(title, link) {
        var smileyCollection = SmileyCollection.deserialize('EVBE_Smiles');
        var key = 0;
        $(smileyCollection.smiles).each(function() {
            if (this.url === link) {
                smileyCollection.remove(key);
                smileyCollection.serialize('EVBE_Smiles');
                EVBE.clearSmilies();
                EVBE.appendSmiles(true);
                return;
            }
            key += 1;
        });
    },
    hideSmileyControl: function() {
        $('#EVBE_Delete_Control').hide();
        $('#EVBE_New_Control').hide();
        $('#EVBE_ImportExport_Control').hide();
        $('#EVBE_Backup_Control').hide();
        $('#EVBE_Smileys_Control').fadeOut('slow');
        var settings = JSON.parse(localStorage.getItem('EVBE_Settings'));
        settings.showSmileyControl = false;
        localStorage.setItem('EVBE_Settings', JSON.stringify(settings));
        $('#EVBE_HideSmileyControl').remove();
        $('input[name=preview][accesskey=x]').after('<button id="EVBE_ShowSmileyControl" class="button" onclick="event.preventDefault(); EVBE.showSmileyControl();" style="margin: 0px 5px"><i class="fa fa-arrow-down"></i> Smilies einblenden </button>');
        return;
    },
    showSmileyControl: function() {
        $('#EVBE_Smileys_Control').fadeIn('slow');
        var settings = JSON.parse(localStorage.getItem('EVBE_Settings'));
        settings.showSmileyControl = true;
        localStorage.setItem('EVBE_Settings', JSON.stringify(settings));
        $('#EVBE_ShowSmileyControl').remove();
        $('input[name=preview][accesskey=x]').after('<button id="EVBE_HideSmileyControl" class="button" onclick="event.preventDefault(); EVBE.hideSmileyControl();" style="margin: 0px 5px"><i class="fa fa-arrow-up"></i> Smilies ausblenden </button>');
        return;
    },
    generateExportCode: function() {
        var smileyCollection = JSON.parse(SmileyCollection.deserialize('EVBE_Smiles'));
        var exportCode = "";
        
        $(smileyCollection.smiles).each(function() {
            exportCode = (exportCode.length > 1 ? (exportCode + '{s_n}' + (this.title + '{s_x}' + this.url)) : (exportCode + (this.title + '{s_x}' + this.url)));
        });
        exportCode = btoa(exportCode);
        $('#EVBE_Export_Container').val(exportCode);
        return;
    },
    startImport: function() {
        var importCode = atob($('#EVBE_Import_Container').val());
        if(importCode === "") {
            return;
        }
        var smileyCollection = SmileyCollection.deserialize('EVBE_Smiles');
        $(importCode.split('{s_n}')).each(function() {
           l = this.split('{s_x}');
           if(!EVBE.smileyExist(l[0], l[1])) {
                smileyCollection.smiles.push(new Smiley([l[0], l[1]]));
            }
        });
        $('#EVBE_Import_Container').val('');
        smileyCollection.serialize('EVBE_Smiles');
        EVBE.clearSmilies();
        EVBE.appendSmiles(false);
    },
    generateBackup: function() {
        var smileyCollection = SmileyCollection.deserialize('EVBE_Smiles');
        smileyCollection.serialize('EVBE_Backup');

        $('#EVBE_Backup_Control').remove();
        $('#EVBE_ImportExport_Control').after('<fieldset class="fieldset" style="margin:3px 0px 0px 0px;" id="EVBE_Backup_Control">' +
        '<legend><i class="fa fa-exchange"></i> Backups</legend>' +
        '<div style="padding:3px">' +
            'Es ist ein Backup vorhanden.' +
            '<br><br>' +
            '<button class="button" onclick="event.preventDefault(); EVBE.restore();"><i class="fa fa-refresh"></i> Backup aufspielen</button>' +
        '</div>' +
        '</fieldset>');
    },
    restore: function() {
        var smileyCollection = SmileyCollection.deserialize('EVBE_Backup');
        smileyCollection.serialize('EVBE_Smiles');

        EVBE.clearSmilies();
        EVBE.appendSmiles(false);
    }, 
    // place hooks required for detecting smiley triggers
    placeHooks: function() 
    {
        $("#qr_submit").click(function(e) 
        {
            var editorContent = $("#vB_Editor_QR_textarea").val();
            var smilies = JSON.parse(localStorage.getItem("EVBE_Smiles"));

            smilies.forEach(function(smiley)
            {
                // 0 - title, 1 - link
                //editorContent.replace("-trigger-")  
            })  
        });
    }
};
