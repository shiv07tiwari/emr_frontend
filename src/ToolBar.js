import React from 'react';
import { Link } from 'react-router-dom';
import './ToolBar.css';

const ToolBar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-content">
        <div className="spacer"></div>
        <Link to="/about-us">About Us</Link>
      </div>
    </div>
  );
};

export default ToolBar;
