import { a as patchEsm, b as bootstrapLazy } from './index-b4bf26d7.js';

const defineCustomElements = (win, options) => patchEsm().then(() => {
  return bootstrapLazy([["loading-bar",[[1,"loading-bar"]]]], options);
});

export { defineCustomElements };
