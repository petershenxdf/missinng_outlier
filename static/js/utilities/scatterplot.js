// scatterplot.js – zoom + point‑size slider + density contours
import { state, SCATTER_SIZE } from './constants.js';

const { width: W, height: H } = SCATTER_SIZE;
const M = 40;                 // margin on each side
let svg, gPlot;               // persistent refs

export function drawScatter(points) {
  // wipe previous plot
  d3.select('#scatterplot').html('');

  // root svg + zoomable group
  svg = d3.select('#scatterplot')
          .append('svg')
          .attr('width',  W)
          .attr('height', H);

  gPlot = svg.append('g').attr('class', 'plot');

  // scales
  const x = d3.scaleLinear()
              .domain(d3.extent(points, d => d.x)).nice()
              .range([M, W - M]);
  const y = d3.scaleLinear()
              .domain(d3.extent(points, d => d.y)).nice()
              .range([H - M, M]);

  /* ───────── Density contours: computed BEFORE drawing dots ───────── */
  const contours = d3.contourDensity()
                    .x(d => x(d.x))
                    .y(d => y(d.y))
                    .size([W, H])
                    .bandwidth(30)       // tune for smoothness
                    (points);

  gPlot.append('g')
       .attr('class', 'density-layer')
       .selectAll('path')
       .data(contours)
       .enter().append('path')
         .attr('d', d3.geoPath())
         .attr('fill', '#999')
         .attr('opacity', 0.25);

  /* ───────────────────── Scatter dots ───────────────────── */
  gPlot.selectAll('circle.data')
       .data(points, d => d.id)
       .enter().append('circle')
         .attr('class', 'data')
         .attr('cx', d => x(d.x))
         .attr('cy', d => y(d.y))
         .attr('r',  state.pointSize)
         .attr('fill', 'steelblue');

  /* zoom / pan */
  svg.call(
    d3.zoom()
      .scaleExtent([0.5, 10])
      .on('zoom', (e) => gPlot.attr('transform', e.transform))
  );

  highlightPoints(state.highlighted);  // restore selection if any
}

/* ───────── Highlight helpers ───────── */
export function highlightPoints(ids) {
  if (!gPlot) return;
  const base = state.pointSize;
  gPlot.selectAll('circle.data')
       .attr('fill', d => ids.includes(d.id) ? 'red' : 'steelblue')
       .attr('r',   d => ids.includes(d.id) ? base + 3 : base);
}

export function updatePointSize(size) {
  state.pointSize = size;
  highlightPoints(state.highlighted); // update radii
}