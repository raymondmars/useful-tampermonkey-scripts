// ==UserScript==
// @name         Block websites
// @namespace    http://tampermonkey.net/
// @version      2024-06-24
// @description  try to take over the world!
// @author       Raymond
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const callback = function(mutationsList, observer) {
      const body = document.querySelector('body');
      if(body) {
          body.innerHTML = '<h1 style="margin: 80px 32%; font-size: 100px">BLOCKED</h1>'
          observer.disconnect()
      }
  };

  const observer = new MutationObserver(callback);
  const config = { childList: true, subtree: true };
  const targetNode = document.body;
  observer.observe(targetNode, config);
})();
