const http = require('http');
const express = require('express'), bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();


app.use(cors());
app.use(bodyParser.json());

const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'vjti@123',
    connectionLimit: 5
});

//student
app.get('/student', async (req, res) => {

    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * from school_data.student`);
        // console.log(rows);
        const jsonS = JSON.stringify(rows)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(jsonS);
    } catch (error) {
        console.log(error);
    }
})
app.get('/student/:student_id', async (req, res) => {
    const studentId = req.params.student_id;

    if (!studentId) {
        return res.status(400).json({ error: "Student ID is required" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        
        // Query to fetch details of the student with the given student_id
        const studentQuery = "SELECT * FROM school_data.student WHERE student_id = ?";
        const values=[studentId.slice(1)];
        const studentRows = await conn.query(studentQuery, values);
        
        // Check if the student exists
        if (!studentRows) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Query to fetch details of the parent with the corresponding student_id
        const parentQuery = "SELECT * FROM school_data.parent WHERE student_id = ?";
        const parentRows = await conn.query(parentQuery, values);

        // Combine student and parent details and send as JSON response
        const studentData = {
            student: studentRows[0],
            parent: parentRows[0] // Assuming one parent per student, adjust if needed
        };

        res.status(200).json(studentData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) {
            conn.release(); // release connection back to the pool
        }
    }
});

app.post('/student', async (req, res) => {
    const { name, DOB, phone, studentClass, parent_name } = req.body;

    if (!name || !DOB || !phone || !studentClass || !parent_name) {
        return res.status(400).json({ error: "All fields are required" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction();


        const studentQuery = "INSERT INTO school_data.student (name, DOB, phone, class) VALUES (?, ?, ?, ?)";
        const studentValues = [name, DOB, phone, studentClass];
        const studentResult = await conn.query(studentQuery, studentValues);
        let studentId = studentResult.insertId;

        if (!studentId) {
            return res.status(400).json({ error: "Student ID not found" });
        }
        const parentQuery = "INSERT INTO school_data.parent (parent_name, parent_phone, student_id) VALUES (?, ?, ?)";
        const parentValues = [parent_name, phone, studentId];
        await conn.query(parentQuery, parentValues);

        await conn.commit();
        studentId = studentId.toString();

        res.status(201).json({ message: "Student and parent details inserted successfully with studentID: ", studentId: studentId });
    } catch (error) {
        console.error(error);

        if (conn) {
            await conn.rollback();
        }
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) {
            conn.release();
        }
    }
});
app.delete('/student/:student_id', async (req, res) => {
    const studentId = req.params.student_id;

    if (!studentId) {
        return res.status(400).json({ error: "Student ID is required" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const query = "DELETE FROM school_data.student WHERE student_id = ?";
        const values = [studentId];
        await conn.query(query, values);

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) {
            conn.release(); // release connection back to the pool
        }
    }
});


//teacher
app.get('/teacher', async (req, res) => {

    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * from school_data.teacher`);
        // console.log(rows);
        const jsonS = JSON.stringify(rows)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(jsonS);
    } catch (error) {
        console.log(error);
    }
})
app.get('/teacher/:teacher_id', async (req, res) => {
    const teacherId = req.params.teacher_id;

    if (!teacherId) {
        return res.status(400).json({ error: "teacher ID is required" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        
        // Query to fetch details of the teacher with the given teacher_id
        const teacherQuery = "SELECT * FROM school_data.teacher WHERE teacher_id = ?";
        const values=[teacherId.slice(1)];
        const teacherRows = await conn.query(teacherQuery, values);
        
        // Check if the teacher exists
        if (!teacherRows) {
            return res.status(404).json({ error: "teacher not found" });
        }

        // Query to fetch details of the parent with the corresponding teacher_id
        const contactQuery = "SELECT * FROM school_data.teacher_contact WHERE teacher_id = ?";
        const contactRows = await conn.query(contactQuery, values);

        // Combine teacher and parent details and send as JSON response
        const teacherData = {
            teacher: teacherRows[0],
            contact: contactRows[0] // Assuming one parent per teacher, adjust if needed
        };

        res.status(200).json(teacherData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) {
            conn.release(); // release connection back to the pool
        }
    }
});

app.delete('/teacher/:teacher_id', async (req, res) => {
    const teacherId = req.params.teacher_id;

    if (!teacherId) {
        return res.status(400).json({ error: "Teacher ID is required" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const query = "DELETE FROM school_data.teacher WHERE teacher_id = ?";
        const values = [teacherId];
        await conn.query(query, values);

        res.status(200).json({ message: "Teacher deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) {
            conn.release(); // release connection back to the pool
        }
    }
});
app.post('/teacher', async (req, res) => {
    const { teacher_name, subject, teacher_phone, teacher_mail } = req.body;

    if (!teacher_name || !subject || !teacher_phone || !teacher_mail) {
        return res.status(400).json({ error: "All fields are required" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction();

        const teacherQuery = "INSERT INTO school_data.teacher (teacher_name, subject) VALUES (?, ?)";
        const teacherValues = [teacher_name, subject];
        const teacherResult = await conn.query(teacherQuery, teacherValues);
        let teacherId = teacherResult.insertId;

        if (!teacherId || !teacher_phone || !teacher_mail) {
            return res.status(400).json({ error: "Teacher ID not found" });
        }
        const contactQuery = "INSERT INTO school_data.teacher_contact (teacher_phone, teacher_mail, teacher_id) VALUES (?, ?, ?)";
        const contactValues = [teacher_phone, teacher_mail, teacherId];
        await conn.query(contactQuery, contactValues);

        await conn.commit();

        teacherId=teacherId.toString();
        res.status(201).json({ message: "Teacher and contact details inserted successfully",teacherId:teacherId });
    } catch (error) {
        console.error(error);
        if (conn) {
            await conn.rollback();
        }
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) {
            conn.release();
        }
    }
});
app.get('/teacher_contact', async (req, res) => {

    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * from school_data.teacher_contact`);
        // console.log(rows);
        const jsonS = JSON.stringify(rows)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(jsonS);
    } catch (error) {
        console.log(error);
    }
})


//staff
app.get('/staff', async (req, res) => {

    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * from school_data.staff`);
        // console.log(rows);
        const jsonS = JSON.stringify(rows)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(jsonS);
    } catch (error) {
        console.log(error);
    }
})
app.get('/staff/:staff_id', async (req, res) => {
    const staffId = req.params.staff_id;

    if (!staffId) {
        return res.status(400).json({ error: "Staff ID is required" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        
        // Query to fetch details of the staff member with the given staff_id
        const staffQuery = "SELECT * FROM school_data.staff WHERE staff_id = ?";
        const values=[staffId.slice(1)];
        const staffRows = await conn.query(staffQuery, values);
        
        // Check if the staff member exists
        if (!staffRows) {
            return res.status(404).json({ error: "Staff member not found" });
        }

        // Query to fetch details of the staff member with the corresponding staff_id
        const contactQuery = "SELECT * FROM school_data.staff_contact WHERE staff_id = ?";
        const contactRows = await conn.query(contactQuery, values);

        // Combine staff and contact details and send as JSON response
        const staffData = {
            staff: staffRows[0],
            contact: contactRows[0] // Assuming one contact per staff member, adjust if needed
        };

        res.status(200).json(staffData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) {
            conn.release(); // release connection back to the pool
        }
    }
});
app.post('/staff', async (req, res) => {
    const { staff_name, position, phone } = req.body;


    if (!staff_name || !position || !phone) {
        return res.status(400).json({ error: "All fields are required" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction();


        const staffQuery = "INSERT INTO school_data.staff (staff_name, position) VALUES (?, ?)";
        const staffValues = [staff_name, position];
        const staffResult = await conn.query(staffQuery, staffValues);
        let staffId = staffResult.insertId;


        if (!staffId) {
            return res.status(400).json({ error: "Staff ID not found" });
        }
        const contactQuery = "INSERT INTO school_data.staff_contact (staff_id, phone) VALUES (?, ?)";
        const contactValues = [staffId, phone];
        await conn.query(contactQuery, contactValues);

        await conn.commit();

        staffId=staffId.toString();
        res.status(201).json({ message: "Staff and contact details inserted successfully",staffId:staffId });
    } catch (error) {
        console.error(error);

        if (conn) {
            await conn.rollback();
        }
        res.status(500).json({ error: "Internal server error" });
    } finally {

        if (conn) {
            conn.release();
        }
    }
});
app.get('/staff_contact', async (req, res) => {

    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * from school_data.staff_contact`);
        // console.log(rows);
        const jsonS = JSON.stringify(rows)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(jsonS);
    } catch (error) {
        console.log(error);
    }
})
app.delete('/staff/:staff_id', async (req, res) => {
    const staffId = req.params.staff_id;

    if (!staffId) {
        return res.status(400).json({ error: "staff ID is required" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const query = "DELETE FROM school_data.staff WHERE staff_id = ?";
        const values = [staffId];
        await conn.query(query, values);

        res.status(200).json({ message: "staff deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) {
            conn.release(); // release connection back to the pool
        }
    }
});


//parent
app.get('/parent', async (req, res) => {

    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * from school_data.parent`);
        // console.log(rows);
        const jsonS = JSON.stringify(rows)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(jsonS);
    } catch (error) {
        console.log(error);
    }
})


//progress
app.get('/progress', async (req, res) => {

    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * from school_data.progress`);
        // console.log(rows);
        const jsonS = JSON.stringify(rows)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(jsonS);
    } catch (error) {
        console.log(error);
    }
})
app.post('/progress', async (req, res) => {
    const { year_term, percentage, status, student_id } = req.body;

    if (!year_term || !percentage || !status || !student_id) {
        return res.status(400).json({ error: "Year term, percentage, status, and student ID are required" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const query = "INSERT INTO school_data.progress (year_term, percentage, status, student_id) VALUES (?, ?, ?, ?)";
        const values = [year_term, percentage, status, student_id];
        await conn.query(query, values);

        res.status(201).json({ message: "Progress record inserted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) {
            conn.release(); // release connection back to the pool
        }
    }
});


//daily aatendence
app.get('/daily_attendence', async (req, res) => {

    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * from school_data.daily_attendence`);
        // console.log(rows);
        const jsonS = JSON.stringify(rows)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(jsonS);
    } catch (error) {
        console.log(error);
    }
})
app.post('/daily_attendence', async (req, res) => {
    const { date, status, student_id } = req.body;

    if (!date || !status || !student_id) {
        return res.status(400).json({ error: "Date, status, and student ID are required" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const query = "INSERT INTO school_data.daily_attendence (date, status, student_id) VALUES (?, ?, ?)";
        const values = [date, status, student_id];
        await conn.query(query, values);

        res.status(201).json({ message: "Attendance record inserted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) {
            conn.release(); // release connection back to the pool
        }
    }
});


//attendence record
app.get('/attendence_record', async (req, res) => {

    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * from school_data.attendence_record`);
        // console.log(rows);
        const jsonS = JSON.stringify(rows)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(jsonS);
    } catch (error) {
        console.log(error);
    }
})


//grading
app.get('/grading', async (req, res) => {

    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * from school_data.grading`);
        // console.log(rows);
        const jsonS = JSON.stringify(rows)
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(jsonS);
    } catch (error) {
        console.log(error);
    }
})
app.post('/grading', async (req, res) => {
    const { grade_id, details, weight } = req.body;

    if (!grade_id || !details || !weight) {
        return res.status(400).json({ error: "Details and weight are required" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const query = "INSERT INTO school_data.grading (grade_id,details, weight) VALUES (?, ?, ?)";
        const values = [grade_id, details, weight];
        await conn.query(query, values);

        res.status(201).json({ message: "Grading record inserted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) {
            conn.release(); // release connection back to the pool
        }
    }
});
app.delete('/grading/:grade_id', async (req, res) => {
    const gradeId = req.params.grade_id;

    if (!gradeId) {
        return res.status(400).json({ error: "Grade ID is required" });
    }

    let conn;
    try {
        conn = await pool.getConnection();
        const query = "DELETE FROM school_data.grading WHERE grade_id = ?";
        const values = [gradeId.slice(1)];
        await conn.query(query, values);
        console.log(values);
        res.status(200).json({ message: "Grading entry deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        if (conn) {
            conn.release(); // release connection back to the pool
        }
    }
});



http.createServer(app).listen(1337, () => {
    console.log("server started at 1337");
})