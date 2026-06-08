class Student {
    #studentId;
    #firstName;
    #lastName;
    #grades;

    constructor(studentId, firstName, lastName, grades = []) {
        this.#studentId = studentId;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#grades = grades;
    }

    get studentId() {
        return this.#studentId;
    }

    set studentId(value) {
        this.#studentId = value;
    }

    get firstName() {
        return this.#firstName;
    }

    set firstName(value) {
        this.#firstName = value;
    }

    get lastName() {
        return this.#lastName;
    }

    set lastName(value) {
        this.#lastName = value;
    }

    get grades() {
        return [...this.#grades];
    }

    set grades(value) {
        this.#grades = value;
    }

    addGrade(grade) {
        this.#grades.push(grade);
    }

    getAverage() {
        if (this.#grades.length === 0) return 0.0;
        return this.#grades.reduce((sum, g) => sum + g, 0) / this.#grades.length;
    }

    getStudentInfo() {
        return (
            `Student ID: ${this.#studentId}\n` +
            `Name: ${this.#firstName} ${this.#lastName}\n` +
            `Average Grade: ${this.getAverage().toFixed(2)}`
        );
    }
}

class GraduateStudent extends Student {
    #thesisTitle;

    constructor(studentId, firstName, lastName, thesisTitle, grades = []) {
        super(studentId, firstName, lastName, grades);
        this.#thesisTitle = thesisTitle;
    }

    get thesisTitle() {
        return this.#thesisTitle;
    }

    set thesisTitle(value) {
        this.#thesisTitle = value;
    }

    getStudentInfo() {
        return `${super.getStudentInfo()}\nThesis Title: ${this.#thesisTitle}`;
    }
}

class Course {
    #courseId;
    #courseName;
    #students;

    constructor(courseId, courseName) {
        this.#courseId = courseId;
        this.#courseName = courseName;
        this.#students = [];
    }

    get courseId() {
        return this.#courseId;
    }

    set courseId(value) {
        this.#courseId = value;
    }

    get courseName() {
        return this.#courseName;
    }

    set courseName(value) {
        this.#courseName = value;
    }

    get students() {
        return [...this.#students];
    }

    enrollStudent(student) {
        this.#students.push(student);
    }

    removeStudent(studentId) {
        this.#students = this.#students.filter(s => s.studentId !== studentId);
    }

    calculateAverage() {
        if (this.#students.length === 0) return 0.0;
        const total = this.#students.reduce((sum, s) => sum + s.getAverage(), 0);
        return total / this.#students.length;
    }

    getCourseInfo() {
        return (
            `Course ID: ${this.#courseId}\n` +
            `Course Name: ${this.#courseName}\n` +
            `Enrolled Students: ${this.#students.length}\n` +
            `Course Average: ${this.calculateAverage().toFixed(2)}`
        );
    }

    listStudents() {
        if (this.#students.length === 0) return "No students enrolled.";
        return this.#students.map(s => s.getStudentInfo()).join("\n\n");
    }
}

if (require.main === module) {
    const s1 = new Student("S001", "Alice", "Johnson", [85, 92, 78]);
    const s2 = new Student("S002", "Bob", "Smith", [76, 88, 91]);

    const g1 = new GraduateStudent("S003", "Carol", "Davis", "Machine Learning in Healthcare", [95, 89, 94]);

    const course = new Course("CS101", "Introduction to Computer Science");
    course.enrollStudent(s1);
    course.enrollStudent(s2);
    course.enrollStudent(g1);

    console.log("=== Course Info ===");
    console.log(course.getCourseInfo());

    console.log("\n=== All Students ===");
    console.log(course.listStudents());

    console.log("\n=== Polymorphism Demo ===");
    console.log("Undergraduate Student Info:");
    console.log(s1.getStudentInfo());
    console.log("\nGraduate Student Info:");
    console.log(g1.getStudentInfo());
}