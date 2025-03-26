// general-report.js
// Fetch attendanceData from localStorage
const attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];

// Initialize filters and chart
const schoolFilter = document.querySelector("#school-filter");
const classFilter = document.querySelector("#class-filter");
const ctx = document.getElementById('attendance-trends').getContext('2d');
const attendanceChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], // Dates
    datasets: [{
      label: 'Daily Attendance %',
      data: [],
      borderColor: '#6200ea',
      tension: 0.1
    }]
  }
});

// Populate school filter
const schools = [...new Set(attendanceData.map(record => record.school))];
schools.forEach(school => {
  const option = document.createElement("option");
  option.value = school;
  option.textContent = school;
  schoolFilter.appendChild(option);
});

function updateReport() {
  const selectedSchool = schoolFilter.value;
  const selectedClass = classFilter.value;

  // Filter data
  const filteredData = attendanceData.filter(record => {
    return (selectedSchool === "all" || record.school === selectedSchool) &&
           (selectedClass === "all" || record.class === selectedClass);
  });

  // Aggregate data by date for the chart
  const dateAggregation = filteredData.reduce((acc, record) => {
    if (!acc[record.date]) {
      acc[record.date] = {
        totalStudents: 0,
        presentStudents: 0
      };
    }
    acc[record.date].totalStudents += record.students.length;
    acc[record.date].presentStudents += record.students.filter(s => s.status === "Present").length;
    return acc;
  }, {});

  // Prepare chart data (dates as labels, attendance percentages as data)
  const chartLabels = Object.keys(dateAggregation);
  const chartData = Object.values(dateAggregation).map(day => 
    (day.presentStudents / day.totalStudents * 100).toFixed(1)
  );

  // Update chart
  attendanceChart.data.labels = chartLabels;
  attendanceChart.data.datasets[0].data = chartData;
  attendanceChart.update();

  // Aggregate data for the table (school-class groups)
  const schoolClassGroups = filteredData.reduce((acc, record) => {
    const key = `${record.school}-${record.class}`;
    if (!acc[key]) {
      acc[key] = {
        school: record.school,
        class: record.class,
        totalStudents: 30, // Fixed per your data
        presentStudents: 0
      };
    }
    acc[key].presentStudents += record.students.filter(s => s.status === "Present").length;
    return acc;
  }, {});

  // Update table
  const tableBody = document.querySelector("#detailed-report tbody");
  tableBody.innerHTML = Object.values(schoolClassGroups).map(group => {
    const avgAttendance = ((group.presentStudents / (group.totalStudents * 3)) * 100).toFixed(1);
    return `
      <tr>
        <td>${group.school}</td>
        <td>${group.class}</td>
        <td>${group.totalStudents}</td>
        <td>${avgAttendance}%</td>
      </tr>
    `;
  }).join("");

  // Update summary cards
  const totalStudents = Object.values(schoolClassGroups).length * 30;
  const totalPresent = Object.values(schoolClassGroups).reduce((sum, group) => sum + group.presentStudents, 0);
  const overallAvg = ((totalPresent / (totalStudents * 3)) * 100).toFixed(1);

  document.querySelector("#total-students").textContent = totalStudents;
  document.querySelector("#total-days").textContent = 3; // Fixed to 3 days
  document.querySelector("#attendance-percent").textContent = `${overallAvg}%`;
}

// Event listeners
schoolFilter.addEventListener("change", updateReport);
classFilter.addEventListener("change", updateReport);

// Initial load
updateReport();