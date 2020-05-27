'use strict';

const index = require('./index-7b46f2b1.js');

index.patchBrowser().then(options => {
  return index.bootstrapLazy([["loading-bar.cjs",[[1,"loading-bar"]]]], options);
});
