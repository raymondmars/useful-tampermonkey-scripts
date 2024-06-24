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

  const handleCaptionChange = (caption) => {
    console.log("当前字幕:", caption);
  }

  const getActiveCaption = (targetNode, maxRetries = 5, delay = 100) => {
    return new Promise((resolve, reject) => {
        let retries = 0;
        
        function attempt() {
            const activeCaption = targetNode.querySelector('.ytd-transcript-segment-list-renderer.active');
            if (activeCaption) {
                resolve(activeCaption);
            } else if (retries < maxRetries) {
                retries++;
                setTimeout(attempt, delay);
            } else {
                reject(new Error('无法找到激活的字幕元素'));
            }
        }
        
        attempt();
    });
  }

  const observer = new MutationObserver((mutations, obs) => {      
    const scriptButton = document.getElementById('button-container');
    if (scriptButton) {
      const targetNode = document.querySelector('ytd-transcript-renderer');
      if(targetNode) {
        const activeCaption = getActiveCaption(targetNode)
        .then(activeCaption => {
            handleCaptionChange(activeCaption.textContent.trim());
        })
        .catch(error => {
            console.error(error);
        });
        return;
      }
      scriptButton.querySelector('button').click();
      console.log('click to complete showing scripts');
      // obs.disconnect();
    }
  });
  
  const config = { childList: true, subtree: true, characterData: true };
  const targetNode = document.body;
  observer.observe(targetNode, config);

})();
