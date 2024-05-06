// frontend/src/App.js
import React from 'react';
import ActivityForm from './ActivityForm';
import ActivityTable from './ActivityTable';
 import './App.css'
const App = () => {
  return (
    <div>
      <h1>Activity Tracker</h1>
      <ActivityForm />
      <ActivityTable />
    </div>
  );
};

export default App;
