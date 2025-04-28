// constants.js
// ─────────────
export const METHODS = ['mds', 'tsne', 'pca', 'isomap', 'umap'];

/* global app-state */
export const state = {
  currentMethod : 'mds',
  cache         : {},      // { method : points[] }
  highlighted   : []       // array of neighbour-IDs currently in red
};