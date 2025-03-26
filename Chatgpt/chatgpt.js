document.addEventListener('DOMContentLoaded', () => {
    // Global arrays for classes and students
    let classes = [];
    // Create 6 forms (Form 1 to Form 6) each with arms A-D
    for (let formNumber = 1; formNumber <= 6; formNumber++) {
      ['A', 'B', 'C', 'D'].forEach(arm => {
        let className = `Form ${formNumber}${arm}`;
        let teacher = `Teacher ${formNumber}${arm}`;
        classes.push({ id: classes.length + 1, className: className, teacher: teacher });
      });
    }
  
    // Arrays of actual first and last names for students
    const firstNames = [
      "James", "Mary", "John", "Patricia", "Robert", "Jennifer",
      "Michael", "Linda", "William", "Elizabeth", "David", "Barbara",
      "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah",
      "Charles", "Karen"
    ];
    const lastNames = [
      "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller",
      "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson",
      "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson",
      "Thompson", "White"
    ];
  
    // Generate 20 students per class with actual names
    let students = [];
    classes.forEach(cls => {
      for (let i = 1; i <= 20; i++) {
        // Generate a random full name
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const fullName = `${firstName} ${lastName}`;
        students.push({ id: students.length + 1, name: fullName, class: cls.className });
      }
    });
  
    // Sections and Elements
    const loginSection = document.getElementById('loginSection');
    const mainSection = document.getElementById('mainSection');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const logoutButton = document.getElementById('logoutButton');
    const navTabs = document.querySelectorAll('#navTabs li');
    const contentSections = document.querySelectorAll('.content-section');
  
    // Dummy credentials for demonstration
    const validUsername = 'admin';
    const validPassword = 'admin';
  
    // Handle Login
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      if (username === validUsername && password === validPassword) {
        loginError.style.display = 'none';
        loginSection.style.display = 'none';
        mainSection.style.display = 'block';
        // Load data for all sections
        loadDashboardData();
        loadStudentData();
        loadClassData();
        initChart();
        initCalendar();
      } else {
        loginError.style.display = 'block';
      }
    });
  
    // Handle Logout
    logoutButton.addEventListener('click', () => {
      mainSection.style.display = 'none';
      loginSection.style.display = 'block';
    });
  
    // Navigation Tab Switching
    navTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        // Hide all sections and remove active class
        contentSections.forEach((section) => section.style.display = 'none');
        navTabs.forEach((t) => t.classList.remove('active'));
        // Show the selected section based on the data-section attribute
        const target = tab.getAttribute('data-section');
        document.getElementById(target).style.display = 'block';
        tab.classList.add('active');
      });
    });
  
    // Dashboard: Load Dummy Attendance Data
    function loadDashboardData() {
      // For demonstration, we use a subset of student attendance records
      const attendanceRecords = [
        { name: 'John Doe', class: 'Form 1A', status: 'Present', time: new Date().toLocaleTimeString() },
        { name: 'Jane Smith', class: 'Form 1A', status: 'Absent', time: '-' },
        { name: 'Alice Johnson', class: 'Form 1B', status: 'Present', time: new Date().toLocaleTimeString() }
      ];
      document.getElementById('totalStudents').innerText = attendanceRecords.length;
      const presentCount = attendanceRecords.filter(r => r.status === 'Present').length;
      const absentCount = attendanceRecords.filter(r => r.status === 'Absent').length;
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
  
    // Student Management: Load Student Data from Global Array
    function loadStudentData() {
      const studentTableBody = document.querySelector('#studentTable tbody');
      studentTableBody.innerHTML = '';
      students.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${student.id}</td>
                         <td>${student.name}</td>
                         <td>${student.class}</td>
                         <td>
                           <button onclick="editStudent(${student.id})">Edit</button> 
                           <button onclick="deleteStudent(${student.id})">Delete</button>
                         </td>`;
        studentTableBody.appendChild(row);
      });
    }
  
    // Class Management: Load Class Data from Global Array
    function loadClassData() {
      const classTableBody = document.querySelector('#classTable tbody');
      classTableBody.innerHTML = '';
      classes.forEach((cls) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${cls.id}</td>
                         <td>${cls.className}</td>
                         <td>${cls.teacher}</td>
                         <td>
                           <button onclick="editClass(${cls.id})">Edit</button> 
                           <button onclick="deleteClass(${cls.id})">Delete</button>
                         </td>`;
        classTableBody.appendChild(row);
      });
    }
  
    // Event Listener: Add New Student
    document.getElementById('addStudentButton').addEventListener('click', () => {
      const name = prompt("Enter student's full name:");
      const className = prompt("Enter student's class (e.g., Form 1A):");
      if (name && className) {
        const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
        students.push({ id: newId, name: name, class: className });
        loadStudentData();
      }
    });
  
    // Event Listener: Add New Class
    document.getElementById('addClassButton').addEventListener('click', () => {
      const className = prompt("Enter new class name (e.g., Form 7A):");
      const teacher = prompt("Enter teacher's name for this class:");
      if (className && teacher) {
        const newId = classes.length ? Math.max(...classes.map(c => c.id)) + 1 : 1;
        classes.push({ id: newId, className: className, teacher: teacher });
        loadClassData();
      }
    });
  
    // Reports & Analytics: Initialize Chart using Chart.js
    function initChart() {
      const ctx = document.getElementById('attendanceChart').getContext('2d');
      const data = {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [{
          label: 'Attendance %',
          data: [90, 85, 95, 80, 88],
          backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
      };
      new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });
    }
  
    // Calendar & Events: Initialize FullCalendar
    function initCalendar() {
      const calendarEl = document.getElementById('calendar');
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
          { title: 'School Assembly', start: new Date().toISOString().split('T')[0] },
          { title: 'Sports Day', start: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0] }
        ]
      });
      calendar.render();
    }
  });
  
  // Dummy functions for edit and delete actions (to be implemented as needed)
  function editStudent(studentId) {
    alert('Edit Student ID: ' + studentId);
  }
  
  function deleteStudent(studentId) {
    alert('Delete Student ID: ' + studentId);
  }
  
  function editClass(classId) {
    alert('Edit Class ID: ' + classId);
  }
  
  function deleteClass(classId) {
    alert('Delete Class ID: ' + classId);
  }
  
  