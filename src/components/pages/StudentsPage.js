import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import Sidebar from '../Sidebar/Sidebar';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    guardianName: '',
    guardianContact: '',
    admissionDate: '',
    remarks: '',
  });

  // Fetch students from Firestore
  const fetchStudents = async () => {
    const studentsCollection = collection(db, 'students');
    const studentSnapshot = await getDocs(studentsCollection);
    const studentList = studentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(studentList);
  };

  // Add or Update Student
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update student
      const studentDoc = doc(db, 'students', formData.id);
      await updateDoc(studentDoc, formData);
    } else {
      // Add student
      await addDoc(collection(db, 'students'), formData);
    }
    setModalOpen(false);
    fetchStudents();
  };

  // Delete Student
  const handleDelete = async (id) => {
    const studentDoc = doc(db, 'students', id);
    await deleteDoc(studentDoc);
    fetchStudents();
  };

  // Open modal for editing or adding
  const openModal = (student = null) => {
    if (student) {
      setFormData(student);
    } else {
      setFormData({
        id: '',
        name: '',
        class: '',
        section: '',
        rollNumber: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        guardianName: '',
        guardianContact: '',
        admissionDate: '',
        remarks: '',
      });
    }
    setModalOpen(true);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="students-page">
      <Sidebar />
      <div className="content">
        <h1>Students List</h1>
        <button className="add-student-btn" onClick={() => openModal()}>Add Student</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Class</th>
              <th>Section</th>
              <th>Roll Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
                <td>{student.section}</td>
                <td>{student.rollNumber}</td>
                <td>
                  <button onClick={() => openModal(student)}>Edit</button>
                  <button onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>{formData.id ? 'Edit Student' : 'Add Student'}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Class"
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Section"
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Roll Number"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Guardian Name"
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Guardian Contact"
                  value={formData.guardianContact}
                  onChange={(e) => setFormData({ ...formData, guardianContact: e.target.value })}
                />
                <input
                  type="date"
                  placeholder="Admission Date"
                  value={formData.admissionDate}
                  onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Remarks"
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
