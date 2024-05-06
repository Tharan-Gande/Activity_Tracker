import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ActivityTable.css';
import moment from 'moment';


const ActivityTable = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:3005/');
       console.log(response.data); setActivities(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const handleActionChange = async (activityId, action) => {
    if (!action) return; // If no action is selected, do nothing
    
    try {
      const response = await axios.patch(
        `http://localhost:3005/${activityId}`,
        { status: action } // The updated status
      );
      
      const updatedActivity = response.data;
      
      // Update the activities state to reflect the status change
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity._id === updatedActivity._id ? updatedActivity : activity
        )
      );
    } catch (error) {
      console.error('Error updating activity status:', error);
    }
  };

  return (
    <div className="activity-table-container">
      <h1 className="activity-table-title">Activity List</h1>
      <table className="activity-table">
        <thead>
          <tr className="activity-table-header-row">
            <th>Activity</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.name}</td>
              <td>{moment(activity.date).format('YYYY-MM-DD')}</td>
              <td>
                <span
                  className={`status-span ${activity.status.replace(' ', '-').toLowerCase()}`}
                >
                  {activity.status}
                </span>
              </td>
              <td>
                {activity.status === 'complete' || activity.status === 'cancel' ? (
                  ''
                ) : (
                  <select
                    className="activity-table-action-dropdown"
                    onChange={(e) => handleActionChange(activity._id, e.target.value)}
                  >
                    <option value="">Choose One</option>
                    <option value="complete">Complete</option>
                    <option value="cancel">Cancel</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;


