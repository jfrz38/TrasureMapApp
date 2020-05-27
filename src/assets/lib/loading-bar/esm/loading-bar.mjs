import { p as patchBrowser, b as bootstrapLazy } from './index-b4bf26d7.js';

patchBrowser().then(options => {
  return bootstrapLazy([["loading-bar",[[1,"loading-bar"]]]], options);
});
