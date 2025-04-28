// table.js
// ──────── builds the data table; caller passes a callback for clicks
export function drawTable(rows, onIncompleteClick) {
    const container = d3.select('#table-container').html('');
    const table = container.append('table');
  
    const cols = Object.keys(rows[0].values);
    table.append('thead').append('tr')
         .selectAll('th')
         .data(['ID','Missing'].concat(cols))
         .enter().append('th')
         .text(d => d);
  
    const tbody = table.append('tbody');
    const tr = tbody.selectAll('tr')
         .data(rows)
         .enter().append('tr')
         .on('click', (_, d) => d.missing && onIncompleteClick(d.id));
  
    tr.append('td').text(d => d.id);
    tr.append('td').text(d => d.missing);
    cols.forEach(col => tr.append('td')
         .text(d => d.values[col] == null ? '' : d.values[col]));
  }
  