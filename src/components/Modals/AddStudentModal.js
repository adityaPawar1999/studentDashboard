import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AddStudentModal = ({ isOpen, onClose }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'students'), formData);
      onClose();
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
        {/* Add other fields here */}
        <button type="submit">Add Student</button>
      </form>
    </div>
  ) : null;
};

export default AddStudentModal;
