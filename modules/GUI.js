var GUI = {
    init: function() {
        EVBE.init();
        
        // Launch our UI
        GUI.createUI();
    },
    createUI: function() {
        var settings = JSON.parse(localStorage.getItem('EVBE_Settings')); // settings var
        
        // MAIN CONTROL
        $('#vB_Editor_QR').after('<fieldset class="fieldset" style="margin:3px 0px 0px 0px;' + (!settings.showSmileyControl ? 'display: none;' : '') + '" id="EVBE_Smileys_Control">' +
            '<legend><i class="fa fa-smile-o"></i> Smileys</legend>' +
            '<div style="padding:3px; overflow-y: scroll; height: 30px;" id="EVBE_Smileys">' +
                
            '</div>' +
            '<br>' +
            '<button class="button" id="EVBE_New"><i class="fa fa-plus"></i> Neu</button> ' +
            '<button class="button" id="EVBE_Edit"><i class="fa fa-edit"></i> Bearbeiten</button> ' +
            '<button class="button" id="EVBE_Ban"><i class="fa fa-ban"></i> Smileys leeren</button> ' +
            '<button class="button" id="EVBE_ImportExport"><i class="fa fa-exchange"></i> Import/Export</button>' +
            '<span style="float: right; font-size: 10px;">Smile! - <a href="http://www.elitepvpers.com/forum/members/3880690-kentika.html">Kentika</a></span>' +
            '</fieldset>');
            EVBE.launchEditMode();
            EVBE.appendSmiles(false);
            
            $('#EVBE_Smileys').tooltip();
            
            // Delete Smileys Control
            $('#EVBE_Smileys_Control').after('<fieldset class="fieldset" style="margin:3px 0px 0px 0px; display: none;" id="EVBE_Delete_Control">' +
            '<legend><i class="fa fa-ban"></i> Smileys leeren</legend>' +
            '<div style="padding:3px">' +
                'Bist Du sicher, dass Du Deine Smileys leeren m&ouml;chtest? <br><br>' +
                '<button class="button" id="EVBE_Delete"><i class="fa fa-ban"></i> Leeren</button>' +
            '</div>' +
            '</fieldset>');
            EVBE.deleteSmiles();
            $('#EVBE_Ban').click(function(e) {
                e.preventDefault();
                if($('#EVBE_Delete_Control').is(':visible')) {
                    $('#EVBE_Delete_Control').fadeOut('slow');
                } else {
                    $('#EVBE_Delete_Control').fadeIn('slow');
                }
            });
            
            // Add new Smiley Control
            $('#EVBE_Smileys_Control').after('<fieldset class="fieldset" style="margin:3px 0px 0px 0px; display: none;" id="EVBE_New_Control">' +
            '<legend><i class="fa fa-plus"></i> Neuer Smiley</legend>' +
            '<div style="padding:3px">' +
                '<small>Die Smileys werden in der &Uuml;bersicht auf 32x32 Pixel verkleinert.</small>' +
                '<br><br>' +
                '<label><i class="fa fa-file-text-o"></i> Smiley Titel:</i></label>' +
                '<input type="text" name="EVBE_Smiley_Title" style="width: 99%;" placeholder="Smiley Titel">' +
                '<br><br>' +
                '<label><i class="fa fa-image"></i> Bild-URL:</label>' + 
                '<input type="text" name="EVBE_Smiley_Link" style="width: 99%;" placeholder="Bild-URL">' +
                '<br><br>' +
                '<button class="button" id="EVBE_addSmiley"><i class="fa fa-save"></i> Smiley speichern</button>' +
                '<br><br>' +
                '<a href="http://www.elitepvpers.com/forum/elite-gold-trading/3536727-eshop-das-elite-gold-shopsystem-24-7-delivery-leicht-gemacht.html"><img src="' + Bootstrap.config.stableBranchUrl + '/images/banner/1.png" width="100%" alt="Werbung"></a>' +
            '</div>' +
            '</fieldset>');
            EVBE.addSmiley(); // triggers on click
            $('#EVBE_New').click(function(e) {
                e.preventDefault();
                if($('#EVBE_New_Control').is(':visible')) {
                    $('#EVBE_New_Control').fadeOut('slow');
                } else {
                    $('#EVBE_New_Control').fadeIn('slow');
                }
            });
            
            // Export/Import Control
            $('#EVBE_Smileys_Control').after('<fieldset class="fieldset" style="margin:3px 0px 0px 0px; display: none;" id="EVBE_ImportExport_Control">' +
            '<legend><i class="fa fa-exchange"></i> Importieren/Exportieren</legend>' +
            '<div style="padding:3px">' +
                '<small><i class="fa fa-reply"></i> Importieren</small><br>' +
                '<textarea style="width: 99%; height: 100px;" id="EVBE_Import_Container"></textarea>' + 
                '<br>' +
                '<br>' +
                '<small><i class="fa fa-share"></i> Exportieren</small><br>' +
                '<textarea style="width: 99%; height: 100px;" id="EVBE_Export_Container"></textarea>' + 
                '<br>' +
                '<br>' +
                '<button class="button" onclick="event.preventDefault(); EVBE.startImport();"><i class="fa fa-refresh"></i> Import starten</button> ' +
                '<button class="button" onclick="event.preventDefault(); EVBE.generateExportCode();"><i class="fa fa-refresh"></i> Exportcode generieren</button> ' +
                '<button class="button" onclick="event.preventDefault(); EVBE.generateBackup();"><i class="fa fa-save"></i> Backup generieren</button>' +
            '</div>' +
            '</fieldset>');
    
            if(localStorage.getItem('EVBE_Backup') === null) {
                $('#EVBE_ImportExport_Control').after('<fieldset class="fieldset" style="margin:3px 0px 0px 0px; display: none;" id="EVBE_Backup_Control">' +
                '<legend><i class="fa fa-exchange"></i> Backups</legend>' +
                '<div style="padding:3px">' +
                    'Es ist kein Backup vorhanden.' +
                '</div>' +
                '</fieldset>');
            } else {
                $('#EVBE_ImportExport_Control').after('<fieldset class="fieldset" style="margin:3px 0px 0px 0px; display: none;" id="EVBE_Backup_Control">' +
                '<legend><i class="fa fa-exchange"></i> Backups</legend>' +
                '<div style="padding:3px">' +
                    'Es ist ein Backup vorhanden.' +
                    '<br><br>' +
                    '<button class="button" onclick="event.preventDefault(); EVBE.restore();"><i class="fa fa-refresh"></i> Backup aufspielen</button>' +
                '</div>' +
                '</fieldset>');
            }
    
            $('#EVBE_ImportExport').click(function(e) {
                e.preventDefault();
                if($('#EVBE_ImportExport_Control').is(':visible')) {
                    $('#EVBE_ImportExport_Control').fadeOut('slow');
                    $('#EVBE_Backup_Control').fadeOut('slow');
                } else {
                    $('#EVBE_ImportExport_Control').fadeIn('slow');
                    $('#EVBE_Backup_Control').fadeIn('slow');
                }
            });
            
            // Show Smiley Control settings
            if(!settings.showSmileyControl) {
                $('#vB_Editor_QR').after('<div id="EVBE_ShowSmileyControl"><br><button class="button" onclick="event.preventDefault(); EVBE.showSmileyControl();" style="float: right;"><i class="fa fa-arrow-down"></i></button><br></div>');
            } else {
                $('#vB_Editor_QR').after('<div id="EVBE_HideSmileyControl"><br><button class="button" onclick="event.preventDefault(); EVBE.hideSmileyControl();" style="float: right;"><i class="fa fa-arrow-up"></i></button><br></div>');
            }
    }
};
