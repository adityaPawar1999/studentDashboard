import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';

const AddStudentModal = ({ isOpen, onClose, studentToEdit }) => {
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

  // Pre-fill the form if a student is being edited
  useEffect(() => {
    if (studentToEdit) {
      setFormData(studentToEdit);
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Update existing student
        const studentDoc = doc(db, 'students', formData.id);
        await updateDoc(studentDoc, formData);
      } else {
        // Add new student
        await addDoc(collection(db, 'students'), formData);
      }
      onClose(); // Close the modal after submitting
    } catch (err) {
      console.error(err);
    }
  };

  return isOpen ? (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="class"
          placeholder="Class"
          value={formData.class}
          onChange={handleChange}
        />
        <input
          type="text"
          name="section"
          placeholder="Section"
          value={formData.section}
          onChange={handleChange}
        />
        <input
          type="text"
          name="rollNumber"
          placeholder="Roll Number"
          value={formData.rollNumber}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
        <input
          type="text"
          name="guardianName"
          placeholder="Guardian Name"
          value={formData.guardianName}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="guardianContact"
          placeholder="Guardian Contact"
          value={formData.guardianContact}
          onChange={handleChange}
        />
        <input
          type="date"
          name="admissionDate"
          value={formData.admissionDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
        />
        <button type="submit">{formData.id ? 'Update Student' : 'Add Student'}</button>
      </form>
    </div>
  ) : null;
};

export default AddStudentModal;
