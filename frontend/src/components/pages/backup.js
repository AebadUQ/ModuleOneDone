import { useState } from 'react';
import Table from 'react-bootstrap/Table'

const App = () => {

  const row1 = [];
  const [row, setRow] = useState();
  const [NewRow, setNewRow] = useState([]);

  const addRow = (e) => {
    
  }

  const increaseRow = (e) => {
    e.preventDefault();
    setRow(e.target.value)
      for(let i=1; i <= row; i++){
        row1[i] = i;
      }
      setNewRow([...NewRow, row1])
      console.log(row1)
  }

  return (
    <>
      <div>
        <form>
          <input type="text" onChange={addRow} />
        </form>

        <button onClick={increaseRow} > Add </button>

      </div>
      <div className="container">
        <Table striped bordered hover responsive variant="light">
          <thead>
            <tr>
              <th> <h6> Injection Speed </h6> </th>
              <th> <h6> Fill Time </h6> </th>
              <th> <h6> Peak Inj Press </h6> </th>
              <th> <h6> Viscocity </h6> </th>
              <th> <h6> Shear Rate </h6> </th>
              <th> <h6> AbsoluteDropViscocity </h6> </th>
              <th> <h6> %DropViscocity </h6> </th>
              <th> <h6> Action </h6> </th>
            </tr>
          </thead>
          <tbody className="grid_style">
            {NewRow.map((index, id) => {
              return (
                <tr key={id}>
                  <td> <input type='text' className="form-control" /> </td>
                  <td> <input type='text' className="form-control" /></td>
                  <td><input type='text' className="form-control" /> </td>
                  <td> <input type='text' className="form-control" /></td>
                  <td> <input type='text' className="form-control" /></td>
                  <td> <input type='text' className="form-control" /></td>
                  <td> <input type='text' className="form-control" /></td>
                  <td> <i className="fa fa-trash viscocity_icons"></i> </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default App;