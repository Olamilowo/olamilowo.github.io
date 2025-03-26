// student-report.js

// Create an array of 30 students with random details.
const students = Array.from({ length: 30 }, (_, index) => {
  // Randomly assign gender.
  const genders = ['Male', 'Female'];
  const randomGender = genders[Math.floor(Math.random() * genders.length)];

  return {
    id: index + 1, // Unique ID for each student (1 to 30)
    name: `Student ${index + 1}`,
    sex: randomGender,
    age: Math.floor(Math.random() * 3) + 14, // Age between 14 and 16
    class: `Form ${Math.floor(Math.random() * 6) + 1}`, // Random class from Form 1 to Form 6
    parent: `Parent ${index + 1}`,
    phone: `+123456789${index}`,
    email: `student${index + 1}@example.com`,
    address: `Address ${index + 1}, Some City`,
    // Avatar image using a placeholder service (pravatar.cc)
    avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
    attendance: {
      totalDays: 3,
      daysPresent: Math.floor(Math.random() * 4), // Random between 0 and 3
    },
  };
});

// Extract student ID, school, and class from URL parameters.
const urlParams = new URLSearchParams(window.location.search);
const studentIdParam = urlParams.get("id");
const studentId = parseInt(studentIdParam);
const school = decodeURIComponent(urlParams.get("school") || "Unknown School");
const studentClass = decodeURIComponent(urlParams.get("class") || "Unknown Class");

console.log("Student ID from URL:", studentId);
console.log("School from URL:", school);
console.log("Class from URL:", studentClass);

// Validate student ID.
if (isNaN(studentId)) {
  console.error("Invalid Student ID");
  document.querySelector("main").innerHTML = "<p>Invalid Student ID.</p>";
} else {
  // Find the student matching the student ID.
  const student = students.find(student => student.id === studentId);
  console.log("Student Object:", student);

  if (student) {
    // Helper functions.
    const updateElementText = (selector, text) => {
      const el = document.querySelector(selector);
      if (el) {
        el.textContent = text;
      }
    };

    const updateElementSrc = (selector, src) => {
      const el = document.querySelector(selector);
      if (el) {
        el.src = src;
      }
    };

    // Update student profile details.
    updateElementText("#student-name", student.name);
    updateElementText("#student-age", student.age);
    updateElementText("#student-sex", student.sex);
    updateElementText("#student-address", student.address);
    updateElementText("#student-class", studentClass);
    updateElementText("#student-school", school);
    updateElementText("#student-parent", student.parent);
    updateElementText("#student-phone", student.phone);
    updateElementText("#student-email", student.email);
    updateElementSrc("#student-avatar", student.avatar);

    // Update attendance details.
    const totalDays = student.attendance.totalDays;
    const daysPresent = student.attendance.daysPresent;
    const attendancePercent = ((daysPresent / totalDays) * 100).toFixed(2);
    updateElementText("#total-days", totalDays);
    updateElementText("#days-present", daysPresent);
    updateElementText("#attendance-percent", `${attendancePercent}%`);

    // Create a pie chart for attendance using Chart.js.
    const ctx = document.getElementById('attendanceChart').getContext('2d');
    const absentDays = totalDays - daysPresent;
    const attendanceChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Days Present', 'Days Absent'],
        datasets: [{
          data: [daysPresent, absentDays],
          outerHeight: ['50px'],
          backgroundColor: ['#4CAF50', '#FF5722'], // Green for present, red for absent
          hoverBackgroundColor: ['#66BB6A', '#FF7043']
        }]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  } else {
    // If no student is found.
    document.querySelector("main").innerHTML = "<p>Student not found.</p>";
  }
}

// Delete button functionality.
const deleteButton = document.querySelector("#delete-btn");
if (deleteButton) {
  deleteButton.addEventListener("click", () => {
    // For demonstration, simply clear the container.
    document.querySelector(".container").innerHTML = "<p>Student profile deleted.</p>";
  });
}


