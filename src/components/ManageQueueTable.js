import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import UserService from "../services/user.service";
import { Button } from "react-bootstrap";
// import makeData from './makeData'

const Styles = styled.div`
  padding: 1rem;

  table {
    border: 1px solid black;
    

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-top: 1px solid black;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      border-radius: 10px;
    }
  }
`


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return <input type="checkbox" ref={resolvedRef} {...rest} />
  }
)

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    state,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <>
      <div className="justify-content-center" style={{ display: "-webkit-inline-box" }}>
        {/* <div>
          <IndeterminateCheckbox {...getToggleHideAllColumnsProps()} /> Toggle
          All
        </div> */}
        {allColumns.map(column => (
          <div key={column.id} style={{ padding: "8px" }}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {console.log(column)}
              {/* {column.id} */}
              {column.Header}
            </label>
          </div>
        ))}
        <br />
      </div>
      <table className="table table-striped" style={{ backgroundColor: "snow", borderRadius: "10px" }} {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            // console.log(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  console.log(cell.column.Header == "จัดการ" ? "THIS IS BUTTON" : cell);
                  return <td {...cell.getCellProps()}>{cell.column.Header == "จัดการ" ? <div><Button variant="success">รับคิว</Button>{'           '}<Button variant="outline-danger">ยกเลิกคิว</Button></div> : cell.render('Cell')}</td>
                  //   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  // return <td {...cell.getCellProps()}>eiei</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre>   */}
    </>
  )
}


function ManageQueueTable(props) {
  // const storeName = this.props.match.params.businessName;
  console.log("prop +++++++++", props);
  const columns = React.useMemo(
    () => [
      {
        Header: props.storeName,
        columns: [
          {
            Header: 'หมายเลขคิว',
            accessor: 'queue_no',
          },
          {
            Header: 'ชื่อผู้ใช้บริการ',
            accessor: 'username',
          },
          {
            Header: 'สถานะ',
            accessor: 'status',
          },
          {
            Header: 'ประเภทคิว',
            accessor: 'queue_type',
          },
          {
            Header: 'เวลาลงทะเบียนใช้บริการ',
            accessor: 'get_in_time',
          },
          {
            Header: 'เวลาที่จอง',
            accessor: 'book_time',
          },
          {
            Header: 'หมายเหตุ',
            accessor: 'user_detail',
          },
          {
            Header: 'จัดการ',
            accessor: 'manage',
          },
        ],
      },
      //   {
      //     Header: 'Info',
      //     columns: [
      //       {
      //         Header: 'Age',
      //         accessor: 'age',
      //       },
      //       {
      //         Header: 'Visits',
      //         accessor: 'visits',
      //       },
      //       {
      //         Header: 'Status',
      //         accessor: 'status',
      //       },
      //       {
      //         Header: 'Profile Progress',
      //         accessor: 'progress',
      //       },
      //     ],
      //   },
    ],
    []
  )

  //   const [queue_data, set_queue_data] = useState();
  //   useEffect(() => {
  //     UserService.allQueueOfBusiness("burinLKB")
  //       .then(({ data }) => {
  //         //   console.log(data);
  //           set_queue_data(data);
  //       });
  //   }, []);
  return (
    <Styles className="container text-center">
      <Table columns={columns} data={props.data} />
    </Styles>
  )
}

export default ManageQueueTable
