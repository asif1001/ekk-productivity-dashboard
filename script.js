// Function to handle the CSV upload and parsing
function uploadCSV() {
  const fileInput = document.getElementById('csvFileInput');
  const file = fileInput.files[0];

  if (file) {
    Papa.parse(file, {
      header: true,
      complete: function(results) {
        const data = results.data;
        displayCSVData(data);
        plotGraph(data);
      },
      skipEmptyLines: true,
    });
  } else {
    alert("Please upload a CSV file!");
  }
}

// Function to display CSV data in a table
function displayCSVData(data) {
  const tableHead = document.getElementById('tableHead');
  const tableBody = document.getElementById('tableBody');

  // Clear previous data
  tableHead.innerHTML = '';
  tableBody.innerHTML = '';

  // Create table headers
  const headers = Object.keys(data[0]);
  const headRow = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.innerText = header;
    headRow.appendChild(th);
  });
  tableHead.appendChild(headRow);

  // Populate table rows
  data.forEach(row => {
    const bodyRow = document.createElement('tr');
    headers.forEach(header => {
      const td = document.createElement('td');
      td.innerText = row[header];
      bodyRow.appendChild(td);
    });
    tableBody.appendChild(bodyRow);
  });
}

// Function to plot graph using Chart.js
function plotGraph(data) {
  const labels = data.map(row => row['Label']); // Replace 'Label' with your CSV column name
  const values = data.map(row => row['Value']); // Replace 'Value' with your CSV column name

  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'line', // You can change to 'bar', 'pie', etc.
    data: {
      labels: labels,
      datasets: [{
        label: 'Graph Data',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.1,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Labels'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Values'
          }
        }
      }
    }
  });
}
