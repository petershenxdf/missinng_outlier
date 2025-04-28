// scatterplot.js
import { state }        from './constants.js';

const W = 500, H = 500, M = 40;
let svg;                        // keep handle for quick updates

export function drawScatter(points) {
  /* wipe & remake plot */
  d3.select('#scatterplot').html('');
  svg = d3.select('#scatterplot')
          .append('svg')
          .attr('width', W)
          .attr('height', H);

  const x = d3.scaleLinear()
              .domain(d3.extent(points, d => d.x)).nice()
              .range([M, W - M]);
  const y = d3.scaleLinear()
              .domain(d3.extent(points, d => d.y)).nice()
              .range([H - M, M]);

  svg.selectAll('circle.data')
     .data(points, d => d.id)
     .enter().append('circle')
       .attr('class', 'data')
       .attr('cx', d => x(d.x))
       .attr('cy', d => y(d.y))
       .attr('r', 5)
       .attr('fill', 'steelblue')
       .attr('data-row-id', d => d.id);

  /* after drawing, re-apply any existing highlights */
  highlightPoints(state.highlighted);
}

export function highlightPoints(ids) {
  if (!svg) return;
  svg.selectAll('circle.data')
     .attr('fill', d => ids.includes(d.id) ? 'red' : 'steelblue')
     .attr('r',   d => ids.includes(d.id) ? 8 : 5);
}
