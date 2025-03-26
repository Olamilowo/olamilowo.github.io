// script.js
const schools = Array.from({ length: 30 }, (_, i) => `School ${i + 1}`);
const classes = ["Form 1", "Form 2", "Form 3", "Form 4", "Form 5", "Form 6"];
const studentNames = Array.from({ length: 30 }, (_, i) => `Student ${i + 1}`);

const attendanceData = [];
const dates = ["2023-10-01", "2023-10-02", "2023-10-03"];

// Generate attendance data for all schools, classes, and dates
for (const school of schools) {
  for (const cls of classes) {
    for (const date of dates) {
      const studentsAttendance = studentNames.map((name, index) => ({
        id: index + 1, // Unique ID for each student
        name,
        school, // Include the school
        class: cls, // Include the class
        checkIn: Math.random() > 0.1 ? `08:${Math.floor(Math.random() * 30).toString().padStart(2, "0")}` : "-",
        checkOut: Math.random() > 0.1 ? `14:${Math.floor(Math.random() * 30).toString().padStart(2, "0")}` : "-",
        status: Math.random() > 0.1 ? "Present" : "Absent",
      }));
      attendanceData.push({ date, school, class: cls, students: studentsAttendance });
    }
  }
}
localStorage.setItem("attendanceData", JSON.stringify(attendanceData));

const schoolSelect = document.querySelector("#school-select");
const classSelect = document.querySelector("#class-select");
const attendanceByDate = document.querySelector("#attendance-by-date");

// Populate school dropdown
schools.forEach(school => {
  const option = document.createElement("option");
  option.value = school;
  option.textContent = school;
  schoolSelect.appendChild(option);
});

function renderAttendance(data, selectedSchool, selectedClass) {
  attendanceByDate.innerHTML = "";

  const groupedByDate = data
    .filter(record => record.school === selectedSchool && record.class === selectedClass)
    .reduce((acc, record) => {
      if (!acc[record.date]) acc[record.date] = [];
      acc[record.date].push(...record.students);
      return acc;
    }, {});

  for (const [date, students] of Object.entries(groupedByDate)) {
    const groupDiv = document.createElement("div");
    groupDiv.className = "attendance-group";

    const heading = document.createElement("h2");
    heading.textContent = `Date: ${date} | School: ${selectedSchool} | Class: ${selectedClass}`;
    groupDiv.appendChild(heading);

    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Check-In</th>
          <th>Check-Out</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${students.map(student => `
          <tr>
            <td><a href="student-report.html?id=${student.id}&school=${encodeURIComponent(student.school)}&class=${encodeURIComponent(student.class)}" target="_blank">${student.name}</a></td>
            <td>${student.checkIn}</td>
            <td>${student.checkOut}</td>
            <td>${student.status}</td>
          </tr>
        `).join("")}
      </tbody>
    `;
    groupDiv.appendChild(table);
    attendanceByDate.appendChild(groupDiv);
  }
}

schoolSelect.addEventListener("change", () => {
  renderAttendance(attendanceData, schoolSelect.value, classSelect.value);
});

classSelect.addEventListener("change", () => {
  renderAttendance(attendanceData, schoolSelect.value, classSelect.value);
});

// Initial render for the first school and class
renderAttendance(attendanceData, schools[0], "Form 1");