// ==UserScript==
// @name         Block Ads of Earlyretirementnow
// @namespace    http://earlyretirementnow.com/
// @version      2024-06-22
// @description  try to take over the world!
// @author       Raymond
// @match        https://earlyretirementnow.com/*
// @icon         https://i0.wp.com/earlyretirementnow.com/wp-content/uploads/2016/03/cropped-logo4-1copy-1.jpg?fit=32%2C32&ssl=1
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const removeAds = () => {
    const adboxes = document.getElementsByClassName('mv-ad-box');
    if (adboxes) {
      for (const adbox of adboxes) {
        adbox.remove();
      }
    }
    const bottomAd = document.getElementById('adhesion_desktop_wrapper');
    if (bottomAd) {
      bottomAd.remove();
    }
  };

  const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          removeAds();
          //observer.disconnect();
          console.log('complete removing ads');
        }
    }
  };

  const observer = new MutationObserver(callback);
  const config = { childList: true, subtree: true };
  const targetNode = document.body;
  observer.observe(targetNode, config);
})();
