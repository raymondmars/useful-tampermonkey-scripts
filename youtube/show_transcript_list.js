// ==UserScript==
// @name         Show Youtube Transcript list
// @namespace    http://tampermonkey.net/
// @version      2024-06-23
// @description  try to take over the world!
// @author       Raymond
// @match        https://www.youtube.com/watch?v=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const observer = new MutationObserver((mutations, obs) => {      
    const scriptButton = document.getElementById('button-container');
    if (scriptButton) {
      if(document.querySelector('ytd-transcript-renderer')) {
        return;
      }
      scriptButton.querySelector('button').click();
      console.log('click to complete showing scripts');
      // obs.disconnect();
    }
  });
  
  const config = { childList: true, subtree: true };
  const targetNode = document.body;
  observer.observe(targetNode, config);

})();
