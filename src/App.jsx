import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [employees, setEmployees] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [employeesToRender, setEmployeesToRender] = useState([]);
  const maxRecords = 10; 


  const handlePrev = () => {
    if(currPage > 1){
      setCurrPage(currPage - 1);
    }
  }

  const handleNext = () => {
    if(currPage < totalPages){
      setCurrPage(currPage + 1);
    }
  }

  useEffect(() => {
   const fetchEmployees = async () => {
    try {
      const res = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      setEmployees(res.data);

    } catch (error) {
      alert("failed to fetch data");
      console.log("Error::", error);
    }
   }

   fetchEmployees();
  }, [])


  useEffect(() => {
    const start = (currPage * maxRecords) - maxRecords;
    const end = Math.min(currPage * maxRecords, employees.length);

    setEmployeesToRender([...employees.slice(start, end)]);
    setTotalPages(Math.ceil(employees.length / maxRecords));
  }, [employees, currPage])
  

  return (
    <div className='container'>
      <h1>Employee Data Table</h1>
      <table className='empTable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employeesToRender.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='actions'>
        <button onClick={handlePrev}>Previous</button>
        <p>{currPage}</p>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  )
}

export default App
