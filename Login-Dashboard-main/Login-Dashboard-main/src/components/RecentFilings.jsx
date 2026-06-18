import React from 'react';

const filings = [
  { id: 'F001', customer: 'ABC Ltd', status: 'Pending', date: '2025-06-19' },
  { id: 'F002', customer: 'XYZ Co', status: 'Approved', date: '2025-06-18' },
  { id: 'F003', customer: 'ACME Inc', status: 'In Review', date: '2025-06-17' },
];

const RecentFilings = () => (
  <div className="recent-filings">
    <h2>Recent Filings</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {filings.map(f => (
          <tr key={f.id}>
            <td>{f.id}</td>
            <td>{f.customer}</td>
            <td>
              <span className={`status ${f.status.replace(/\s+/g, '').toLowerCase()}`}>
                {f.status}
              </span>
            </td>
            <td>{f.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RecentFilings;
