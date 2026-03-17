import { useEffect, useState } from "react";
import API from "../api";

import "./Student.css";

function StudentList() {
  const name = 
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);

    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.course) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await API.put(`/students/${editId}`, form);
        setEditId(null);
      } else {
        await API.post("/students", form);
      }

      setForm({ name: "", email: "", course: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      course: student.course
    });
    setEditId(student._id);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="container">
      <h2>Student Management System</h2>

      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="course"
          placeholder="Enter Course"
          value={form.course}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          {editId ? "Update Student" : "Add Student"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="edit"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No Students Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;