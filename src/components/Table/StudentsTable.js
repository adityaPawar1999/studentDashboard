import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import StudentsTable from './StudentsTable';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const studentsCollection = collection(db, 'students');
    const studentSnapshot = await getDocs(studentsCollection);
    const studentList = studentSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(studentList);
  };

  const handleEdit = async (student) => {
    try {
      const studentDoc = doc(db, 'students', student.id);
      await updateDoc(studentDoc, student);  // Assuming `student` contains the updated data
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };
  
  

  const handleDelete = async (studentId) => {
    try {
      const studentDoc = doc(db, 'students', studentId);
      await deleteDoc(studentDoc);
      fetchStudents(); // Re-fetch students after deletion
    } catch (error) {
      console.error('Error deleting student:', error);
      // Optionally, you could show an error message to the user here
    }
  };
  
  const handleView = (student) => {
    // Logic for viewing student details
    console.log('Viewing student:', student);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Students List</h1>
      <StudentsTable
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    </div>
  );
};

export default StudentsPage;
