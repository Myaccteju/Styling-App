import React from 'react';
import './Dashboard.css';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseauth';
import TodoApp from '../components/TodoApp';
import SummaryCard from '../components/SummaryCard';
import RecentFilings from '../components/RecentFilings';
import { FiClock, FiFileText, FiUsers, FiBell } from 'react-icons/fi';

const Dashboard = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => window.location.href = '/login')
      .catch(console.error);
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>MyApp</h2>
        <nav>
          <a href="#">Dashboard</a>
          <a href="#">Filings</a>
          <a href="#">Customers</a>
          <a href="#">Help</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1>Welcome to Dashboard</h1>
            <p>This is your to‑do list</p>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <section className="dashboard-body">
          <div className="summary-grid">
            <SummaryCard title="Filings Pending" count={3} icon={<FiClock />} />
            <SummaryCard title="Awaiting Approval" count={4} icon={<FiFileText />} />
            <SummaryCard title="Customers" count={12} icon={<FiUsers />} />
            <SummaryCard title="Notifications" count={2} icon={<FiBell />} />
          </div>

          <RecentFilings />
          <TodoApp />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
