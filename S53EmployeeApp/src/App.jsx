import { useEffect, useState } from "react";

const App = () => {

  // =========================
  // State Variables
  // =========================
  const [employees, setEmployees] = useState([]);
  const [empid, setEmpid] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [empActive, setEmpActive] = useState(false);

  const [searchId, setSearchId] = useState("");
  const [foundEmployee, setFoundEmployee] = useState(null);

  const [deleteId, setDeleteId] = useState("");

  // =========================
  // Fetch All Employees
  // =========================
  const fetchEmployees = () => {
    fetch("http://localhost:8081/emp/all")
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.log(error));
  };

  // =========================
  // Get Employee By ID (Fill Form)
  // =========================
  const getEmployeeById = () => {
    fetch(`http://localhost:8081/emp/${empid}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Employee not found");
        }
        return response.json();
      })
      .then(data => {
        setName(data.name);
        setSalary(data.salary);
        setEmpActive(data.empActive);
      })
      .catch(error => alert(error.message));
  };

  // =========================
  // Search Employee
  // =========================
  const searchEmployee = () => {
    fetch(`http://localhost:8081/emp/${searchId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Employee not found");
        }
        return response.json();
      })
      .then(data => {
        setFoundEmployee(data);
      })
      .catch(error => {
        alert(error.message);
        setFoundEmployee(null);
      });
  };

  // =========================
  // Save Employee
  // =========================
  const saveEmployee = () => {

    const employeeData = {
      empid: parseInt(empid),
      name: name,
      salary: parseFloat(salary),
      empActive: empActive
    };

    fetch("http://localhost:8081/emp/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(employeeData)
    })
      .then(response => response.text())
      .then(message => {
        alert(message);
        fetchEmployees();
        clearForm();
      })
      .catch(error => console.log(error));
  };

  // =========================
  // Delete Employee
  // =========================
  const deleteEmployee = () => {

    if (!deleteId) {
      alert("Please enter Employee ID");
      return;
    }

    fetch(`http://localhost:8081/emp/delete/${deleteId}`, {
      method: "DELETE"
    })
      .then(response => {

        if (response.status === 404) {
          throw new Error("Employee not found");
        }

        if (!response.ok) {
          throw new Error("Delete failed");
        }

        return response.text();
      })
      .then(() => {
        alert(`Employee with ID ${deleteId} deleted`);
        fetchEmployees();
        setDeleteId("");
      })
      .catch(error => alert(error.message));
  };

  // =========================
  // Clear Form
  // =========================
  const clearForm = () => {
    setEmpid("");
    setName("");
    setSalary("");
    setEmpActive(false);
  };

  // =========================
  // Load Data on Page Load
  // =========================
  useEffect(() => {
    fetchEmployees();
  }, []);

  // =========================
  // UI
  // =========================
  return (
    <div style={{ padding: "20px" }}>

      <h2>Enter Employee Data</h2>

      <input
        type="number"
        placeholder="Employee ID"
        value={empid}
        onChange={(e) => setEmpid(e.target.value)}
      />

      <button onClick={getEmployeeById}>Load</button>

      <br /><br />

      <input
        type="text"
        placeholder="Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Employee Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <br /><br />

      <label>
        Employee Active Status:
        <input
          type="checkbox"
          checked={empActive}
          onChange={(e) => setEmpActive(e.target.checked)}
        />
      </label>

      <br /><br />

      <button onClick={saveEmployee}>Save Employee</button>

      <br /><br /><br />

      <h2>Search Employee</h2>

      <input
        type="number"
        placeholder="Enter Employee ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />

      <button onClick={searchEmployee}>Search</button>

      {foundEmployee && (
        <div>
          <h3>Found Employee</h3>
          <p>Employee ID: {foundEmployee.empid}</p>
          <p>Employee Name: {foundEmployee.name}</p>
          <p>Employee Salary: {foundEmployee.salary}</p>
          <p>Status: {foundEmployee.empActive ? "Active" : "Inactive"}</p>
        </div>
      )}

      <br /><br />

      <h2>Delete Employee</h2>

      <input
        type="number"
        placeholder="Enter Employee ID"
        value={deleteId}
        onChange={(e) => setDeleteId(e.target.value)}
      />

      <button onClick={deleteEmployee}>Delete</button>

      <br /><br /><br />

      <h2>All Employees Data</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Employee Salary</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.empid}>
              <td>{emp.empid}</td>
              <td>{emp.name}</td>
              <td>{emp.salary}</td>
              <td>{emp.empActive ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>ss

      </table>

    </div>
  );
};

export default App;