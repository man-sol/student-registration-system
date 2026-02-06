// Get DOM elements
const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTableBody");

// Load  data from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Display students on page load
displayStudents();


  //Form Submit Event

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const index = document.getElementById("index").value;

    // Valid or not
    if (!name || !studentId || !email || !contact) {
        alert("All fields are required");
        return;
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
        alert("Name should contain only characters");
        return;
    }

    if (!/^[0-9]+$/.test(studentId)) {
        alert("Student ID should contain only numbers");
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Invalid email format");
        return;
    }

    if (!/^[0-9]{10,}$/.test(contact)) {
        alert("Contact number must have at least 10 digits");
        return;
    }

    const studentData = { name, studentId, email, contact };

    // Add or Update
    if (index === "") {
        students.push(studentData);
    } else {
        students[index] = studentData;
        document.getElementById("index").value = "";
    }

    // Save to localStorage
    localStorage.setItem("students", JSON.stringify(students));

    form.reset();
    displayStudents();
});

// Display Students
 
function displayStudents() {
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        const row = `
            <tr>
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit" onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Edit Student

function editStudent(index) {
    const student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("studentId").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;
    document.getElementById("index").value = index;
}

// Delete Student
 
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}
