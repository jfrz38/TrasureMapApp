import { a as patchEsm, b as bootstrapLazy } from './index-b4bf26d7.js';
var defineCustomElements = function (win, options) { return patchEsm().then(function () {
    return bootstrapLazy([["loading-bar", [[1, "loading-bar"]]]], options);
}); };
export { defineCustomElements };
