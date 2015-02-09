// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

// EVBE
var EVBE = {
    init: function() {
        var smiles = localStorage.getItem('EVBE_Smiles');
        var settings = localStorage.getItem('EVBE_Settings');
        if (smiles === null) {
            EVBE.addStandardSmiles();
            smiles = localStorage.getItem('EVBE_Smiles');
        }  

        if(settings === null) {
            EVBE.addStandardSettings();
            settings = localStorage.getItem('EVBE_Settings');
        }
    },
    addStandardSettings: function() {
        var settings = {'showSmileyControl': true};
        
        localStorage.setItem('EVBE_Settings', JSON.stringify(settings));
    },
    addStandardSmiles: function() {
        var standards = [
            ['Halloween', Bootstrap.config.remoteUrl + 'images/1.gif'],
            ['Weihnachten', Bootstrap.config.remoteUrl + 'images/2.gif'],
            ['Blaues Auge', Bootstrap.config.remoteUrl + 'images/3.gif'],
            ['Katze', Bootstrap.config.remoteUrl + 'images/4.gif'],
            ['S&uuml;&szlig;es Ding', Bootstrap.config.remoteUrl + 'images/5.gif']
        ];

        localStorage.setItem('EVBE_Smiles', JSON.stringify(standards));
        return;
    },
    appendSmiles: function(editmode) {
        var smiles = JSON.parse(localStorage.getItem('EVBE_Smiles'));
        $(smiles).each(function() {
            if (!editmode) {
                $('#EVBE_Edit').removeClass('editmode');
                $('#EVBE_Smileys').append('<div style="display: inline-block;"><img src="' + this[1] + '" title="' + this[0] + '" height="32px" width="32px" style="padding-right: 10px; cursor: pointer;" onclick="$(\'textarea[name=message]\').val($(\'textarea[name=message]\').val() + \'[IMG]' + this[1] + '[/IMG]\');"></div>');
            } else {
                $('#EVBE_Edit').addClass('editmode');
                $('#EVBE_Smileys').append('<div style="display: inline-block;"><div style="position: relative; z-index: 1; left: 1px; color: red; cursor: pointer;" onclick="EVBE.deleteSmile(\'' + this[0] + '\', \'' + this[1] + '\');"><i class="fa fa-ban"></i></div><img src="' + this[1] + '" title="' + this[0] + '" height="32px" width="32px" style="top: -10px; position: relative; padding-right: 10px;"></div>');
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
        var smiles = JSON.parse(localStorage.getItem('EVBE_Smiles'));
        result = false;
        $(smiles).each(function() {
            if(this[1] === link || this[0] === title) {
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

            var smiles = JSON.parse(localStorage.getItem('EVBE_Smiles'));
            smiles.push([$('input[name=EVBE_Smiley_Title]').val(), $('input[name=EVBE_Smiley_Link]').val()]);
            localStorage.setItem('EVBE_Smiles', JSON.stringify(smiles));

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
			localStorage.setItem('EVBE_Smiles', "[]");
            EVBE.clearSmilies();
            EVBE.appendSmiles(false);
        });
    },
    deleteSmile: function(title, link) {
        var smiles = JSON.parse(localStorage.getItem('EVBE_Smiles'));
        var key = 0;
        $(smiles).each(function() {
            if (this[1] === link) {
                smiles.remove(key);
                localStorage.setItem('EVBE_Smiles', JSON.stringify(smiles));
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
        $('#vB_Editor_QR').after('<div id="EVBE_ShowSmileyControl"><br><button class="button" onclick="event.preventDefault(); EVBE.showSmileyControl();" style="float: right;"><i class="fa fa-arrow-down"></i></button><br></div>');
        return;
    },
    showSmileyControl: function() {
        $('#EVBE_Smileys_Control').fadeIn('slow');
        var settings = JSON.parse(localStorage.getItem('EVBE_Settings'));
        settings.showSmileyControl = true;
        localStorage.setItem('EVBE_Settings', JSON.stringify(settings));
        $('#EVBE_ShowSmileyControl').remove();
        $('#vB_Editor_QR').after('<div id="EVBE_HideSmileyControl"><br><button class="button" onclick="event.preventDefault(); EVBE.hideSmileyControl();" style="float: right;"><i class="fa fa-arrow-up"></i></button><br></div>');
        return;
    },
    generateExportCode: function() {
        var smiles = JSON.parse(localStorage.getItem('EVBE_Smiles'));
        var exportCode = "";
        
        $(smiles).each(function() {
            exportCode = (exportCode.length > 1 ? (exportCode + '{s_n}' + (this[0] + '{s_x}' + this[1])) : (exportCode + (this[0] + '{s_x}' + this[1])));
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
        var smiles = JSON.parse(localStorage.getItem('EVBE_Smiles'));
        $(importCode.split('{s_n}')).each(function() {
           l = this.split('{s_x}');
           if(!EVBE.smileyExist(l[0], l[1])) {
                smiles.push([l[0], l[1]]);
            }
        });
        $('#EVBE_Import_Container').val('');
        localStorage.setItem('EVBE_Smiles', JSON.stringify(smiles));
        EVBE.clearSmilies();
        EVBE.appendSmiles(false);
    },
    generateBackup: function() {
        localStorage.setItem('EVBE_Backup', localStorage.getItem('EVBE_Smiles'));
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
        localStorage.setItem('EVBE_Smiles', localStorage.getItem('EVBE_Backup'));
        
        EVBE.clearSmilies();
        EVBE.appendSmiles(false);
    }
};
