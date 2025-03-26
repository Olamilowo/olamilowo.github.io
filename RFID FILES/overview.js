document.addEventListener('DOMContentLoaded', () => {
  // Authentication check
  if (!localStorage.getItem('adminUser')) {
    window.location.href = 'login.html';
  }

  // Logout functionality
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('adminUser');
    window.location.href = 'login.html';
  });

  // Load attendance data
  const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || [];

  // Constants
  const TOTAL_SCHOOLS = 30;
  const CLASSES_PER_SCHOOL = 6;
  const STUDENTS_PER_CLASS = 30;
  const TOTAL_STUDENTS = TOTAL_SCHOOLS * CLASSES_PER_SCHOOL * STUDENTS_PER_CLASS;

  // Get the latest date in the data (simulate "today")
  const dates = [...new Set(attendanceData.map(record => record.date))].sort();
  const latestDate = dates.length > 0 ? dates[dates.length - 1] : null;

  // Calculate metrics ---------------------------------------------------------
  let presentToday = 0;
  let totalPossibleToday = 0;

  if (latestDate) {
    const todaysRecords = attendanceData.filter(record => record.date === latestDate);
    totalPossibleToday = todaysRecords.length * STUDENTS_PER_CLASS; // 30 students per class
    presentToday = todaysRecords.reduce((sum, record) => 
      sum + record.students.filter(s => s.status === 'Present').length, 0
    );
  }

  const absentToday = totalPossibleToday - presentToday;
  const attendanceRate = totalPossibleToday === 0 
    ? 0 
    : ((presentToday / totalPossibleToday) * 100).toFixed(1);

  // Update summary cards
  document.getElementById('total-students').textContent = TOTAL_STUDENTS.toLocaleString();
  document.getElementById('present-today').textContent = presentToday.toLocaleString();
  document.getElementById('absent-today').textContent = absentToday.toLocaleString();
  document.getElementById('attendance-rate').textContent = `${attendanceRate}%`;

  // Attendance Trend Chart (Last 3 Days) ----------------------------------------
  const last3Dates = dates.slice(-3); // Get the latest 3 days
  const trendData = last3Dates.map(date => {
    const dailyRecords = attendanceData.filter(record => record.date === date);
    const totalStudentsForDay = dailyRecords.length * STUDENTS_PER_CLASS;
    const presentForDay = dailyRecords.reduce((sum, record) => 
      sum + record.students.filter(s => s.status === 'Present').length, 0
    );
    return totalStudentsForDay === 0 
      ? 0 
      : ((presentForDay / totalStudentsForDay) * 100).toFixed(1);
  });

  // Initialize/update the trend chart
  const trendCtx = document.getElementById('attendanceTrend').getContext('2d');
  new Chart(trendCtx, {
    type: 'bar',
    data: {
      labels: last3Dates,
      datasets: [{
        label: 'Attendance Percentage',
        data: trendData,
        backgroundColor: '#6200ea',
        borderColor: '#6200ea',
        tension: 0.1,
        fill: false
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { 
          beginAtZero: true,
          max: 100,
          title: { display: true, text: 'Percentage (%)' }
        },
        x: { title: { display: true, text: 'Date' } }
      }
    }
  });

  // Daily Status Chart (Pie) ---------------------------------------------------
  const statusCtx = document.getElementById('dailyStatus').getContext('2d');
  new Chart(statusCtx, {
    type: 'doughnut',
    data: {
      labels: ['Present', 'Absent'],
      datasets: [{
        data: [presentToday, absentToday],
        backgroundColor: ['#6200ea', '#ff4444'],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });

  // Recent Activity Table ------------------------------------------------------
  const recentLogs = attendanceData
    .sort((a, b) => {
      // Sort by date (descending) and time (descending)
      const dateCompare = new Date(b.date) - new Date(a.date);
      if (dateCompare !== 0) return dateCompare;
      return b.timestamp - a.timestamp; // Add timestamp to your data if needed
    })
    .flatMap(record => 
      record.students
        .map(student => ({
          date: record.date,
          name: student.name,
          class: record.class,
          checkIn: student.checkIn,
          status: student.status
        }))
    )
    .slice(0, 5); // Get the 5 most recent entries

  // Populate the table
  const tableBody = document.querySelector('#recent-logs tbody');
  tableBody.innerHTML = recentLogs.map(log => `
    <tr>
      <td>${log.name}</td>
      <td>${log.class}</td>
      <td>${log.checkIn}</td>
      <td><span class="status ${log.status.toLowerCase()}">${log.status}</span></td>
    </tr>
  `).join('');
});