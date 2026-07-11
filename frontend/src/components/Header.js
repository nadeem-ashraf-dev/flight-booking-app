import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <i className="fas fa-plane-departure"></i>
        <span>SkyWing</span>
        <span className="badge-2026">
          <i className="fas fa-calendar-check"></i> 2026 ready
        </span>
      </div>
      <div className="header-actions">
        <button><i className="fas fa-user-circle"></i> My trips</button>
        <button><i className="fas fa-bell"></i> Alerts</button>
        <button><i className="fas fa-globe"></i> EN</button>
      </div>
    </header>
  );
};

export default Header;