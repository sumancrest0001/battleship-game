!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";var n,o;r.r(t),(n=document.querySelector(".main-section"),o=document.createElement("table"),{renderBoard:function(e){var t=["A","B","C","D","E","F","G","H","I","J"];o.setAttribute("id","".concat(e.player.username));for(var r=0;r<=10;r+=1){for(var u=document.createElement("tr"),a=0;a<=10;a+=1){var i=document.createElement("td");0!==r&&0!==a?(i.setAttribute("data-value",10*(r-1)+(a-1)),i.classList.add("cell")):0===r&&a>0?i.textContent=a:r>0&&0===a&&(i.textContent=t[r-1]),u.appendChild(i)}o.appendChild(u)}n.append(o)},markHit:markHit})()}]);