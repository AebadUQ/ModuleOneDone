import React, { useState, Component, useEffect } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MultiSelect } from "react-multi-select-component";
import Table from "react-bootstrap/Table";
import axios from "axios";
import "./Mymeet.css";

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
  const [bundle, setBundle] = useState([]);
  const [final, setFinal] = useState([]);
  const [work, setWork] = useState([]);
  const [workit, setWorkit] = useState([]);
  const [currresp,setCurrresp]=useState("")
  const [currautho,setCurrautho] =useState("")
  //useEffect to get emp and man 
  useEffect(async () => {
    const result = await axios("http://localhost:3001/getemp");
    const result2 = await axios("http://localhost:3001/getman");
    const x = result.data;
    const y = result2.data;
    const options = x.map((d) => ({
      label: d.emp_name,
      value: d.emp_id,
    }));
    const option2 = y.map((b) => ({
      label: b.man_name,
      value: b.man_id,
    }));
    setWork(options);
    setWorkit(option2);
  }, []);
  //Inserting funtion to insert data in database and in budle which is a state 
  const inserting = (e) => {
    if(subtitle !== "" ){    
    const arr = [];
    e.preventDefault();
    final.push(subtitle);
    final.push(status.label);
    final.push(assign);
    console.log(".......");
    // resp and autho are array which are filled using map and contain selected 
    //employes (whoa re assigned by task) and 
    let resp = [];
    let autho = [];
    assign.map((x) => {
      resp.push(x.label);
    });
    //strresp containg list of assigned employee in form of string
    let strresp = resp.toString();
    setCurrresp(strresp);
   

    manager.map((y) => {
      console.log(y.label);
      autho.push(y.label);
    });
     //strautho containg list of assigned manager in form of string
    let strautho = autho.toString();
    setCurrautho(strautho)

    final.push(manager);
    final.push(duedate);

    setSubtitle("");
    setStatus("");
    setAssign([]);
    setManager([]);
    setDuedate("");
    setCurrresp("")
    setCurrautho("")
  

    axios
      .post("http://localhost:3001/addmom", {
        subtitle: subtitle,
        status: status.value,
        duedate: duedate,
        resp: strresp,
        autho: strautho,
      })
      .then(() => {
        setBundle([
          ...bundle,
          {
            subtitle: subtitle,
            status: status.value,
            duedate: duedate,
            resp: strresp,
            autho: strautho,
          },
        ]);
      });
    }
    else{
      alert("Title field empty")
    }
  };


  const clearing=()=>{
    setSubtitle("")
    setStatus("");
    setAssign([])
    setManager([])
    setDuedate("")
  }
 
  // console.log  (work)
  // console.log(workit)

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
                  onClick={clearing}
                >
                  Clear
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <div style={{ marginTop: "10rem" }}></div>
        <Table striped bordered hover variant="grey">
          <thead>
            <tr>
              <th>Minutes of meeting</th>
              <th>Followup Needed</th>
              <th>Assigned To</th>
              <th>Manager</th>
              <th>Due Date</th>
             
            </tr>
          </thead>

          <tbody>
            {bundle.map((val, key) => {
           
              return (
                <>
                  <tr key={key}>
                    <td>{val.subtitle}</td>
                    <td>{val.status ? <p>yes</p> : <p>No</p>}</td>
                    <td>{val.resp}</td>
                    <td>{val.autho}</td>
                    <td>{val.duedate}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Mymeet;
