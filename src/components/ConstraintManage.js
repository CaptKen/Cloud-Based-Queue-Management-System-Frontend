import React, { useState, useEffect } from 'react'
import businessService from '../services/business.service';

class ConstraintManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          apiResponse:[],
          showModeratorBoard: false,
          showAdminBoard: false,
          currentUser: undefined,
          rows: [{}],
          editMode:{
            status: false,
            rowKey: null
          }
        };
    }
    
    callAPI = () => {
        businessService.getBusinessDetail("BurinLKB", "Ladkrabang").then(
            res => {
              console.log("apiResponse: " + res.data.BusinessDetail[0].constraint);
                this.setState({
                    apiResponse: res.data.BusinessDetail[0].constraint,
                    rows:res.data.BusinessDetail[0].constraint
                })
            }
        )
    }

    componentDidMount = () =>{
        this.callAPI();
        console.log("row: ", this.state.rows)
        console.log("apiResponse data: ", this.state.apiResponse);
    }

    handleChange = idx => e => {
      const { name, value } = e.target;
      const rows = [...this.state.rows];
      switch(name) {
        case "name":
          rows[idx] = {
            [name]: value,
            "text": rows[idx].text,
          };
          break;
        default:
          // code block
          rows[idx] = {
            [name]: value,
            "name": rows[idx].name,
          };
      }
      // rows[idx] = {
      //   [name]: value,
      // };
      this.setState({
        rows
      });
    };
    handleAddRow = () => {
      const item = {
        name: "",
        text: ""
      };
      this.setState({
        rows: [...this.state.rows, item],
        editMode:{
            status: true,
            rowKey: this.state.rows.length
          }
      });
    };
    handleRemoveRow = () => {
      this.setState({
        rows: this.state.rows.slice(0, -1)
      });
    };
    handleEdit = (idx) => () => {
      console.log(idx)
      this.setState({
        editMode:{
          status: true,
          rowKey: idx
        }
      });
    };
    handleRemoveSpecificRow = (idx) => () => {
      const rows = [...this.state.rows]
      rows.splice(idx, 1)
      this.setState({ rows })
    }
    handleSave = () => {
      console.log("save");
      this.setState({
        rows:[...this.state.rows],
        editMode:{
          status: false,
          rowKey: null
        }
      });
      console.log(this.state.rows);
    };


    render() {
      return (
        <div className="row clearfix">
          
            <div className="col-md-12 column">
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr style={{backgroundColor: "#F2C035"}}>
                    <th colspan="3">ข้อจำกัด/รายละเอียดอื่นๆ</th>
                    {/* <th className="text-center"> จัดการ </th> */}
                  </tr>
                </thead>
                <tbody style={{backgroundColor: 'white'}}>
                    <tr style={{backgroundColor:"#CCC7BB"}}>
                        <td colspan="2" className="text-center" >ข้อจำกัด/รายละเอียด</td>
                        <td className="text-center" style={{width: "200px"}}> จัดการ</td>
                    </tr>
                  {this.state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      {/* <td>{idx}</td> */}
                      
                      <td>
                        {this.state.editMode.status && this.state.editMode.rowKey === idx ?(
                          <div>
                              <input
                                type="text"
                                name="name"
                                value={this.state.rows[idx].name}
                                onChange={this.handleChange(idx)}
                                className="form-control"
                              />
                          </div>
                        ):(
                          this.state.rows[idx].name
                        )}
                        </td>

                        <td>
                          {this.state.editMode.status && this.state.editMode.rowKey === idx ?(
                            <div>
                                <input
                                  type="text"
                                  name="text"
                                  value={this.state.rows[idx].text}
                                  onChange={this.handleChange(idx)}
                                  className="form-control"
                                />
                            </div>
                          ):(
                            this.state.rows[idx].text
                          )}
                        </td>
                        
                      <td className="text-center">
                        {this.state.editMode.status && this.state.editMode.rowKey === idx ?(
                              <button
                                className={"btn btn-outline-success btn-sm"}
                                onClick={this.handleSave}
                              >
                                Save
                              </button>

                            ):(
                              <div>
                                <button
                                style={{marginRight: "10px"}}
                              className={"btn btn-warning btn-sm"}
                              onClick={this.handleEdit(idx)}
                            >
                              Edit
                            </button>

                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={this.handleRemoveSpecificRow(idx)}
                            >
                              Remove
                            </button>
                            </div>
                            )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                      <td colSpan="4" className="text-center">
                      <button onClick={this.handleAddRow} className="btn btn-primary">
                          Add Row
                        </button>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
      );
    }
  }

// =================================================================================================

export default ConstraintManage
