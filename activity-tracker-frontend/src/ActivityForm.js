// frontend/src/components/ActivityForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './ActivityForm.css'; 

const ActivityForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3005/', { name, date }); 
      setName('');
      setDate('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Activity Name"
        value={name}
        className= "form-container"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        value={date}
        className="form-container"
        onChange={(e) => setDate(e.target.value)}
      />
      <button type="submit" className='form-container'>Add Activity</button>
    </form>
  );
};

export default ActivityForm;
