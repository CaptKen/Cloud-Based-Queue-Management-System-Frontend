import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import UserService from "../services/user.service";
import { Button } from "react-bootstrap";
import businessService from '../services/business.service';
import { render } from "react-dom";
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

class TableManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          apiResponse:[],
          businessName:'',
          branch:'',
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
              console.log("apiResponse: " + res.data.BusinessDetail[0].tableDetail);
                this.setState({
                    apiResponse: res.data.BusinessDetail[0].tableDetail,
                    rows:res.data.BusinessDetail[0].tableDetail,
                    branch: res.data.BusinessDetail[0].branch,
                    businessName: res.data.BusinessDetail[0].name
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
            "quantity": rows[idx].quantity,
            "typeSymbol": rows[idx].typeSymbol
          };
          break;
        case "quantity":
          // code block
          rows[idx] = {
            [name]: value,
            "name": rows[idx].name,
            "typeSymbol": rows[idx].typeSymbol
          };
          break;
        default:
          // code block
          rows[idx] = {
            [name]: value,
            "name": rows[idx].name,
            "quantity": rows[idx].quantity
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
        quantity: "",
        typeSymbol: ""
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

    handleUpdateTable = () => {
      console.log("this.state.rows: ", this.state.rows);
      const formData = {}
      formData["tableDetail"] = this.state.rows
      console.log("formData: ", formData);

      businessService.updateTableDetail(this.state.businessName, this.state.branch, formData)
        .then(() =>{
          alert("update success")
        })
        .catch(err => {
          console.log(err);
        });
    }


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
                    <th colspan="4">ข้อมูลโต๊ะ</th>
                    {/* <th className="text-center">จำนวน</th>
                    <th className="text-center">ประเภท</th>
                    <th className="text-center"> จัดการ </th> */}
                  </tr>
                </thead>
                <tbody style={{backgroundColor: 'white'}}>
                  <tr style={{backgroundColor:"#CCC7BB"}}>
                    <td className="text-center">ชื่อโต๊ะ</td>
                    <td className="text-center">จำนวน</td>
                    <td className="text-center">ประเภท</td>
                    <td className="text-center" style={{width: "200px"}}> จัดการ </td>
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
                                  name="quantity"
                                  value={this.state.rows[idx].quantity}
                                  onChange={this.handleChange(idx)}
                                  className="form-control"
                                />
                            </div>
                          ):(
                            this.state.rows[idx].quantity
                          )}
                        </td>

                        <td>
                          {this.state.editMode.status && this.state.editMode.rowKey === idx ?(
                            <div>
                                <input
                                  type="text"
                                  name="typeSymbol"
                                  value={this.state.rows[idx].typeSymbol}
                                  onChange={this.handleChange(idx)}
                                  className="form-control"
                                />
                            </div>
                          ):(
                            this.state.rows[idx].typeSymbol
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
                      <td colSpan="3" className="text-left">
                      <button onClick={this.handleAddRow} className="btn btn-outline-primary btn-sm">
                          เพิ่มประเภทโต๊ะ
                        </button>
                      </td>
                      <td  className="text-center">
                      <button onClick={this.handleUpdateTable} className="btn btn-success btn-lg">
                          บันทึก
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

export default TableManage
