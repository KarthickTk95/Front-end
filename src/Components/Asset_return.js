import React, { useState, useEffect } from 'react';
import './Asset_return.css';

const Asset_return = () => {
  const [assetReturns, setAssetReturns] = useState([]);
  const [formData, setFormData] = useState({
    return_id:'',
    issue_id: '',
    return_date: '',
    return_reason: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAssetReturns();
  }, []);

  const fetchAssetReturns = () => {
    fetch('http://localhost:5000/api/assetReturn')
      .then(response => response.json())
      .then(data => setAssetReturns(data))
      .catch(error => console.error('Error fetching asset returns', error));
  };

  const handleAddOrUpdateReturn = () => {
    if (formData.issue_id) {
      // Update return
      fetch(`http://localhost:5000/api/assetReturn/${formData.issue_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(updatedReturn => {
          const updatedReturns = assetReturns.map(assetReturn =>
            assetReturn.issue_id === updatedReturn.issue_id ? updatedReturn : assetReturn
          );
          setAssetReturns(updatedReturns);
          setFormData({
            return_id:'',
            issue_id: '',
            return_date: '',
            return_reason: ''
          });
        })
        .catch(error => console.error('Error updating asset return', error));
    } else {
      // Add new return
      fetch('http://localhost:5000/api/assetReturn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(insertedReturn => {
          setAssetReturns([...assetReturns, insertedReturn]);
          setFormData({
            return_id:'',
            issue_id: '',
            return_date: '',
            return_reason: ''
          });
        })
        .catch(error => console.error('Error creating asset return', error));
    }
  };

  const handleDeleteReturn = issue_id => {
    fetch(`http://localhost:5000/api/assetReturn/${issue_id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(deletedReturn => {
        const updatedReturns = assetReturns.filter(assetReturn => assetReturn.issue_id !== deletedReturn.issue_id);
        setAssetReturns(updatedReturns);
      })
      .catch(error => console.error('Error deleting asset return', error));
  };

  const filteredReturns = assetReturns.filter(issue =>
    (typeof issue.return_id === 'string' && issue.return_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (typeof issue.issue_id === 'string' && issue.issue_id.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (typeof issue.return_date === 'string' && issue.return_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (typeof issue.return_reason === 'string' && issue.return_reason.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  

  return (
    <div className="container" id='AssetReturn'>
      <h2 className="mt-4">ASSET RETURNS </h2>
      <input
        type="text"
        placeholder="Search..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Return ID</th>
            <th>Issue ID</th>
            <th>Return Date</th>
            <th>Return Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReturns.map(assetReturn => (
            <tr key={assetReturn.issue_id}>
              <td>{assetReturn.return_id}</td>
              <td>{assetReturn.issue_id}</td>
              <td>{assetReturn.return_date}</td>
              <td>{assetReturn.return_reason}</td>
              <td>
                <button
                  onClick={() => setFormData(assetReturn)}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteReturn(assetReturn.issue_id)}
                  className="btn btn-danger btn-sm ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td> <input
                type="text"
                className="form-control"
                placeholder="return ID"
                value={formData.return_id}
                onChange={e => setFormData({ ...formData, return_id: e.target.value })}
              /></td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Issue ID"
                value={formData.issue_id}
                onChange={e => setFormData({ ...formData, issue_id: e.target.value })}
              />
            </td>
            <td>
              <input
                type="date"
                className="form-control"
                placeholder="Return Date"
                value={formData.return_date}
                onChange={e => setFormData({ ...formData, return_date: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                placeholder="Return Reason"
                value={formData.return_reason}
                onChange={e => setFormData({ ...formData, return_reason: e.target.value })}
              />
            </td>
            <td>
              <button className="btn btn-primary" onClick={handleAddOrUpdateReturn}>
                {formData.issue_id ? 'Update' : 'Add'} Return
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Asset_return;
