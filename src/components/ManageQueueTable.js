import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useFilters, useAsyncDebounce, useSortBy, useGlobalFilter } from 'react-table'
import userService from "../services/user.service";
import { matchSorter } from 'match-sorter'
import { Modal, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import businessService from "../services/business.service";
import { clearMessage, setMessage } from "../actions/message";
import axios from "axios";
import { connect } from "react-redux";
// import DropDownTable from "./DropDownTable"
// import OptionServiceList from "./OptionServiceList"
import ShowQueuePage from "./ShowQueuePage"
// import makeData from './makeData'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th {
      vertical-align: top;
      }
      
    th,
    td {
      margin: 0;
      padding: 0.5rem;
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    // <input
    //   value={filterValue || ''}
    //   style={{backgroundColor: 'inherit'}}
    //   onChange={e => {
    //     setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
    //   }}
    // />
    <div></div>
  )
}


// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    console.log("options : ", options);
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      style={{ border: "1px solid black", color: 'black' }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {console.log("options : ", option)}
          {option}
        </option>
      ))}
    </select>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

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

function Table({ columns, data, tableList, categories, forceUpdate, handleShow, handleShowSkip }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )


  const [type, setType] = useState("")
  const [service_no, setService_no] = useState("")
  const [, updateState] = React.useState();
  let [isLoading, setIsLoading] = useState(false);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [details, setDetails] = useState([]);
  let [isShowMarkDone, setShowMarkDone] = useState(false);

  const handleChangeTableName = (e) => {
    console.log("e.target.value : ", e.target.value);
    const test = e.target.value;
    console.log("test : ", test);
    setService_no(test)
  }

  const handleClose = () => {
    setIsShowDetail(false)
    setShowMarkDone(false)
  };

  const handleCloseMarkDone = () => {
    setShowMarkDone(false)
  };

  const handleShowDetail = (e) => {
    console.log("setDetails : ", e);
    setDetails(e)
    setIsShowDetail(true)
  };

  const handleShowMarkDone = (details) => {
    console.log("showMarkDone : ", details);
    setShowMarkDone(true)
  };

  const handleMarkAsDone = () => {
    setIsLoading(true)
    const queueDetailData = details;
    userService.markQueueAsDone(details.username, details)
      .then(() => {
        setIsLoading(false)
        alert("สิ้นสุดการให้บริการคิว : " + details.queue_no + " สำเร็จ")
        handleClose()
        forceUpdate()
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false)
        alert("เกิดข้อผิดพลาด/ไม่สามารถสิ้นสุดการให้บริการได้")
        handleClose()
        forceUpdate()
      });
    console.log("queueDetailData : ", queueDetailData);
  }
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    allColumns,
    getToggleHideAllColumnsProps,
    state: { pageIndex, pageSize },

  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 },
    defaultColumn, // Be sure to pass the defaultColumn option
    filterTypes,
    autoResetFilters: false,

  },
    useFilters,
    useSortBy,
    usePagination,

  )

  // // ลองเอามาใส่ในนี้เพราะเผื่อจะทำ modal สวยๆ
  // const handleCancelQueue = useCallback(
  //   (e) => {
  //     console.log("handleCancelQueue : ", e.row.original);
  //     var r = window.confirm("ยืนยันการยกเลิกคิว");
  //     if (r) {
  //       userService.cancelQueue(e.row.original.username, e.row.original)
  //         .then(() => {
  //           alert("ยกเลิกคิวสำเร็จ")
  //           window.location.reload()
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //           alert("ยกเลิกไม่คิวสำเร็จ")
  //         });
  //     } else {
  //       alert("ยกเลิกการยกเลิกคิว")
  //     }
  //   },
  //   [], // Tells React to memoize regardless of arguments.
  // );



  // Render the UI for your table
  return (
    <div className="container" style={{ margin: "auto" }}>
      <div style={{ display: "-webkit-inline-box" }}>
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
        {!(categories === "ร้านอาหาร") && (
          <div className="dropdown ml-3">
            {/* <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          กรุณาเลือกเคาเตอร์
        </button>
        <div className="dropdown-menu" style={{ backgroundColor: "white" }} aria-labelledby="dropdownMenuButton">
          {tableList.map((item) => {
            // return <a className="dropdown-item" onClick={() => this.props.acceptQueue()}>{item}</a>
            return <a className="dropdown-item">{item}</a>

          })}
        </div> */}
            <select onChange={(e) => handleChangeTableName(e)} className="form-control" style={{ width: "180px", marginLeft: "80%", position: "absolute" }}>
              <option selected value="กรุณาเลือกเคาเตอร์">กรุณาเลือกเคาเตอร์ </option>
              {tableList.map((item) => {
                return <option className="dropdown-item" value={item} type="button" style={{ color: "Black" }}>{item}</option>

              })}
            </select>

          </div>
        )}

        <br />
      </div>
      <div className="table-responsive">
        <table className="table" style={{ backgroundColor: "snow", borderRadius: "10px" }} {...getTableProps()}>
          <thead className="thead-dark">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} >
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {/* {column.render('Header') === "สถานะ" || column.render('Header') === "ประเภทคิว" ? (
                    <>
                      <div>{column.canFilter ? column.render('Filter') : null}</div>
                      {column.render('Header')}

                    </>
                  ) : (
                    <>
                      {column.render('Header')}
                    </>
                  )} */}
                    {column.render('Header')}{' '}{' '}
                    <span>
                      {(column.canSort && !column.isSorted) && <i class="fas fa-sort"></i>}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <i class="fas fa-caret-down"></i>
                          : <i class="fas fa-caret-up"></i>
                        : ''}
                    </span>
                    <div>{column.canFilter ? column.render('Filter') : null}</div>

                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              // console.log(row);
              return (
                <tr {...row.getRowProps()}

                  className={row.cells[3].value === "จองเวลา" ? "table-warning" : "table-info"}
                >

                  {/* className="table-danger" */}

                  {row.cells.map(cell => {
                    console.log(cell.column.Header === "จัดการ" ? "THIS IS BUTTON" : cell);
                    console.log("cell : ", cell)
                    return <td {...cell.getCellProps()}>{cell.column.Header === "จัดการ" ?
                      cell.row.original.status === "Waiting" ?
                        (
                          <div>
                            <Button variant="success" onClick={() => handleShow(cell.row.original, service_no)}>รับคิว</Button>{'    '}
                            <Button variant="warning" onClick={() => handleShowSkip(cell.row.original)}>ข้ามคิว</Button>
                          </div>
                        ) : (
                          cell.row.original.status === "Skip" ? (
                            <div>
                              <Button variant="success" onClick={() => handleShow(cell.row.original, service_no)}>รับคิว</Button>
                            </div>
                          ) : (
                            <div>
                              <Button style={{ width: "fit-content", margin: "auto" }} variant="primary" onClick={() => handleShowDetail(cell.row.original)}>รายละเอียด</Button>
                            </div>
                          )

                        ) :
                      // cell.render('Cell')
                      cell.column.Header === "เวลา" ?
                        (
                          console.log("เวลา : ", cell.render('Cell').props.cell.value),
                          cell.render('Cell').props.cell.value ? new Date(cell.render('Cell').props.cell.value).toLocaleString('th-TH') : "-"
                        ) : (
                          cell.column.Header === "สถานะ" ? (
                            <div style={{ color: cell.row.original.status === "Skip" ? "black" : 'white', paddingInline: "5px", width: "fit-content", borderColor: cell.row.original.status === "Done" ? "#28A745" : cell.row.original.status === "In Process" ? "#007BFF" : cell.row.original.status === "Skip" ? "#FFC107" : cell.row.original.status === "Cancel" ? "#DC3545" : "#6C757D", borderWidth: "2px", backgroundColor: cell.row.original.status === "Done" ? "#28A745" : cell.row.original.status === "In Process" ? "#007BFF" : cell.row.original.status === "Skip" ? "#FFC107" : cell.row.original.status === "Cancel" ? "#DC3545": "#6C757D", borderRadius: "20px 20px 20px 20px" }}>
                            {cell.render('Cell')}
                          </div>
                          ):(
                            cell.render('Cell')
                          )
                        )}
                    </td>
                    //   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    // return <td {...cell.getCellProps()}>eiei</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>


      <div className="pagination d-block" style={{ margin: "auto" }}>
        <button className="btn" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button className="btn" onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <span style={{ padding: ".375rem .75rem" }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button className="btn" onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button className="btn" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}



        {/* <span style={{padding: ".375rem .75rem"}}>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '} */}

        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
          style={{ padding: ".375rem .75rem", border: "1px solid black" }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre>   */}

      <Modal show={isShowDetail} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isShowMarkDone ? "สิ้นสุดการให้บริการคิว" : "ข้อมูลคิว " + details.queue_no}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ alignSelf: isShowMarkDone && "center" }}>
          {isShowMarkDone ? (
            isLoading ? (
              <Spinner className="m-3" animation="border" style={{ alignSelf: "center" }} variant="primary" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              <>
                <p>ต้องการสิ้นสุดการให้บริการคิว : {details.queue_no} หรือไม่ ?</p>
              </>
            )

          ) : (
            <>
              <div className="row">
                <div className="col">
                  <strong>
                    หมายเลขคิว. :
                  </strong>

                </div>
                <div className="col">
                  {details.queue_no}
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <strong>
                    ชื่อผู้ใช้บริการ :
                  </strong>

                </div>
                <div className="col">
                  {details.username}
                </div>
              </div>

              {/* <div className="row">
            <div className="col">
            เบอร์โทรศัพท์ :
            </div>
            <div className="col">
              {details.queueDetail.เบอร์โทรศัพท์}
            </div>
          </div> */}

              <div className="row">
                <div className="col">
                  <strong>
                    Email :
                    </strong>

                </div>
                <div className="col">
                  {details.email}
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <strong>
                    ประเภทบริการที่เข้าใช้ :
                    </strong>

                </div>
                <div className="col">
                  {details.serviceTypeDesc}
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <strong>
                    ช่องบริการ :
                    </strong>

                </div>
                <div className="col">
                  {details.service_no}
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <strong>
                    สถานะการใช้บริการ :
                    </strong>

                </div>
                <div className="col">
                  <p style={{ color: 'white', paddingInline: "5px", width: "fit-content", borderColor: details.status === "Done" ? "#28A745" : details.status === "Cancel" ? "#DC3545" : "#007BFF", borderWidth: "2px", backgroundColor: details.status === "Done" ? "#28A745" : details.status === "Cancel" ? "#DC3545" : "#007BFF", borderRadius: "20px 20px 20px 20px" }}>{details.status}</p>
                </div>
              </div>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          {isShowMarkDone ? (
            <>
              <Button variant="success" onClick={handleMarkAsDone}> ยืนยัน</Button>
              <Button variant="danger" onClick={handleCloseMarkDone}> ยกเลิก</Button>
            </>
          ) : (
            details.status === "In Process" ? (
              <>
                <Button variant="success" onClick={() => handleShowMarkDone(details)}> เสร็จสิ้นการให้บริการ</Button>
                <Button variant="danger" onClick={handleClose}> ปิด</Button>
              </>
            ) : (
              <Button variant="danger" onClick={handleClose}> ปิด</Button>
            )

          )}

        </Modal.Footer>
      </Modal>
    </div>
  )
}


function ManageQueueTable(props) {
  const { businessName } = useParams();
  const { branch } = useParams();
  const service_no = "";
  console.log("storename : ", businessName);
  console.log("storename : ", branch);
  let [queues, setQueues] = useState([]);
  let [serviceList, setServiceList] = useState([]);
  let [event, setEvent] = useState([]);
  let [tableName, setTable] = useState([]);
  let [categories, setCategories] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [isShow, setShow] = useState(false);
  let [isShowSkip, setShowSkip] = useState(false);
  let [tableList, setTableList] = useState([]);
  const [update, updateState] = React.useState(false);
  let [disableButton, setDisableButton] = useState(true);
  let [message, setMessage] = useState("");
  let [successful, setSuccessful] = useState(false);

  const forceUpdate = () => {
    updateState(!update)
  }

  const handleAcceptQueue = () => {
    setIsLoading(true)
    setDisableButton(true)
    console.log("handleAcceptQueue : ", event);
    const queueDetailData = event;
    console.log("service_no : ", tableName);
    queueDetailData['service_no'] = tableName
    userService.acceptCurrentQueue(event.username, event)
      .then(() => {
        setIsLoading(false)
        alert("รับคิวสำเร็จ")
        updateState(!update)
        setShow(false)
      })
      .catch((err) => {
        setIsLoading(false)
        console.error(err);
        alert("รับคิวไม่สำเร็จ")
        updateState(!update)
        setShow(false)
      });
    console.log("queueDetailData : ", queueDetailData);
  };

  const handleSkipQueue = () => {
    setIsLoading(true)
    console.log("handleAcceptQueue : ", event);
    const queueDetailData = event;
    userService.skipCurrentQueue(event.username, event)
      .then(() => {
        setIsLoading(false)
        alert("ข้ามคิวสำเร็จ")
        setIsLoading(true)
        setShowSkip(false)
        updateState(!update)
      })
      .catch((err) => {
        setIsLoading(false)
        console.error(err);
        alert("ข้ามคิวไม่สำเร็จ")
        setShowSkip(false)
        updateState(!update)
      });
    console.log("queueDetailData : ", queueDetailData);
  };

  const handleClose = (e) => {
    setShow(false)
    setShowSkip(false)
    setIsLoading(false)
  };

  const handleShow = (e, tableName) => {
    setIsLoading(false)
    setTable(tableName)
    console.log("setEvent : ", e);
    console.log("e.queueDetail['queue_no'] : ", e.queue_no);
    console.log("tableName : ", tableName);
    setEvent(e)
    if ((tableName === "" && categories !== "ร้านอาหาร") || (tableName === "กรุณาเลือกเคาเตอร์" && categories !== "ร้านอาหาร")) {
      setMessage("กรุณาเลือกเคาเตอร์ที่รับผิดชอบ")
      setDisableButton(true)
    } else {
      setSuccessful(true)
      setDisableButton(false)
      setMessage("ต้องการเรียกคิว " + e.queue_no + " หรือไม่ ?")
    }
    setShow(true)
  };

  const handleShowSkip = (e) => {
    setIsLoading(false)
    console.log("setEvent : ", e);
    setEvent(e)
    setSuccessful(true)
    setDisableButton(false)
    setMessage("ต้องการข้ามคิว " + e.queue_no + " หรือไม่")
    setShowSkip(true)
  };

  useEffect(() => {
    userService.allQueueOfBusiness(businessName).then(
      res => {
        setQueues(res.data)
        console.log("setQueue : ", res.data);
        // setServices(res.data[0].service_type)
      }
    )
    businessService.getBusinessDetail(businessName, branch).then(
      res => {
        console.log("res.data.BusinessDetail[0]: " + res.data.BusinessDetail[0].categories);
        setCategories(res.data.BusinessDetail[0].categories)
        setServiceList(res.data.BusinessDetail[0].tableDetail)
        const tableslist = []

        res.data.BusinessDetail[0].tableDetail.forEach((item) => {

          for (let i = 1; i <= parseInt(item.quantity); i++) {
            console.log("i : ", i);
            console.log("item.name + i : ", item.typeSymbol + i);
            console.log("tableList : ", tableList);
            // setTableList([...tableList, item.typeSymbol + i])
            tableslist.push(item.typeSymbol + i)
          }
        })
        setTableList(tableslist)
        console.log("tableslist : ", tableslist);
        console.log("tableList : ", tableList);

      }
    )
  },
    [update]);

  console.log("prop +++++++++", props);
  const columns = React.useMemo(
    () => [
      {
        Header: businessName,
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
            disableSortBy: true,
            Filter: SelectColumnFilter,

            filter: 'includes',
          },
          {
            Header: 'ประเภทคิว',
            accessor: 'queue_type',
            disableSortBy: true,
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'ประเภทบริการ',
            accessor: 'serviceTypeDesc',
            disableSortBy: true,
            Filter: SelectColumnFilter,
          },
          // {
          //   Header: 'เวลาลงทะเบียนใช้บริการ',
          //   accessor: 'get_in_time',
          // },
          {
            Header: 'เวลา',
            accessor: 'book_time',
          },
          // {
          //   Header: 'หมายเหตุ',
          //   accessor: 'user_detail',
          // },
          {
            Header: 'จัดการ',
            accessor: 'manage',
            disableSortBy: true,
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

    <Styles className="row text-center">
      <Table className="col" columns={columns} data={queues} tableList={tableList} categories={categories} forceUpdate={forceUpdate} handleShow={handleShow} handleShowSkip={handleShowSkip} />
      {/* <ShowQueuePage serviceType={services}></ShowQueuePage> */}

      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการเรียกคิว</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ alignSelf: "center" }}>
          {isLoading ? (
            <Spinner className="m-3" animation="border" style={{ alignSelf: "center" }} variant="primary" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : message && successful ? (
            <div>
              {message}
            </div>
          ) : (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            ยกเลิก
              </Button>
          <Button variant="success" onClick={handleAcceptQueue} disabled={disableButton && !isLoading}>
            ยืนยัน
              </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isShowSkip} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ยืนยันการข้ามคิว</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ alignSelf: "center" }}>
          {isLoading ? (
            <Spinner className="m-3" animation="border" style={{ alignSelf: "center" }} variant="primary" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : message && successful ? (
            <div>
              {message}
            </div>
          ) : (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            ยกเลิก
              </Button>
          <Button variant="success" onClick={handleSkipQueue} disabled={isLoading}>
            ยืนยัน
              </Button>
        </Modal.Footer>
      </Modal>
    </Styles>
  )
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(ManageQueueTable);
