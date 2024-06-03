import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [name,setName] = useState("");
  const [salary, setSalary] = useState("");
  const [department, setDepartment] = useState("");
  const [formData, setFormData] = useState([]);
  const [handleData, setHandleData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:6500/employees');
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    const newData = {name, salary, department };
    try {
      const response = await axios.post('http://localhost:6500/data', newData);
      console.log(response.data);
      setHandleData(response.data);
      setFormData([...formData, response.data]);
      setName("");
      setSalary("");
      setDepartment("");
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleForm}>
        <span>Username</span>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <span>Salary</span>
        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
        <br />
        <span>Department</span>
        <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
        <br />
        <button type='submit'>Submit</button>
      </form>
      {handleData && (
        <table style={{width: "60%", margin: "100px" }}>
          <thead>
            <tr>
              <th style={{ border: "5px solid black" }}>UserName</th>
              <th style={{ border: "5px solid black" }}>Salary</th>
              <th style={{ border: "5px solid black" }}>Department</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((el, index) => ( el &&(
              <tr key={index}>
              <td style={{ border: "5px solid red" }}>{el.name}</td>
              <td style={{ border: "5px solid red" }}>{el.salary}</td>
              <td style={{ border: "5px solid red" }}>{el.department}</td>
            </tr>
            )

            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
