// //https://stackoverflow.com/questions/56517162/dynamically-show-hide-columns-based-on-user-selection-with-respect-to-react-tabl

// import React, { Component } from "react";
// import ReactTable from "react-table";
// // import "react-table/react-table.css";

// const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
//     <div>
//       <label>
//         <input
//           type="checkbox"
//           name={label}
//           checked={isSelected}
//           onChange={onCheckboxChange}
//           className="form-check-input"
//         />
//         {label}
//       </label>
//     </div>
//   );

// class ManageQueueTableV2 extends Component {
//   data = [
//     { username: "Meera", status: "Approved" },
//     { username: "Foo", status: "Failed" },
//     { username: "Bar", status: "Approved" }
//   ];
//   state = {
//     columns: [
//       { Header: "Name", accessor: "username", show: true },
//       {
//         Header: "Status",
//         accessor: "status",
//         show: true,
//         Cell: props => {
//           return <span className="number">{props.value}</span>;
//         }
//       }
//     ]
//   };

//   toggleColumn = changeEvent => {
//     const { name } = changeEvent.target;

//     this.setState(state => {
//       const columns = state.columns.map(column => {
//         if (column.Header === name) {
//           column.show = !column.show;
//           return column;
//         } else {
//           return column;
//         }
//       });
//       return { columns };
//     });
//   };

//   render() {
//     return (
//       <div>
//         <h2>Click on the checkboxes to Show/Hide Rows</h2>

//         {this.state.columns.map((column, index) => (
//           <Checkbox
//             key={column.Header}
//             label={column.Header}
//             onCheckboxChange={this.toggleColumn}
//           />
//         ))}
//         <ReactTable data={this.data} columns={this.state.columns} />
//       </div>
//     );
//   }
// }


// export default ManageQueueTableV2;
