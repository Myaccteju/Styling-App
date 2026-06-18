import React from 'react';

const SummaryCard = ({ title, count, icon }) => (
  <div className="summary-card">
    <div className="icon">{icon}</div>
    <div>
      <h3>{title}</h3>
      <p>{count}</p>
    </div>
  </div>
);

export default SummaryCard;
