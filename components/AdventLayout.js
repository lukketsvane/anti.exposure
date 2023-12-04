// components/AdventLayout.js
import React from 'react';
import LeaveAMessage from './LeaveAMessage'
const AdventLayout = ({ children }) => {
  return (
    <div>
      {children}
      <LeaveAMessage />
    </div>
  );
};

export default AdventLayout;
