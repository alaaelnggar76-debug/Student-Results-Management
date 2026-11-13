// =====================================
// 1. Student Class - Encapsulation
// =====================================

class Student {

    // Private Fields
    #name;
    #grade1;
    #grade2;
    #grade3;
    #attendance;

    constructor(name, grade1, grade2, grade3, attendance) {

        this.name = name;
        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
        this.attendance = attendance;

    }

    // Name Setter
    set name(value) {

        if (!value || value.trim() === "") {
            throw new Error("من فضلك أدخلي اسم الطالب.");
        }

        this.#name = value.trim();
    }

    get name() {
        return this.#name;
    }


    // Grade 1 Setter
    set grade1(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("من فضلك أدخلي درجة المادة الأولى.");
        }

        const grade = Number(value);

        if (!Number.isFinite(grade) || grade < 0 || grade > 100) {
            throw new Error("درجة المادة الأولى يجب أن تكون من 0 إلى 100.");
        }

        this.#grade1 = grade;
    }

    get grade1() {
        return this.#grade1;
    }


    // Grade 2 Setter
    set grade2(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("من فضلك أدخلي درجة المادة الثانية.");
        }

        const grade = Number(value);

        if (!Number.isFinite(grade) || grade < 0 || grade > 100) {
            throw new Error("درجة المادة الثانية يجب أن تكون من 0 إلى 100.");
        }

        this.#grade2 = grade;
    }

    get grade2() {
        return this.#grade2;
    }


    // Grade 3 Setter
    set grade3(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("من فضلك أدخلي درجة المادة الثالثة.");
        }

        const grade = Number(value);

        if (!Number.isFinite(grade) || grade < 0 || grade > 100) {
            throw new Error("درجة المادة الثالثة يجب أن تكون من 0 إلى 100.");
        }

        this.#grade3 = grade;
    }

    get grade3() {
        return this.#grade3;
    }


    // Attendance Setter
    set attendance(value) {

        if (value === "" || value === null || value === undefined) {
            throw new Error("من فضلك أدخلي نسبة الحضور.");
        }

        const attendance = Number(value);

        if (!Number.isFinite(attendance) ||
            attendance < 0 || attendance > 100) {

            throw new Error("نسبة الحضور يجب أن تكون من 0 إلى 100.");
        }

        this.#attendance = attendance;
    }

    get attendance() {
        return this.#attendance;
    }


    // Calculate Average
    get average() {

        const grades = [
            this.#grade1,
            this.#grade2,
            this.#grade3
        ];

        return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    }

}


// =====================================
// 2. Students Array
// =====================================

const studentsList = [];


// =====================================
// 3. Get HTML Elements (DOM)
// =====================================

const studentName = document.getElementById("studentName");

const grade1 = document.getElementById("grade1");
const grade2 = document.getElementById("grade2");
const grade3 = document.getElementById("grade3");

const attendance = document.getElementById("attendance");

const addStudentBtn = document.getElementById("addStudentBtn");
const mercyBtn = document.getElementById("mercyBtn");

const errorMessage = document.getElementById("errorMessage");

const studentsContainer = document.getElementById("studentsList");

const mercyReport = document.getElementById("mercyReport");


// =====================================
// 4. Helper Functions
// =====================================

function formatNumber(number) {
    return Number(number.toFixed(2));
}


// Protect names when displaying HTML
function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function (char) {

        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];
    });
}


// =====================================
// 5. Display Students
// =====================================

function displayStudents() {

    if (studentsList.length === 0) {

        studentsContainer.innerHTML = `
            <tr>
                <td colspan="7" class="empty-state">
                    لم تتم إضافة أي طلاب حتى الآن.
                </td>
            </tr>
        `;

        return;
    }

    studentsContainer.innerHTML = studentsList.map((student, index) => {

        return `
            <tr>
                <td>${index + 1}</td>

                <td>${escapeHTML(student.name)}</td>

                <td>${student.grade1}</td>

                <td>${student.grade2}</td>

                <td>${student.grade3}</td>

                <td>${formatNumber(student.average)}</td>

                <td>${student.attendance}%</td>
            </tr>
        `;

    }).join("");

}


// =====================================
// 6. Add Student - Try & Catch
// =====================================

addStudentBtn.addEventListener("click", function () {

    try {

        // Clear previous error
        errorMessage.textContent = "";
        errorMessage.classList.add("d-none");

        // Create new Student Object
        const newStudent = new Student(
            studentName.value,
            grade1.value,
            grade2.value,
            grade3.value,
            attendance.value
        );

        // Add student to array
        studentsList.push(newStudent);

        // Display students
        displayStudents();

        // Clear input fields
        document.getElementById("studentForm").reset();

        // Clear previous report
        mercyReport.innerHTML = `
            <div class="report-placeholder">
                <i class="bi bi-clipboard-data"></i>
                <p>تم تحديث قائمة الطلاب. يمكنك تفعيل لجنة الرأفة.</p>
            </div>
        `;

    }

    catch (error) {

        errorMessage.textContent = error.message;

        errorMessage.classList.remove("d-none");

    }

});


// =====================================
// 7. Mercy Committee
// Filter - Map - Reduce
// =====================================

mercyBtn.addEventListener("click", function () {

    // Filter students with average between 40 and 49
    const strugglingStudents = studentsList.filter(student => {

        return student.average >= 40 && student.average <= 49;

    });


    // Check if there are no struggling students
    if (strugglingStudents.length === 0) {

        mercyReport.innerHTML = `
            <div class="report-placeholder">
                <i class="bi bi-check-circle"></i>

                <p>
                    لا يوجد طلاب متعثرون يحتاجون إلى لجنة الرأفة.
                </p>
            </div>
        `;

        return;
    }


    // Map: Add 5 mercy marks to each average
    const updatedStudents = strugglingStudents.map(student => {

        return {

            name: student.name,

            oldAverage: student.average,

            newAverage: student.average + 5

        };

    });


    // Reduce: Calculate total of new averages
    const totalAverage = updatedStudents.reduce((sum, student) => {

        return sum + student.newAverage;

    }, 0);


    // Calculate general average after mercy
    const generalAverage = totalAverage / updatedStudents.length;


    // Display Final Report
    mercyReport.innerHTML = `

        <div class="report-content">

            <h4>التقرير النهائي للجنة الرأفة</h4>

            <div class="report-stat">
                <span>عدد الطلاب المتعثرين:</span>

                <strong>${updatedStudents.length}</strong>
            </div>

            <hr>

            <h5>أسماء الطلاب ونتائجهم:</h5>

            ${updatedStudents.map((student, index) => `

                <div class="student-report">

                    <p>
                        ${index + 1}. ${escapeHTML(student.name)}
                    </p>

                    <span>
                        المتوسط قبل الرأفة:
                        ${formatNumber(student.oldAverage)}
                    </span>

                    <span>
                        المتوسط بعد الرأفة:
                        ${formatNumber(student.newAverage)}
                    </span>

                </div>

            `).join("")}

            <hr>

            <div class="final-average">

                <span>المتوسط العام بعد الرأفة:</span>

                <strong>
                    ${formatNumber(generalAverage)}
                </strong>

            </div>

        </div>

    `;

});


// =====================================
// 8. Initial Display
// =====================================

displayStudents();