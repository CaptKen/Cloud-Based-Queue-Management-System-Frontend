import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import UserService from "../services/user.service";
import { Button } from "react-bootstrap";
import businessService from '../services/business.service';
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
function FieldManage() {
  const [data, setData] = useState([]);

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null
  });

  const fetchInventory = () => {
    businessService.getBusinessDetail("BurinLKB", "Ladkrabang").then(
        res => {
          console.log("apiResponse: " + res.data.BusinessDetail[0].fixedField);
            setData(res.data.BusinessDetail[0].fixedField)
        }
    )
  }

useEffect(() => {
    fetchInventory();
}, []);

  const [fieldName, setFieldName] = useState(null);

  /**
       *
       * @param id - The id of the product
       * @param fieldName - The current unit price of the product
       */
      const onEdit = ({id, fieldName}) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setFieldName(fieldName);
    }

    /**
       *
       * @param id
       * @param newFieldName
       */
      const updateFieldName = ({id, newFieldName}) => {
        // fetch(`${INVENTORY_API_URL}/${id}`, {
        //     method: "PATCH",
        //     body: JSON.stringify({
        //         unit_price: newUnitPrice
        //     }),
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // })
        //     .then(response => response.json())
        //     .then(json => {
        //         // reset inEditMode and unit price state values
        //         onCancel();

        //         // fetch the updated data
        //         fetchInventory();
        //     })
    }

    /**
     *
     * @param id -The id of the product
     * @param newFieldName - The new unit price of the product
     */
    const onSave = ({id, newFieldName}) => {
      updateFieldName({id, newFieldName});
  }

  const onCancel = () => {
    // reset the inEditMode state value
    setInEditMode({
        status: false,
        rowKey: null
    })
    // reset the unit price state value
    setFieldName(null);
}
return (
      <table>
          <thead>
          <tr>
              <th>Fields Name</th>
              <th>Action</th>
          </tr>
          </thead>
          <tbody>
            {console.log("data: ",  data)}
          {
              data.map((item, i) => (
                  <tr key={data[i]}>
                      <td>{item}</td>
                      <td>
                          {
                              inEditMode.status && inEditMode.rowKey === i ? (
                                  <input value={fieldName}
                                         onChange={(event) => setFieldName(event.target.value)}
                                  />
                              ) : (
                                  data[i]
                              )
                          }
                      </td>
                      <td>
                          {
                              inEditMode.status && inEditMode.rowKey === i ? (
                                  <React.Fragment>
                                      <button
                                          className={"btn-success"}
                                          onClick={() => onSave({id: i, newFieldName: fieldName})}
                                      >
                                          Save
                                      </button>

                                      <button
                                          className={"btn-secondary"}
                                          style={{marginLeft: 8}}
                                          onClick={() => onCancel()}
                                      >
                                          Cancel
                                      </button>
                                  </React.Fragment>
                              ) : (
                                  <button
                                      className={"btn-primary"}
                                      onClick={() => onEdit({id: i, fieldName: item})}
                                  >
                                      Edit
                                  </button>
                              )
                          }
                      </td>
                  </tr>
              ))
          }
          </tbody>
      </table>
);

  }

export default FieldManage
