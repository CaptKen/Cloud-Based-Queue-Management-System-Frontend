import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useTable, usePagination, useFilters, useAsyncDebounce, useSortBy, useGlobalFilter } from 'react-table'
import userService from "../services/user.service";
import { matchSorter } from 'match-sorter'
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import businessService from "../services/business.service";
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

function Table({ columns, data, tableList, categories }) {
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
  const [notthing, setNotthing] = useState("")
  const handleChangeTableName = (e) => {
    console.log("e.target.value : ", e.target.value);
    const test = e.target.value;
    setService_no(test)
  }

  const handleAcceptQueue = (e) => {
    console.log("handleAcceptQueue : ", e.row.original);
    const queueDetailData = e.row.original;
    console.log("service_no : ", service_no);

    if (service_no === "" && categories !== "ร้านอาหาร") {
      alert("กรุณาเลือกเคาเตอร์")
    } else {
        queueDetailData['service_no'] = service_no
        var r = window.confirm("ยืนยันการรับคิว");
        if (r) {
          userService.acceptCurrentQueue(e.row.original.username, e.row.original)
            .then(() => {
              setNotthing("")
              alert("รับคิวสำเร็จ")
              // window.location.reload()
            })
            .catch((err) => {
              console.error(err);
              alert("รับคิวไม่สำเร็จ")
            });
          // userService.getServiceNo(e.row.original.username, "โต๊ะ1", e.row.original)
          //   .then(() => {
          //   })
          //   .catch((err) => {
          //   });
        } else {
          alert("ยกเลิกการรับคิว")
        }
    }


    console.log("queueDetailData : ", queueDetailData);

  };

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
  },
    useFilters,
    useSortBy,
    usePagination,

  )

  // ลองเอามาใส่ในนี้เพราะเผื่อจะทำ modal สวยๆ
  const handleCancelQueue = useCallback(
    (e) => {
      console.log("handleCancelQueue : ", e.row.original);
      var r = window.confirm("ยืนยันการยกเลิกคิว");
      if (r) {
        userService.cancelQueue(e.row.original.username, e.row.original)
          .then(() => {
            alert("ยกเลิกคิวสำเร็จ")
            window.location.reload()
          })
          .catch((err) => {
            console.error(err);
            alert("ยกเลิกไม่คิวสำเร็จ")
          });
      } else {
        alert("ยกเลิกการยกเลิกคิว")
      }
    },
    [], // Tells React to memoize regardless of arguments.
  );



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
                    return <td {...cell.getCellProps()}>{cell.column.Header === "จัดการ" ?
                      <div>
                        {/* <OptionServiceList service_type={cell.column.filteredRows[0].original.service_type} business_name={cell.column.filteredRows[0].original.business_name} branch={cell.column.filteredRows[0].original.branch}></OptionServiceList> */}
                        {/* <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          รับคิว
                          </button>
                        <DropDownTable acceptQueue={() => handleAcceptQueue(cell)} service_type={cell.column.filteredRows[0].original.service_type} business_name={cell.column.filteredRows[0].original.business_name} branch={cell.column.filteredRows[0].original.branch}></DropDownTable> */}

                        <Button variant="success" onClick={() => handleAcceptQueue(cell)}>รับคิว</Button>{'           '}
                        <Button variant="danger" onClick={() => handleCancelQueue(cell)}>ยกเลิกคิว</Button>
                      </div> :
                      // cell.render('Cell')
                      cell.column.Header === "เวลา" ?
                        (
                          console.log("เวลา : ", cell.render('Cell').props.cell.value),
                          cell.render('Cell').props.cell.value ? new Date(cell.render('Cell').props.cell.value).toLocaleString('th-TH') : "-"
                        ) : (

                          cell.render('Cell'))}
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
  let [categories, setCategories] = useState("");
  let [services, setServices] = useState([]);
  let [tableList, setTableList] = useState([]);
  useEffect(() => {
    userService.allQueueOfBusiness(businessName).then(
      res => {
        setQueues(res.data)
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


    []);

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
            accessor: 'service_type',
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
      <Table className="col" columns={columns} data={queues} tableList={tableList} categories={categories} />
      {/* <ShowQueuePage serviceType={services}></ShowQueuePage> */}
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
