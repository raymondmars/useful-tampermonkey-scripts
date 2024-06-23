// ==UserScript==
// @name         Block Ads of Longman Dictionary
// @namespace    http://tampermonkey.net/
// @version      2024-06-22
// @description  try to take over the world!
// @author       Raymond
// @match        https://www.ldoceonline.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ldoceonline.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
const removeAds = () => {
  const leftAds = document.getElementById('ad_leftslot_container');
  if (leftAds) {
    leftAds.remove();
  }
  const topAds = document.getElementsByClassName('topslot-container');
  if (topAds.length > 0) {
    topAds[0].remove();
  }
  const rightAds = document.getElementsByClassName('responsive_cell2');
  if (rightAds.length > 0) {
    rightAds[0].remove();
  }

  const iframes = document.querySelectorAll('iframe');
  if (iframes.length > 0) {
    iframes.forEach((iframe) => {
      iframe.remove();
    });
  }
}

const callback = function(mutationsList, observer) {
  for(const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        removeAds();
        observer.disconnect();
        console.log('complete removing ads');
      }
  }
};

const observer = new MutationObserver(callback);
const config = { childList: true, subtree: true };
const targetNode = document.body;
observer.observe(targetNode, config);

})();

