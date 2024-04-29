import React, { useState, useEffect } from 'react';

const Asset_issue = () => {
  const [assetIssues, setAssetIssues] = useState([]);
  const [formData, setFormData] = useState({
    asset_id: '',
    employee_id: '',
    issue_date: '',
    returned: false,
    return_date: '',
    return_reason: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/assetIssues')
      .then(response => response.json())
      .then(data => setAssetIssues(data))
      .catch(error => console.error('Error fetching asset issues', error));
  }, []);

  const handleAddOrUpdateIssue = () => {
    if (formData.issue_id) {
      // Update issue
      fetch(`http://localhost:5000/api/assetIssues/${formData.issue_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(updatedIssue => {
          const updatedIssues = assetIssues.map(issue =>
            issue.issue_id === updatedIssue.issue_id ? updatedIssue : issue
          );
          setAssetIssues(updatedIssues);
          setFormData({
            asset_id: '',
            employee_id: '',
            issue_date: '',
            returned: false,
            return_date: '',
            return_reason: ''
          });
        })
        .catch(error => console.error('Error updating asset issue', error));
    } else {
      // Add new issue
      fetch('http://localhost:5000/api/assetIssues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(insertedIssue => {
          setAssetIssues([...assetIssues, insertedIssue]);
          setFormData({
            asset_id: '',
            employee_id: '',
            issue_date: '',
            returned: false,
            return_date: '',
            return_reason: ''
          });
        })
        .catch(error => console.error('Error creating asset issue', error));
    }
  };

  const handleDeleteIssue = asset_id => {
    fetch(`http://localhost:5000/api/assetIssues/${asset_id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(deletedIssue => {
        const updatedIssues = assetIssues.filter(
          issue => issue.asset_id !== deletedIssue.asset_id
        );
        setAssetIssues(updatedIssues);
      })
      .catch(error => console.error('Error deleting asset issue', error));
  };


  return (
    <div className="container">
      <h2 className="mt-4">Asset Issues</h2>
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
            <th>Asset ID</th>
            <th>Employee ID</th>
            <th>Issue Date</th>
            <th>Returned</th>
            <th>Return Date</th>
            <th>Return Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assetIssues.map(issue => (
            <tr key={issue.issue_id}>
              <td>{issue.asset_id}</td>
              <td>{issue.employee_id}</td>
              <td>{issue.issue_date}</td>
              <td>{issue.returned ? 'Yes' : 'No'}</td>
              <td>{issue.return_date}</td>
              <td>{issue.return_reason}</td>
              <td>
                <button
                  onClick={() => setFormData(issue)}
                  className="btn btn-primary btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteIssue(issue.issue_id)}
                  className="btn btn-danger btn-sm ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                className="form-control"
                value={formData.asset_id}
                onChange={e =>
                  setFormData({ ...formData, asset_id: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={formData.employee_id}
                onChange={e =>
                  setFormData({ ...formData, employee_id: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={formData.issue_date}
                onChange={e =>
                  setFormData({ ...formData, issue_date: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="checkbox"
                className="form-check-input"
                checked={formData.returned}
                onChange={e =>
                  setFormData({ ...formData, returned: e.target.checked })
                }
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={formData.return_date}
                onChange={e =>
                  setFormData({ ...formData, return_date: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                className="form-control"
                value={formData.return_reason}
                onChange={e =>
                  setFormData({ ...formData, return_reason: e.target.value })
                }
              />
            </td>
            <td>
              <button type="submit" className="btn btn-primary" onClick={handleAddOrUpdateIssue}>
                {formData.issue_id ? 'Update' : 'Add'} Issue
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={() =>
                  setFormData({
                    asset_id: '',
                    employee_id: '',
                    issue_date: '',
                    returned: false,
                    return_date: '',
                    return_reason: ''
                  })
                }
              >
                Clear
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Asset_issue;
