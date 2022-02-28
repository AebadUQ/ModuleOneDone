import React, { useState, Component,useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MultiSelect } from "react-multi-select-component";
import "./Mymeet.css";
import Table from "react-bootstrap/Table";
import axios from 'axios';
import { alignPropType } from "react-bootstrap/esm/types";
// https://github.com/JedWatson/react-select
const statusOpt = [
  { value: true, label: "yes" },
  { value: false, label: "no" },
];
const AssignOpt = [
  { label: "Aebad ul quadir", value: "Aebad" },
  { label: "Muhammad Yousuf", value: "yousuf" },
  { label: "Muhamamd daniyal", value: "daniyal" },
  { label: "Abdullah Raheel", value: "abdullah" },
];
const ManagerOpt = [
  { label: "Riaz Haider", value: "riaz" },
  { label: "Aftab Anwer", value: "Aftab" },
  { label: "Shakir", value: "Shakir" },
  { label: "Munawar", value: "Munawar" },
];
const Mymeet = () => {

  const [subtitle, setSubtitle] = useState("");
  const [status, setStatus] = useState(false);
  const [duedate, setDuedate] = useState("");
  const [assign, setAssign] = useState([]);
  const [manager, setManager] = useState([]);
  const [bundle,setBundle] = useState([])
  const [final, setFinal] = useState([]);
  
 
 const [work,setWork]=useState([])

 const [workit,setWorkit]=useState([])
 useEffect(async () => {
  const result = await axios(
    'http://localhost:3001/getemp',
  );
  const result2 = await axios(
    'http://localhost:3001/getman',
  );
  const x = result.data
  const y = result2.data
  const options = x.map(d => ({
    "label" : d.emp_name,
    "value" : d.emp_id
  }))
  const option2 = y.map(b=>({
    "label" : b.man_name,
    "value" : b.man_id
  }))
  setWork(options)
  setWorkit(option2)
   
  
},[]);
  const inserting=(e)=>{
    const arr = [];
    e.preventDefault()
    final.push(subtitle);
    final.push(status.label);
    final.push(assign);
    assign.map((x)=>{
     console.log(x.label)
    })
    final.push(manager);
    final.push(duedate);
    console.log(final);
    setSubtitle("")
    setStatus("")
    setAssign([])
    setManager([])
    setDuedate("")
    {work.map((x)=>{
    
        
        arr.push(x.label)
        console.log(arr)
      
        
    })}
    
   
    console.log("mom inserting ")
    axios.post('http://localhost:3001/addmom',{
      subtitle:subtitle,
      status:status.value,
      duedate:duedate,
    }).then(()=>{
      console.log("han han ")
      setBundle([
        ...bundle,{
          subtitle:subtitle,
          status:status.value,
          duedate:duedate,
        }
      ])
    })
    
  }
 
const displaying=()=>{
  axios.get("http://localhost:3001/getmom").then((response)=>{
    console.log(response)
    setBundle(response.data)
  })
}


console.log(work)
console.log(workit)

  return (
    <>
      <div className="bar">
        <div className="logo">
          <img
            src="https://icon-library.com/images/icon-meeting/icon-meeting-2.jpg"
            alt="LOGO"
            width={"40rem"}
          />
        </div>
        <div className="title_and_dec">
          <p>
            <span
              style={{ color: "#0e7a57", fontWeight: "bold", fontSize: "16px" }}
            >
              Meet Title
            </span>
            <br />
            <span style={{ fontSize: "small" }}>decription</span>
          </p>
        </div>
      </div>
      <div className="bar2">
        <h3>Minutes Of Meeting</h3>
      </div>
    
      <div style={{ padding: "1%" }}>
        <Table striped bordered hover variant="grey">
          <thead>
            <tr>
              <th>Minutes of meeting</th>
              <th>Followup Needed</th>
              <th>Assigned To</th>
              <th>Manager</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Control
                value={subtitle}
                  type="text"
                  placeholder="Enter Minutes of meeting  Title"
                  name="subtitle"
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </td>
              <td>
                <Select
                  value={status}
                  onChange={setStatus}
                  options={statusOpt}
                />
              </td>
              <td>
                <MultiSelect
                  options={work}
                  value={assign}
                  onChange={setAssign}
                  labelledBy="Select"
                  disabled={!status.value}
                />
              </td>
              <td>
                <MultiSelect
                  options={workit}
                  value={manager}
                  onChange={setManager}
                  labelledBy="Select"
                  disabled={!status.value}
                />
              </td>
              <td>
                <Form.Control
                value={duedate}
                  type="date"
                  name="duedate"
                  onChange={(e) => setDuedate(e.target.value)}
                  disabled={!status.value}
                />
              </td>
              <td>
                <Button
                  style={{
                    background: "#0e7a57",
                    borderRadius: "5",
                    border: "0",
                    marginLeft: "1px",
                  }}
                  onClick={inserting}
                >
                  Save
                </Button>

                <Button
                  style={{
                    background: "#c21d2e",
                    borderRadius: "5",
                    border: "0",
                    marginLeft: "3px",
                  }}
                  onClick={displaying}
                >
                  Exit
                </Button>
              </td>
            </tr>
          </tbody>
         
        </Table>
        <div style={{marginTop:'10rem'}}>

        </div>
        <Table striped bordered hover variant="grey" >
        <thead>
            <tr>
              <th>Minutes of meeting</th>
              <th>Followup Needed</th>
              <th>Assigned To</th>
              <th>Manager</th>
              <th>Due Date</th>
              <th>Modify</th>
            </tr>
           
          </thead>

          <tbody>
            
              {bundle.map((val,key)=>{
                console.log("//////")
                console.log(val)
                return(
                  <>
                  <tr>
                    <td>{val.subtitle}</td>
                    <td>{val.status?<p>yes</p>:<p>No</p>}</td>
                    <td></td>
                    <td></td>
                    <td>{val.duedate}</td>
                    <td>edit button</td>
                  </tr>
                  
                  </>
                )
              })}
           
              
          </tbody>
        </Table>
        
      </div>
    </>
  );
};

export default Mymeet;
