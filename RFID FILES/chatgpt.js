/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const logoutButton = document.getElementById('logoutButton');
  
    // Dummy credentials for demonstration
    const validUsername = 'admin';
    const validPassword = 'admin';
  
    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      if (username === validUsername && password === validPassword) {
        loginError.style.display = 'none';
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        loadDashboardData();
      } else {
        loginError.style.display = 'block';
      }
    });
  
    // Handle logout button
    logoutButton.addEventListener('click', () => {
      dashboardSection.style.display = 'none';
      loginSection.style.display = 'block';
    });
  
    // Function to load dummy dashboard data
    function loadDashboardData() {
      // Dummy attendance records
      const attendanceRecords = [
        { name: 'John Doe', class: '10-A', status: 'Present', time: new Date().toLocaleTimeString() },
        { name: 'Jane Smith', class: '10-A', status: 'Absent', time: '-' },
        { name: 'Alice Johnson', class: '10-B', status: 'Present', time: new Date().toLocaleTimeString() }
      ];
  
      document.getElementById('totalStudents').innerText = attendanceRecords.length;
      const presentCount = attendanceRecords.filter(record => record.status === 'Present').length;
      const absentCount = attendanceRecords.filter(record => record.status === 'Absent').length;
      document.getElementById('presentToday').innerText = presentCount;
      document.getElementById('absentToday').innerText = absentCount;
  
      const attendanceTable = document.getElementById('attendanceTable');
      attendanceTable.innerHTML = '';
      attendanceRecords.forEach((record, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${index + 1}</td>
                         <td>${record.name}</td>
                         <td>${record.class}</td>
                         <td>${record.status}</td>
                         <td>${record.time}</td>`;
        attendanceTable.appendChild(row);
      });
    }
  });
  