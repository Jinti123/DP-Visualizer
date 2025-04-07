import React from 'react';

export default function Explanation({ text, result }) {
  return (
    <div className="explanation-container">
      <h3>Explanation</h3>
      <div className="explanation-content">
        <p>{text}</p>
        {result && <div className="result">{result}</div>}
      </div>
    </div>
  );
}
