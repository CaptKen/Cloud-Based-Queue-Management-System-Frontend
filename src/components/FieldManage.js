import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import UserService from "../services/user.service";
import { Button } from "react-bootstrap";
import businessService from '../services/business.service';
import { render } from "react-dom";
import { connect } from "react-redux";
import GetInQueue from './GetInQueue'
// import makeData from './makeData'

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }
// `

// function Table({ columns, data }) {
//   // Use the state and functions returned from useTable to build your UI
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = useTable({
//     columns,
//     data,
//   })

//   // Render the UI for your table
//   return (
//     <table {...getTableProps()}>
//       <thead>
//         {headerGroups.map(headerGroup => (
//           <tr {...headerGroup.getHeaderGroupProps()}>
//             {headerGroup.headers.map(column => (
//               <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()}>
//         {rows.map((row, i) => {
//           prepareRow(row)
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map(cell => {
//                 console.log(cell);
//                 // return <td {...cell.getCellProps()}>{cell.render('Cell')}...</td>
//                 return <td {...cell.getCellProps()}>{cell.column.Header == "action" ?<div><Button variant="success">แก้ไข</Button></div>:row.original}</td>
//                 // return <td {...cell.getCellProps()}>{cell.render('Cell')}...</td>
//               })}
//             </tr>
//           )
//         })}
//         <tr>
//         <td>eiei</td>
//         <td>eiei</td>
//         </tr>
//       </tbody>
//     </table>
//   )
// }

// function FieldManage(props) {
//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'ข้อมูลสำหรับการจอง',
//         columns: [
//           {
//             Header: 'ชื่อฟิลด์',
//             accessor: 'fieldName',
//           },
//           {
//             Header: 'action',
//             accessor: 'action',
//           },
//         ],
//       }
//     ],
//     []
//   )

// //   const data = React.useMemo(() => makeData(20), [])
// //   console.log(data);

//   return (
//     <Styles>
//       <Table columns={columns} data={props.data} />
//     </Styles>
//   )
// }

// ==================================================================================================== แบบที่ 2 ===
// function FieldManage() {
//   const [data, setData] = useState([]);

//   const [inEditMode, setInEditMode] = useState({
//     status: false,
//     rowKey: null
//   });

//   const fetchInventory = () => {
//     businessService.getBusinessDetail("BurinLKB", "Ladkrabang").then(
//         res => {
//           console.log("apiResponse: " + res.data.BusinessDetail[0].fixedField);
//             setData(res.data.BusinessDetail[0].fixedField)
//         }
//     )
//   }

// useEffect(() => {
//     fetchInventory();
// }, []);

//   const [fieldName, setFieldName] = useState(null);

//   /**
//        *
//        * @param id - The id of the product
//        * @param fieldName - The current unit price of the product
//        */
//       const onEdit = ({id, fieldName}) => {
//         setInEditMode({
//             status: true,
//             rowKey: id
//         })
//         setFieldName(fieldName);
//     }

//     /**
//        *
//        * @param id
//        * @param newFieldName
//        */
//       const updateFieldName = ({id, newFieldName}) => {
//         // fetch(`${INVENTORY_API_URL}/${id}`, {
//         //     method: "PATCH",
//         //     body: JSON.stringify({
//         //         unit_price: newUnitPrice
//         //     }),
//         //     headers: {
//         //         "Content-type": "application/json; charset=UTF-8"
//         //     }
//         // })
//         //     .then(response => response.json())
//         //     .then(json => {
//         //         // reset inEditMode and unit price state values
//         //         onCancel();

//         //         // fetch the updated data
//         //         fetchInventory();
//         //     })
//     }

//     /**
//      *
//      * @param id -The id of the product
//      * @param newFieldName - The new unit price of the product
//      */
//     const onSave = ({id, newFieldName}) => {
//       updateFieldName({id, newFieldName});
//   }

//   const onCancel = () => {
//     // reset the inEditMode state value
//     setInEditMode({
//         status: false,
//         rowKey: null
//     })
//     // reset the unit price state value
//     setFieldName(null);
// }
// return (
//       <table>
//           <thead>
//           <tr>
//               <th>Fields Name</th>
//               <th>Action</th>
//           </tr>
//           </thead>
//           <tbody>
//             {console.log("data: ",  data)}
//           {
//               data.map((item, i) => (
//                   <tr key={data[i]}>
//                       <td>{item}</td>
//                       <td>
//                           {
//                               inEditMode.status && inEditMode.rowKey === i ? (
//                                   <input value={fieldName}
//                                          onChange={(event) => setFieldName(event.target.value)}
//                                   />
//                               ) : (
//                                   data[i]
//                               )
//                           }
//                       </td>
//                       <td>
//                           {
//                               inEditMode.status && inEditMode.rowKey === i ? (
//                                   <React.Fragment>
//                                       <button
//                                           className={"btn-success"}
//                                           onClick={() => onSave({id: i, newFieldName: fieldName})}
//                                       >
//                                           Save
//                                       </button>

//                                       <button
//                                           className={"btn-secondary"}
//                                           style={{marginLeft: 8}}
//                                           onClick={() => onCancel()}
//                                       >
//                                           Cancel
//                                       </button>
//                                   </React.Fragment>
//                               ) : (
//                                   <button
//                                       className={"btn-primary"}
//                                       onClick={() => onEdit({id: i, fieldName: item})}
//                                   >
//                                       Edit
//                                   </button>
//                               )
//                           }
//                       </td>
//                   </tr>
//               ))
//           }
//           </tbody>
//       </table>
//     );
//   }
// =================================================================================================

// ===================================================================== แบบที่ 3====================

class FieldManage extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      apiResponse: [],
      branch: '',
      businessName: this.props.businessName,
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      rows: [{}],
      editMode: {
        status: false,
        rowKey: null
      }
    };
  }
  // state = {
  //   rows: []
  // };


  // callAPI = () => {
  //   console.log("this is buz name: ", this.state.businessName);
  //     businessService.getBusinessDetail(this.state.businessName, "Ladkrabang").then(
  //         res => {
  //           // console.log("apiResponse: " + res.data.BusinessDetail[0].fields);
  //             this.setState({
  //                 apiResponse: res.data.BusinessDetail[0].fields,
  //                 // branch: res.data.BusinessDetail[0].branch,
  //                 // businessName: res.data.BusinessDetail[0].name
  //             })
  //         }
  //     )
  // }

  componentDidMount = () => {
    const user = this.props.user;
    // const businessName = this.props.businessName;
    // console.log(" +++++++++++++++++++++++++++++++++++ businessName:", businessName, user.businessName);
    if (user) {
      this.setState({
        currentUser: user,
        branch: user.branch,
        businessName: user.businessName,
      });
      businessService.getBusinessDetail(user.businessName, user.branch).then(
        res => {
          console.log("apiResponse: " + res.data.BusinessDetail[0].fields);
          this.setState({
            apiResponse: res.data.BusinessDetail[0].fields,
            // branch: res.data.BusinessDetail[0].branch,
            // businessName: res.data.BusinessDetail[0].name
          })
        }
      )
    }

    // this.callAPI();
    console.log("row: ", this.state.rows)
    console.log("apiResponse data: ", this.state.apiResponse);
  }

  handleChange = (idx) => (e) => {
    const { name, value } = e.target;
    const apiResponse = [...this.state.apiResponse];
    //   rows[idx] = {
    //     [name]: value
    //   };
    apiResponse[idx] = value;
    this.setState({
      apiResponse
    });
    console.log(this.state.rows);
    console.log("apiResponse data: ", this.state.apiResponse);
  };
  handleEdit = (idx) => () => {
    console.log(idx)
    this.setState({
      editMode: {
        status: true,
        rowKey: idx
      }
    });
  };
  handleAddRow = () => {
    console.log("add")
    const fieldName = "";
    this.setState({
      // rows: [...this.state.rows, item]
      apiResponse: [...this.state.apiResponse, fieldName],
      editMode: {
        status: true,
        rowKey: this.state.apiResponse.length
      }
    });
    // console.log(this.state.apiResponse.length)
  };
  // handleRemoveRow = () => {
  //   this.setState({
  //     rows: this.state.rows.slice(0, -1)
  //   });
  // };
  handleRemoveSpecificRow = (idx) => () => {
    const apiResponse = [...this.state.apiResponse];
    apiResponse.splice(idx, 1);
    this.setState({ apiResponse });
  };



  handleSave = () => {
    console.log("save");
    this.handleUpdateField();
    this.setState({
      editMode: {
        status: false,
        rowKey: null
      }
    });
    window.location.reload()
  };

  handleUpdateField = () => {
    console.log("this.state.apiResponse: ", this.state.apiResponse);

    const formData = {}
    formData["fields"] = this.state.apiResponse

    // const formList = []
    // Array.from(this.state.apiResponse).forEach(i => {
    //   formList.append("fields", {})
    // })
    console.log("formData: ", formData);
    businessService.updateFields(this.state.businessName, this.state.branch, formData)
      .then(() => {
        alert("update success")
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.editMode.status);
    return (
      <div>
        <h1 className="h1 text-center">ข้อมูลการเข้าใช้บริการ</h1>
        <div className="row clearfix">
          <div className="col-md-12 column">
            <table
              className="table table-bordered table-hover"
              id="tab_logic"
            >
              <thead>
                <tr style={{ backgroundColor: "#F2C035" }}>
                  {/* <th className="text-center"> </th> */}
                  <th colSpan="2"> ข้อมูลสำหรับการจอง</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'white' }}>
                <tr style={{ backgroundColor: "#CCC7BB" }}>
                  <td className="text-center">ชื่อฟิลด์</td>
                  <td className="text-center" style={{ width: "200px" }}>จัดการ</td>
                </tr>
                {this.state.apiResponse.map((item, idx) => (
                  <tr id="addr0" key={idx}>
                    {/* <td>{idx}</td> */}

                    <td>
                      {this.state.editMode.status && this.state.editMode.rowKey === idx ? (
                        <input
                          type="text"
                          name="name"
                          value={this.state.apiResponse[idx]}
                          onChange={this.handleChange(idx)}
                          className="form-control"
                        />
                      ) : (
                          this.state.apiResponse[idx]
                        )}
                    </td>
                    {/* <td>
                          <input
                            type="text"
                            name="mobile"
                            value={this.state.rows[idx].mobile}
                            onChange={this.handleChange(idx)}
                            className="form-control"
                          />
                        </td> */}
                    <td className="text-center">
                      {this.state.editMode.status && this.state.editMode.rowKey === idx ? (
                        <button
                          className={"btn btn-outline-success btn-sm"}
                          onClick={this.handleSave}
                        >
                          Save
                        </button>

                      ) : (
                          <div>
                            <button
                              style={{ marginRight: "10px" }}
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
                  <td className="text-left">
                    <button onClick={this.handleAddRow} className="btn btn-outline-primary btn-sm ">
                      เพิ่มฟิลด์
                        </button>
                  </td>
                  <td className="text-center">
                    <button onClick={this.handleUpdateField} className="btn btn-success btn-lg">
                      บันทึก
                        </button>
                  </td>
                </tr>
              </tbody>

            </table>

            {/* <button
                  onClick={this.handleRemoveRow}
                  className="btn btn-danger float-right"
                >
                  Delete Last Row
                </button> */}
          </div>
        </div>
        <br/>
        <h1 className="h1 text-center">ตัวอย่าง</h1>
        <div style={{borderColor:"gray", borderStyle: "groove" ,borderWidth: "5px"}}>
          <GetInQueue storeName={this.props.match.params.businessName} branch={this.props.match.params.branch} demo={true}/>
        </div>
      </div>
    );
  }
}

// =================================================================================================

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(FieldManage)
