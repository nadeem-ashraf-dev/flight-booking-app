import React from 'react';

const StatsDashboard = () => {
  const stats = [
    { icon: 'fa-plane', label: 'Flights today', value: '186', trend: '+12%', trendUp: true },
    { icon: 'fa-user-check', label: 'Passengers', value: '2.4k', trend: '+8%', trendUp: true },
    { icon: 'fa-globe', label: 'Destinations 2026', value: '94', trend: '12 new', trendUp: true },
    { icon: 'fa-percent', label: 'Avg. discount', value: '18%', trend: 'early bird', trendUp: true },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-icon"><i className={`fas ${stat.icon}`}></i></div>
          <div className="stat-content">
            <h4>{stat.label}</h4>
            <div className="number">{stat.value}</div>
            <span className="trend">
              <i className={`fas ${stat.trendUp ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i> {stat.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsDashboard;