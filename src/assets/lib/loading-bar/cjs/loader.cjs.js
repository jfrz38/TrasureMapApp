'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b46f2b1.js');

const defineCustomElements = (win, options) => index.patchEsm().then(() => {
  return index.bootstrapLazy([["loading-bar.cjs",[[1,"loading-bar"]]]], options);
});

exports.defineCustomElements = defineCustomElements;
