!function(){function e(e,n,t,r){Object.defineProperty(e,n,{get:t,set:r,enumerable:!0,configurable:!0})}function n(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},o={},i=t.parcelRequired76b;null==i&&((i=function(e){if(e in r)return r[e].exports;if(e in o){var n=o[e];delete o[e];var t={id:e,exports:{}};return r[e]=t,n.call(t.exports,t,t.exports),t.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,n){o[e]=n},t.parcelRequired76b=i),i.register("iE7OH",(function(n,t){var r,o;e(n.exports,"register",(function(){return r}),(function(e){return r=e})),e(n.exports,"resolve",(function(){return o}),(function(e){return o=e}));var i={};r=function(e){for(var n=Object.keys(e),t=0;t<n.length;t++)i[n[t]]=e[n[t]]},o=function(e){var n=i[e];if(null==n)throw new Error("Could not resolve bundle with id "+e);return n}})),i.register("aNJCr",(function(n,t){var r;e(n.exports,"getBundleURL",(function(){return r}),(function(e){return r=e}));var o={};function i(e){return(""+e).replace(/^((?:https?|file|ftp|(chrome|moz)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(e){var n=o[e];return n||(n=function(){try{throw new Error}catch(n){var e=(""+n.stack).match(/(https?|file|ftp|(chrome|moz)-extension):\/\/[^)\n]+/g);if(e)return i(e[2])}return"/"}(),o[e]=n),n}})),i("iE7OH").register(JSON.parse('{"EVgbq":"index.329b7a5a.js","9hwH9":"search.1369644a.svg"}'));var a;a=i("aNJCr").getBundleURL("EVgbq")+i("iE7OH").resolve("9hwH9"),document.querySelector("body").insertAdjacentHTML("beforeend",'<div class="main__header">\n        <div class="main__header-buttons">\n          <button type="button" class="main__header-logo" data-main="home">\n            Filmoteka\n          </button>\n          <div class="main__header-nav">\n            <button\n              type="button"\n              class="main__header-btn active__page-btn"\n              data-main="home"\n            >\n              home\n            </button>\n            <button type="button" class="main__header-btn" data-main="library">\n              my library\n            </button>\n          </div>\n        </div>\n        <div class="main__header-input">\n          <input type="text" placeholder="Search..." data-main="input"/>\n          <img src="'.concat(n(a),'" alt="" />\n        </div>\n      </div>')),fetchAndRenderTemplates()}();
//# sourceMappingURL=index.329b7a5a.js.map