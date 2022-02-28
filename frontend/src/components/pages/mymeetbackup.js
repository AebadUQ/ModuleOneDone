import React, { useState, Component } from "react";

import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./Mymeet.css";
import Table from "react-bootstrap/Table";
const Mymeet = () => {

  const row1 = [];
  const [row, setRow] = useState();
  const [NewRow, setNewRow] = useState([]);

  const addRow = (e) => {
    e.preventDefault();
    setRow(e.target.value)
  }

  const increaseRow = () => {
      for(let i=1; i <= row; i++){
        row1[i] = i;
      }
      setNewRow([...NewRow, row1])
      console.log(row1)
  }


  
  //status mai followup wala option arhaa hai
  const [status, setStatus] = useState(false);
  
  
  const [man, setMan] = useState([]);
  const [asg,setAsg]=useState([]);

  const [sub, setSub] = useState({
    subtitle: "",
    followup: [
      { label: "yes", value: true },
      { label: "no", value: false },
    ],
    manager: [
      { label: "Riaz Haider", value: "riaz" },
      { label: "Aftab Anwer", value: "Aftab" },
      { label: "Shakir", value: "Shakir" },
      { label: "Munawar", value: "Munawar" },
    ],
    assign :[
      { label: "Aebad ul quadir", value: "Aebad" },
      { label: "Muhammad Yousuf", value: "yousuf" },
      { label: "Muhamamd daniyal", value: "daniyal"},
      { label: "Abdullah Raheel", value: "abdullah"},
    ],
    due: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value)
    setSub({
      ...sub,
      [name]: value,
    });
  };
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
              <th>#</th>
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
              <td>1</td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter Minutes of meeting  Title"
                  name="subtitle"
                  value={sub.subtitle}
                  onChange={handleChange}
                />
              </td>
              <td>
                <Select
                  options={sub.followup}
                  value={status}
                  onChange={setStatus}
                  disabled={!status.value }
                />
              </td>

              <td>
              <MultiSelect
                  options={sub.assign}
                  value={asg}
                  onChange={setAsg}
                  labelledBy="Select"
                  disabled={!status.value }
                />
              </td>
              <td>
                <MultiSelect
                  options={sub.manager}
                  value={man}
                  onChange={setMan}
                  labelledBy="Select"
                  disabled={!status.value }
                />
              </td>
              <td>
                <Form.Control
                  type="date"
                  name="Mdate"
                  value={sub.due}
                  onChange={handleChange}
                  disabled={!status.value }
                />
              </td>
              <td>
                <div>
                  <Button
                    style={{
                      background: "#0e7a57",
                      borderRadius: "5",
                      border: "0",
                      marginLeft: "1px",
                    }}
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
                  >
                    Exit
                  </Button>
                </div>
              </td>
            </tr>

            <tr>
              <td>1</td>
              <td>Otto</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Otto</td>
              <td>
                <div>
                  <Button
                    style={{
                      background: "#0e7a57",
                      borderRadius: "5",
                      border: "0",
                      marginLeft: "1px",
                    }}
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
                  >
                    Exit
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Mymeet;
