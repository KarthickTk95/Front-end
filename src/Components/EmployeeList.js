import React, { useState, useEffect } from "react";
import './Employee.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    is_active: true,
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch("http://localhost:5000/api/employees")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmployees(data);
      })
      .catch((err) => console.error("Error fetching employees", err));
  };

  const handleAddOrUpdateEmployee = () => {
    if (formData.id) {
      // If formData has an id, it means we're editing an existing employee
      updateEmployee(formData);
    } else {
      // If formData doesn't have an id, it means we're adding a new employee
      addEmployee(formData);
    }
  };

  const addEmployee = (employeeData) => {
    fetch("http://localhost:5000/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Employee added successfully:", data);
        fetchEmployees();
        resetFormData();
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };

  const updateEmployee = (employeeData) => {
    fetch(`http://localhost:5000/api/employees/${employeeData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Employee updated successfully:", data);
        fetchEmployees();
        resetFormData();
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  const handleEditEmployee = (employee) => {
    setFormData({ ...employee });
  };

  const handleDeleteEmployee = (employee_id) => {
    console.log("deleted id is" + employee_id);
    fetch(`http://localhost:5000/api/employees/${employee_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Employee deleted successfully");
        fetchEmployees();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  const resetFormData = () => {
    setFormData({
      id: null,
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      is_active: true,
    });
  };

  const [filteredEmployees, setFilteredEmployees] = useState([]); // Define filteredEmployees state
  const [searchTerm, setSearchTerm] = useState(""); // Define searchTerm state

  useEffect(() => {
    setFilteredEmployees(
      employees.filter(
        (employee) =>
          employee.first_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.phone_number.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, employees]);

  return (
    <div className="container" id="Employee">
      <h2 className="mt-4">Employee List</h2>
      <input
        type="text"
        placeholder="Search..."
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table table-striped table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th className="Actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone_number}</td>
              <td>{employee.is_active ? "Active" : "Inactive"}</td>
              <td>
                <button className="btn btn-primary mr-2" onClick={() => handleEditEmployee(employee)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteEmployee(employee.employee_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                placeholder="First Name"
                className="form-control"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Last Name"
                className="form-control"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Email"
                className="form-control"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="text"
                placeholder="Phone Number"
                className="form-control"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
              />
            </td>
            <td>
              <input
                type="checkbox"
                className="form-check-input"
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
              />
            </td>
            <td>
              <button className="btn btn-success mr-2" onClick={handleAddOrUpdateEmployee}>
                {formData.id ? "Update" : "Add"}
              </button>
              {formData.id && <button className="btn btn-secondary" onClick={resetFormData}>Cancel</button>}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};  

export default EmployeeList;
