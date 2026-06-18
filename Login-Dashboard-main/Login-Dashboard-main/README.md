# 🧠 Full-Stack Dashboard + Todo App

A responsive **Dashboard application** with full authentication support, a powerful **Todo App**, visual summaries, and a clean user experience.

## 📸 Screenshots

### 🔹Login Page
![Login Screenshot](./Screenshots/Loginpg.png)

### 🔹New Account Page
![New Account Page](./Screenshots/NewAccountpg.png)

### 🔹 Dashboard Overview
![Dashboard Screenshot](./screenshots/Dashboard1.png)

### 🔹 Todo List with Progress Bar
![Todo Screenshot](./screenshots/Dashboard2.png)


## 🎯 Objective

To build a full-screen dashboard with:
- **User Authentication**
- **Summary Statistics**
- A complete **Todo App**
- Smooth UI and interactive featuresdo List** with progress tracking and filtering


## 🔐 Authentication Features

- ✅ **Login** with email & password  
- ✅ **Signup** for new users  
- ✅ **Password Recovery** via email  
- ✅ **Eye Toggle** for password visibility  
- ✅ Redirects to **Dashboard** after successful login  
- ✅ **Logout** button on dashboard top-right


## 📋 Dashboard Features

- 🎯 Welcome header and logout button
- 📊 **Summary Cards**:
  - Filings Pending
  - Awaiting Approval
  - Customers
  - Notifications
  *(Currently static, can be made dynamic later)*



- 📝 **Todo App** with:
  - Add, edit, delete tasks
  - Set **due date/time**
  - **Undo delete** popup
  - **Check off tasks** (mark as complete)
  - 🎯 **Progress bar** + visual number tracker
  - 🎉 **Confetti** blast when all tasks are done
  - Filter by: all, completed, pending, today
  - Search bar to filter tasks live


- 📜 **Scroll bar** on the right allows you to scroll the dashboard if content exceeds screen


## 🖼️ Layout & Navigation

- 📂 Sidebar on the left:
  - Dashboard  
  - Filings  
  - Customers  
  - Help  

- 🧭 Main area:
  - Summary cards
  - Recent filings section *(placeholder for now)*
  - Todo list section with task input, filtering, and progress


## 💻 Tech Stack

- React (frontend)
- Firebase Auth (authentication)
- LocalStorage (task persistence)
- Canvas-Confetti (task completion effect)
- Plain CSS for layout/styling
- React Icons for UI


## ✅ Thought Process

- Built mobile-responsive first.
- Kept UI minimal yet functional.
- Modular structure: components for summary, filings, todo.
- Easy to extend with backend for filings/customers.
