// barChart.js
import { highlightPoints } from './scatterplot.js';
import { state }           from './constants.js';

const W = 400, H = 200, M = 40;

export function drawBarChart(neighbors, meanScore) {
  d3.select('#bar-chart').html('');
  const svg = d3.select('#bar-chart')
                .append('svg')
                .attr('width', W)
                .attr('height', H);

  const data = neighbors.concat([{ id: 'Mean', outlier_score: meanScore }]);

  const x = d3.scaleBand()
              .domain(data.map(d => d.id))
              .range([M, W - 20]).padding(0.1);
  const y = d3.scaleLinear()
              .domain([0, d3.max(data, d => d.outlier_score)]).nice()
              .range([H - M, 20]);

  svg.append('g').attr('transform', `translate(0,${H - M})`).call(d3.axisBottom(x));
  svg.append('g').attr('transform', `translate(${M},0)`).call(d3.axisLeft(y));

  svg.selectAll('rect')
     .data(data)
     .enter().append('rect')
       .attr('x', d => x(d.id))
       .attr('y', d => y(d.outlier_score))
       .attr('width', x.bandwidth())
       .attr('height', d => H - M - y(d.outlier_score))
       .attr('fill', d => d.id === 'Mean' ? 'green' : 'orange');

  /* ⬇️ persist & highlight */
  state.highlighted = neighbors.map(n => n.id);
  highlightPoints(state.highlighted);

  /* show the reset button now that something is highlighted */
  document.getElementById('reset-btn').style.display = 'inline-block';
}

/* helper for reset-button to clear chart */
export function clearBarChart() {
  d3.select('#bar-chart').html('');
}
