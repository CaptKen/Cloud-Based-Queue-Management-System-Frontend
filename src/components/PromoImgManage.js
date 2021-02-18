import axios from 'axios';
import React, { useState, useEffect } from 'react'
import businessService from '../services/business.service';
import { connect } from "react-redux";

class PromoImgManage extends React.Component {
  //   constructor() {
  //     super();

  //     this.state = {
  //       images: [],
  //     };
  //   }

  //   onImageChange = event => {
  //     console.log("event.target.files: ", event.target.files[0]);
  //     const fileDetail = event.target.files[0].name;
  //     const item ={
  //       fileName: event.target.files[0]
  //     }
  //     this.setState({
  //       images: [...this.state.images, item],
  //     });
  //   };

  //   onSubmit = e => {
  //     e.preventDefault();

  //     const formData = {}
  //     formData["promoImg"] = this.state.images;
  //     // Array.from(this.state.images).forEach(image => {
  //     //   formData.append('promoImg', { img1:image});
  //     // });
  //     console.log("formData: ", formData);
  //     axios
  //       .post(`http://localhost:8080/api/business/addBusiness`, formData)
  //       .then(res => {
  //         console.log(res);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };

  //   render() {
  //     console.log("this.state.images: ", this.state.images);
  //     return (
  //       <div className="App">
  //         <form onSubmit={this.onSubmit}>
  //           <input
  //             type="file"
  //             name="files"
  //             onChange={this.onImageChange}
  //             alt="image"
  //           />
  //           <br />
  //           <button type="submit">Send</button>
  //         </form>
  //       </div>
  //     );
  //   }

  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    // this.importAll = this.importAll.bind(this);

    this.state = {
      ImgDir: '../../../Cloud-Based-Queue-Management-System-Backend-MongoDB/uploads/BurinLKB' + "BurinLKB",
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      fileNameforShow: 'No file chosen',
      fileInfos: [],

      apiResponse: [],
      businessName: '',
      branch: '',
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

  // callAPI = () => {
  //   businessService.getBusinessDetail("BurinLKB", "Ladkrabang").then(
  //       res => {
  //         // console.log("apiResponse: " + res.data.BusinessDetail[0].constraint);
  //           this.setState({
  //               businessName: res.data.BusinessDetail[0].name,
  //               branch:res.data.BusinessDetail[0].branch
  //           })
  //       }
  //   )
  // }



  componentDidMount() {
    const user = this.props.user;
    console.log(user.businessName);
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        businessName: user.businessName,
        branch: user.branch
      });

    }
    businessService.getPromotionImg(user.businessName).then((response) => {
      console.log(response.data);
      this.setState({
        fileInfos: response.data,
      });
    });
    // this.callAPI();
    // console.log("row: ", this.state.rows)
    // console.log("apiResponse data: ", this.state.apiResponse);
  }

  selectFile(event) {
    console.log("event.target.files", event.target.files[0].name);
    this.setState({
      selectedFiles: event.target.files,
      fileNameforShow: event.target.files[0].name
    });

  }

  upload() {
    let currentFile = this.state.selectedFiles[0];
    this.setState({
      progress: 0,
      currentFile: currentFile,
    });

    businessService.upLoadPromotionImg(currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    }, this.state.businessName)
      .then((response) => {
        this.setState({
          message: response.data.message,
          fileNameforShow: 'No file chosen'
        });
        return businessService.getPromotionImg(this.state.businessName);
      })
      .then((files) => {
        this.setState({
          fileInfos: files.data,
        });
      })
      .catch(() => {
        this.setState({
          progress: 0,
          message: "Could not upload the file!",
          currentFile: undefined,
        });
      });

    this.setState({
      selectedFiles: undefined,
    });
  }

  handleChange = idx => e => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    switch (name) {
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
      editMode: {
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
  handleEdit = () => () => {
    this.setState({
      progress: 0,
      editMode: {
        status: true,
      }
    });
  };
  handleRemoveSpecificRow = (fileName) => () => {
    console.log(fileName);
    businessService.deletePromoImg(this.state.businessName, fileName)
      .then(() => {
        alert("update success")
        businessService.getPromotionImg(this.state.businessName).then((response) => {
          this.setState({
            fileInfos: response.data,
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleSave = () => {
    console.log("save");
    this.setState({
      rows: [...this.state.rows],
      editMode: {
        status: false,
        rowKey: null
      }
    });
    console.log(this.state.rows);
  };

  handleUploadInput = () => {
    const actualBtn = document.getElementById('actual-btn');
    const fileChosen = document.getElementById('file-chosen');

    actualBtn.addEventListener('change', function () {
      fileChosen.textContent = this.files[0].name
    })
  }


  // importAll(r) {
  //   let images = {};
  //   r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  //   return images;
  // }

  render() {
    const {
      selectedFiles,
      currentFile,
      progress,
      message,
      fileInfos,
    } = this.state;
    console.log("fileInfo: ", fileInfos);
    // const images = this.importAll(require.context('./../statics/advertising', false, /\.(png|jpe?g|svg)$/));


    return (
      <div>
        <h1 className="h1 text-center">โปรโมชั่น</h1>
        <div className="row clearfix">

          <div className="col-md-12 column">
            <table
              className="table table-bordered table-hover"
              id="tab_logic"
            >
              <thead>
                <tr style={{ backgroundColor: "#F2C035" }}>
                  <th colspan="3">รูปภาพโปรโมชั่น</th>
                  {/* <th className="text-center"> จัดการ </th> */}
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'white' }}>
                <tr style={{ backgroundColor: "#CCC7BB" }}>
                  <td className="text-center" style={{ width: "200px" }}>ชื่อรูป</td>
                  <td className="text-center" >ตัวอย่าง</td>
                  <td className="text-center" style={{ width: "200px" }}> จัดการ</td>
                </tr>
                {fileInfos.map((item, idx) => (
                  <tr id="addr0" key={idx}>
                    {/* <td>{idx}</td> */}

                    <td>
                      {this.state.editMode.status && this.state.editMode.rowKey === idx ? (
                        <div>
                          <input
                            type="checkBox"
                            name="text"
                            // value={this.state.rows[idx].text}
                            // onChange={this.handleChange(idx)}
                            style={{ marginRight: `10%` }}
                          />
                          {/* <input
                                type="text"
                                name="name"
                                value={fileInfos[idx].name}
                                onChange={this.handleChange(idx)}
                                className="form-control"
                                style={{width: `80%`, display:'inline', marginLeft:`10%`}}
                              /> */}
                          {/* {fileInfos[idx].name} */}
                          {/* <a href={item.url}>{item.name}</a>
                              <a src={this.state.ImgDir+"/"+fileInfos[idx].name}></a>
                              <img src={item.url}/> */}
                          {fileInfos[idx].name}
                        </div>
                      ) : (
                          fileInfos[idx].name
                        )}
                    </td>

                    <td>
                      <img src={item.url} />
                    </td>



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
                              className="btn btn-outline-danger btn-sm"
                              onClick={this.handleRemoveSpecificRow(fileInfos[idx].name)}
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
                    {this.state.editMode.status ? (
                      <div>
                        {currentFile && (
                          <div className="progress">
                            <div
                              className="progress-bar progress-bar-info progress-bar-striped"
                              role="progressbar"
                              aria-valuenow={progress}
                              aria-valuemin="0"
                              aria-valuemax="100"
                              style={{ width: progress + "%" }}
                            >
                              {progress}%
                            </div>
                          </div>
                        )}
                        {/* <button onClick={this.handleAddRow} className="btn btn-primary">
                        Add Row
                      </button> */}

                        <label htmlFor="actual-btn" className="btn btn-outline-primary" >เพิ่มรูปภาพโฆษณา โปรโมชั่น</label>
                        <input type="file" id="actual-btn" onChange={this.selectFile} hidden />
                        <span id="file-chosen" style={{ marginRight: "15%", marginLeft: "0.5rem" }} >{this.state.fileNameforShow}</span>


                        <button
                          className="btn btn-primary btn-lg"
                          disabled={!selectedFiles}
                          onClick={this.upload}
                        >
                          Upload
                    </button>

                        <button
                          style={{ marginLeft: "10px" }}
                          className={"btn btn-success btn-lg"}
                          onClick={this.handleSave}
                        >
                          Save
                            </button>
                      </div>
                    ) : (
                        <button
                          style={{ marginRight: "10px", float: "left" }}
                          className={"btn btn-outline-primary btn-sm"}
                          onClick={this.handleEdit()}
                        >
                          เพิ่มรูปภาพโปรโมชั่น
                        </button>
                      )}

                    {/* <div className="alert alert-light" role="alert">
                      {message}
                    </div> */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* <div className="card">
        <div className="card-header">List of Files</div>
        <ul className="list-group list-group-flush">
          {fileInfos &&
            fileInfos.map((file, index) => (
              <li className="list-group-item" key={index}>
                <a href={file.url}>{file.name}</a>
              </li>
            ))}
        </ul>
      </div> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(PromoImgManage)
