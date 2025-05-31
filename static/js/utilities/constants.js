// constants.js – single source of sizing truth + global state
export const METHODS = ['mds', 'tsne', 'pca', 'isomap', 'umap'];

// 🔧  Change these numbers and refresh – everything resizes
export const SCATTER_SIZE = { width: 700, height: 550 };
export const TABLE_SIZE   = { maxWidth: 500 };   // px

export const state = {
  currentMethod : 'mds',
  cache         : {},      // { method : points[] }
  highlighted   : [],      // neighbour IDs currently red
  pointSize     : 5,       // default radius (slider changes this)
};