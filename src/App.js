import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import EmployeeList from './Components/EmployeeList';
import AssetList from './Components/AssetList';
import AssetCategoryStats from './Components/AssetCategoryStats';
import Asset_issue from './Components/Asset_issue';
import Asset_return from './Components/Asset_return';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  return (
    <Router>
      <div className='AppDiv'>
        {/* Navigation Bar */}
        <nav className='navbar'>
          <ul>
            <li><Link to="/">Employee List</Link></li>
            <li><Link to="/AssetList">Asset List</Link></li>
            <li><Link to="/Asset_issue">Asset_issue</Link></li>
            <li><Link to="/Asset_return">Asset_return</Link></li>
          </ul> 
        </nav>

        {/* Main Content */}
        <div className="main-content">
          <Routes>
          
                <Route path="/" element={<EmployeeList />} />
                <Route path="/AssetList" element={<AssetList />} />
                <Route path="/Asset_issue" element={<Asset_issue />} />
                <Route path="/Asset_return" element={<Asset_return />} />
          </Routes>
        </div>

        {/* Footer */}
        <AssetCategoryStats />
      </div>
    </Router>
  );
};

export default App;
