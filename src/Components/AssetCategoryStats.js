import React, { useState, useEffect } from 'react';
import './AssetCategoryStats.css';


function AssetCategoryStats() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('http://localhost:5000/api/assetCategoryStats');
        if (!response.ok) {
          throw new Error('Failed to fetch asset category stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching asset category stats:', error);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="container footer"> {/* Bootstrap container class */}
      <h2>Asset Category Statistics</h2>
        <table> {/* Bootstrap table classes */}
          <thead>
            <tr>
              <th>category_id</th>
              <th>Category Name</th>
              <th>Total Assets</th>
              <th>Active Assets</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => (
              <tr key={index}>
                <td>{stat.category_id}</td>
                <td>{stat.category_name}</td>
                <td>{stat.total_assets}</td>
                <td>{stat.active_assets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default AssetCategoryStats;
