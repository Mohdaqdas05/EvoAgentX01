import React from 'react';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
      <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-6 rounded-full"></div>
    </div>
  );
};

export default SectionTitle;
