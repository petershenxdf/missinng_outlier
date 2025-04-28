// api.js
// ────── centralises all fetch() calls so the other modules stay clean
import { state } from './constants.js';

/* -------- upload CSV ---------- */
export async function uploadFile(formData) {
  const res = await fetch('/upload', { method: 'POST', body: formData });
  const json = await res.json();
  if (json.status !== 'ok') throw new Error(json.error || 'Upload failed');
}

/* -------- dataset-wide info --- */
export async function fetchTable() {
  const res = await fetch('/table');
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.rows;
}

/* -------- embedding ----------- */
export async function fetchEmbedding(method) {
  if (state.cache[method]) return state.cache[method];     // from memory
  const res  = await fetch(`/embedding/${method}`);
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  state.cache[method] = json.points;
  return json.points;
}

/* -------- neighbours ---------- */
export async function fetchNeighbors(rowId) {
  const res  = await fetch(`/neighbors/${rowId}`);
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json;   // { neighbors, mean_outlier_score }
}
