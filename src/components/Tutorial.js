import React, { useState } from 'react';

const Tutorial = () => {
  const [code, setCode] = useState('');

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const runCode = () => {
    // Connect to AI API or logic for running code
    console.log('Code:', code);
  };

  return (
    <div>
      <textarea 
        value={code} 
        onChange={handleChange} 
        placeholder="Write your code here..." 
        rows="8" 
        cols="50"
      />
      <br />
      <button onClick={runCode} className="run-button">Run Code</button>
    </div>
  );
};

export default Tutorial;
