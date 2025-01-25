# React Student Management System  

A React-based web application with Firebase integration for authentication and Firestore database for data storage. The application consists of two pages: a login page and a student management page. The project is designed to provide seamless functionality with an elegant UI, built using the [Material Kit React Template](https://github.com/minimal-ui-kit/material-kit-react).  

---

## Features  

### Login Page  
- Simple and user-friendly login interface.  
- Firebase Authentication with pre-configured credentials:  
  - **Username**: `admin@123.com`  
  - **Password**: `admin@123`  

### Students Page  
- **Students Table**:  
  - Displays a list of students with columns: ID, Name, Class, Section, Roll Number, and Actions.  
  - **Action Column**: Includes "View," "Edit," and "Delete" icons for each student.  
- **Add Student**:  
  - Button to open a modal with a student information form.  
  - Form includes **12 fields** (e.g., Name, Age, Class, Section, Email, Contact, etc.).  
  - Submitted data is stored in **Firestore Database**.  

### Sidebar Navigation  
- **Students Page**: Navigates to the students page.  
- **Logout**: Logs out the user and redirects to the login page.  

### Deployment  
- Hosted on a cloud platform for easy access (e.g., Firebase Hosting, Netlify, or Vercel).  

---

## Tech Stack  

### Frontend  
- **React.js**: For building the user interface.  
- **Material Kit React**: For elegant and responsive design.  
- **React Router**: For managing page navigation.  

### Backend  
- **Firebase Authentication**: For secure login.  
- **Firestore Database**: For storing student data.  

---

## Installation  

### Prerequisites  
Ensure you have the following installed:  
- Node.js (v16 or higher)  
- npm or yarn  

### Steps  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-username/react-student-management.git  
