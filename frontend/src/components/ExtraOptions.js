import React, { useState } from 'react';

const ExtraOptions = () => {
  const [options, setOptions] = useState({
    wifi: false,
    carbonOffset: true,
    flexFare: false,
    extraBag: false,
    mealChoice: false,
    entertainment: false,
    lieFlat: false,
    petFriendly: false,
    direct: true
  });

  const toggleOption = (key) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const optionPills = [
    { key: 'wifi', icon: 'fa-wifi', label: 'Wi-Fi' },
    { key: 'carbonOffset', icon: 'fa-leaf', label: 'Carbon offset', color: 'green' },
    { key: 'flexFare', icon: 'fa-shield-alt', label: 'Flex fare', color: 'purple' },
    { key: 'extraBag', icon: 'fa-baggage', label: 'Extra bag', color: 'amber' },
    { key: 'mealChoice', icon: 'fa-utensils', label: 'Meal choice' },
    { key: 'entertainment', icon: 'fa-film', label: 'In-flight entertainment' },
    { key: 'lieFlat', icon: 'fa-bed', label: 'Lie-flat seat' },
    { key: 'petFriendly', icon: 'fa-paw', label: 'Pet friendly' },
  ];

  return (
    <div className="extra-options">
      <div className="option-pills">
        {optionPills.map(opt => (
          <span 
            key={opt.key} 
            className={`pill ${opt.color || ''}`}
            onClick={() => toggleOption(opt.key)}
          >
            <i className={`fas ${opt.icon}`}></i>
            {opt.label}
            {options[opt.key] && <i className="fas fa-check-circle" style={{ color: '#2563eb', marginLeft: '4px' }}></i>}
          </span>
        ))}
        <span className="pill" onClick={() => toggleOption('direct')}>
          <input type="checkbox" checked={options.direct} readOnly />
          Direct only
        </span>
      </div>
      <div style={{ display: 'flex', gap: '8px', fontSize: '0.9rem', color: '#2563eb', fontWeight: 500 }}>
        <i className="fas fa-sliders-h"></i> 12 filters
      </div>
    </div>
  );
};

export default ExtraOptions;