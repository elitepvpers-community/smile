// ==UserScript==
// @name        EVBE - Extended vBulletin Editor
// @namespace   elitepvpers
// @include     http://www.elitepvpers.com/forum/*
// @author      Kentika, Mostey
// @grant       none
// @description Extended vBulletin Editor
// ==/UserScript==

function addScript(script) {
    var scr = document.createElement('script');
    scr.type = 'text/javascript';
    scr.src = script;
    document.getElementsByTagName('head')[0].appendChild(scr);
}

addScript('https://rawgit.com/elitepvpers-community/smile/requirejs/scripts/main.js');