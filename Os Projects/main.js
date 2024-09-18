document.addEventListener('DOMContentLoaded', function() {
    const fcfsRadio = document.getElementById('fcfs');
    const sjfRadio = document.getElementById('sjf');
    const priorityRadio = document.getElementById('priority');
  
    const fcfsSection = document.getElementById('fcfs-section');
    const sjfSection = document.getElementById('sjf-section');
    const prioritySection = document.getElementById('priority-section');
  
    const compareBtn = document.getElementById('compare-btn');
    const compareSJFBtn = document.getElementById('compare-sjf-btn');
    const comparePriorityBtn = document.getElementById('compare-priority-btn');
  
    const outputSection = document.getElementById('output-section');
    const preemptiveOutput = document.getElementById('preemptive-output');
    const nonPreemptiveOutput = document.getElementById('nonpreemptive-output');
    const comparisonInfo = document.getElementById('comparison-info');
  
    // Show appropriate section based on selected radio button
    function updateSection() {
      if (fcfsRadio.checked) {
        fcfsSection.classList.remove('d-none');
        sjfSection.classList.add('d-none');
        prioritySection.classList.add('d-none');
      } else if (sjfRadio.checked) {
        fcfsSection.classList.add('d-none');
        sjfSection.classList.remove('d-none');
        prioritySection.classList.add('d-none');
      } else if (priorityRadio.checked) {
        fcfsSection.classList.add('d-none');
        sjfSection.classList.add('d-none');
        prioritySection.classList.remove('d-none');
      }
    }
  
    // Event listeners for radio buttons
    fcfsRadio.addEventListener('change', updateSection);
    sjfRadio.addEventListener('change', updateSection);
    priorityRadio.addEventListener('change', updateSection);
  
    function parseProcesses(input) {
      const lines = input.trim().split('\n');
      return lines.map(line => {
        const [process, arrival, burst, priority] = line.split(',').map(item => item.trim());
        return {
          process,
          arrival: parseInt(arrival, 10),
          burst: parseInt(burst, 10),
          priority: priority ? parseInt(priority, 10) : null
        };
      });
    }
  
    function calculateMetrics(processes) {
      // Example calculation of metrics
      // To be replaced with actual scheduling calculations
  
      const results = processes.map(p => ({
        process: p.process,
        arrival: p.arrival,
        burst: p.burst,
        completion: p.arrival + p.burst // Placeholder
      }));
  
      const averageWaitTime = results.reduce((acc, p) => acc + (p.completion - p.arrival - p.burst), 0) / results.length;
      const averageTurnaroundTime = results.reduce((acc, p) => acc + (p.completion - p.arrival), 0) / results.length;
  
      return { results, averageWaitTime, averageTurnaroundTime };
    }
  
    function displayResults(preemptiveProcesses, nonPreemptiveProcesses) {
      const preemptiveMetrics = calculateMetrics(parseProcesses(preemptiveProcesses));
      const nonPreemptiveMetrics = calculateMetrics(parseProcesses(nonPreemptiveProcesses));
  
      // Populate tables
      preemptiveOutput.innerHTML = preemptiveMetrics.results.map(p =>
        `<tr><td>${p.process}</td><td>${p.arrival}</td><td>${p.burst}</td><td>${p.completion}</td></tr>`
      ).join('');
  
      nonPreemptiveOutput.innerHTML = nonPreemptiveMetrics.results.map(p =>
        `<tr><td>${p.process}</td><td>${p.arrival}</td><td>${p.burst}</td><td>${p.completion}</td></tr>`
      ).join('');
  
      // Display extra information
      comparisonInfo.innerHTML = `
        <h4>Comparison Summary</h4>
        <p>Average Waiting Time for Preemptive: ${preemptiveMetrics.averageWaitTime.toFixed(2)}</p>
        <p>Average Turnaround Time for Preemptive: ${preemptiveMetrics.averageTurnaroundTime.toFixed(2)}</p>
        <p>Average Waiting Time for Non-Preemptive: ${nonPreemptiveMetrics.averageWaitTime.toFixed(2)}</p>
        <p>Average Turnaround Time for Non-Preemptive: ${nonPreemptiveMetrics.averageTurnaroundTime.toFixed(2)}</p>
      `;
  
      outputSection.classList.remove('d-none');
    }
  
    // Handle compare button click for FCFS
    compareBtn.addEventListener('click', function() {
      const preemptiveProcesses = document.getElementById('preemptive-processes').value;
      const nonPreemptiveProcesses = document.getElementById('nonpreemptive-processes').value;
  
      displayResults(preemptiveProcesses, nonPreemptiveProcesses);
    });
  
    // Handle compare button click for SJF/SRTF
    compareSJFBtn.addEventListener('click', function() {
      const preemptiveProcesses = document.getElementById('preemptive-sjf-processes').value;
      const nonPreemptiveProcesses = document.getElementById('nonpreemptive-sjf-processes').value;
  
      displayResults(preemptiveProcesses, nonPreemptiveProcesses);
    });
  
    // Handle compare button click for Priority Scheduling
    comparePriorityBtn.addEventListener('click', function() {
      const preemptiveProcesses = document.getElementById('preemptive-priority-processes').value;
      const nonPreemptiveProcesses = document.getElementById('nonpreemptive-priority-processes').value;
  
      displayResults(preemptiveProcesses, nonPreemptiveProcesses);
    });
  });
  