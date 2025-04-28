// main.js
// ─────── pulls everything together & attaches DOM listeners
import { METHODS, state }      from './utilities/constants.js';
import { uploadFile,
         fetchTable,
         fetchEmbedding,
         fetchNeighbors }      from './utilities/api.js';

import { drawScatter }         from './utilities/scatterplot.js';
import { drawTable }           from './utilities/table.js';
import { drawBarChart }        from './utilities/barChart.js';
//import { state }            from './utilities/constants.js';
import { clearBarChart }    from './utilities/barChart.js';
import { highlightPoints }  from './utilities/scatterplot.js';
/* 1. CSV upload ----------------------------------------------------------- */
document.getElementById('upload-form').addEventListener('submit', async e => {
  e.preventDefault();
  const fileInput = document.getElementById('file-input');
  if (!fileInput.files.length) return alert('Please select a CSV file.');

  const fd = new FormData();
  fd.append('file', fileInput.files[0]);

  try {
    await uploadFile(fd);                     // backend processes dataset
    showUIAfterUpload();
    await initialiseTableAndScatter();        // first render
  } catch (err) {
    alert(err.message);
  }
});

/* 2. Once upload succeeds, build method buttons + fetch initial data */
function showUIAfterUpload() {
  document.getElementById('method-bar').style.display   = 'block';
  document.getElementById('visualization').style.display = 'block';
  buildMethodButtons();
}

async function initialiseTableAndScatter() {
  const rows = await fetchTable();
  drawTable(rows, handleRowClick);
  const points = await fetchEmbedding(state.currentMethod);
  drawScatter(points);
}

/* 3. DR selector buttons -------------------------------------------------- */
function buildMethodButtons() {
  METHODS.forEach(m => {
    const btn = document.querySelector(`button[data-method="${m}"]`);
    btn.disabled = m === state.currentMethod;  // default highlight
    btn.addEventListener('click', () => switchMethod(m));
  });
}

async function switchMethod(method) {
  if (method === state.currentMethod) return;
  state.currentMethod = method;
  document.querySelectorAll('#method-bar button').forEach(b =>
    b.disabled = b.dataset.method === method);

  try {
    const points = await fetchEmbedding(method);
    drawScatter(points);
  } catch (err) {
    document.getElementById('method-msg').textContent = err.message;
  }
}

/* 4. Table row click handler --------------------------------------------- */
async function handleRowClick(rowId) {
  try {
    const { neighbors, mean_outlier_score } = await fetchNeighbors(rowId);
    drawBarChart(neighbors, mean_outlier_score);
  } catch (err) {
    console.error(err);
  }
}

/* 5. Reset-highlights button -------------------------------------------- */
document.getElementById('reset-btn').addEventListener('click', () => {
    state.highlighted = [];
    highlightPoints([]);      // repaint all blue / small
    clearBarChart();          // empty the bar-chart div
    document.getElementById('reset-btn').style.display = 'none';
  });