import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

const AssetList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    asset_id: null,
    serial_number: '',
    asset_category_id: '',
    make: '',
    model: '',
    is_active: false,
  });

  const fetchAssets = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/asset');
      setAssets(response.data);
    } catch (error) {
      console.error('Error fetching assets:', error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []); // Fetch assets on component mount

  const filteredAssets = assets.filter(asset =>
    asset.make.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOrUpdateAsset = async () => {
    try {
      if (formData.asset_id) {
        // Update existing asset
        await axios.put(`http://localhost:5000/api/asset/${formData.asset_id}`, formData);
      } else {
        // Add new asset
        await axios.post('http://localhost:5000/api/asset', formData);
      }
      // Refresh asset list after adding or updating
      fetchAssets();
      resetFormData();
    } catch (error) {
      console.error('Error adding/updating asset:', error);
    }
  };

  const handleDeleteAsset = async (assetId) => {
    try {
      await axios.delete(`http://localhost:5000/api/asset/${assetId}`);
      // Refresh asset list after deletion
      fetchAssets();
    } catch (error) {
      console.error('Error deleting asset:', error);
    }
  };

  const handleEditAsset = (asset) => {
    setFormData({ ...asset });
  };

  const resetFormData = () => {
    setFormData({
      asset_id: null,
      serial_number: '',
      asset_category_id: '',
      make: '',
      model: '',
      is_active: false,
    });
  };

  return (
    <div className="container">
      <h2 className="mt-4">Asset List</h2>
      <input
        type="text"
        placeholder="Search..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Make</th>
            <th>Model</th>
            <th>Category ID</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map((asset) => (
            <tr key={asset.asset_id}>
              <td>{asset.serial_number}</td>
              <td>{asset.make}</td>
              <td>{asset.model}</td>
              <td>{asset.asset_category_id}</td>
              <td>{asset.is_active ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleEditAsset(asset)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteAsset(asset.asset_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                placeholder="Serial Number"
                value={formData.serial_number}
                onChange={(e) =>
                  setFormData({ ...formData, serial_number: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Make"
                value={formData.make}
                onChange={(e) =>
                  setFormData({ ...formData, make: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Model"
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Category ID"
                value={formData.asset_category_id}
                onChange={(e) =>
                  setFormData({ ...formData, asset_category_id: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
              />
            </td>
            <td>
              <button onClick={handleAddOrUpdateAsset}>
                {formData.asset_id ? 'Update' : 'Add'}
              </button>
              {formData.asset_id && <button onClick={resetFormData}>Cancel</button>}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AssetList;
