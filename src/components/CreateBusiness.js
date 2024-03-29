import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { clearMessage, setMessage } from "../actions/message";
import { connect } from "react-redux";
import { registerManager } from "../actions/auth";
import { Modal, Button, Container, Spinner } from "react-bootstrap";
import businessService from "../services/business.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        กรุณากรอกข้อมูล!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        อีเมลไม่ถูกต้อง!
      </div>
    );
  }
};

const requiredPic = () => {

  return (
    <div className="alert alert-danger" role="alert">
      กรุณากรอกข้อมูล!
    </div>
  );

};




class CreateBusiness extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangebranch = this.onChangebranch.bind(this);
    this.onChangelat = this.onChangelat.bind(this);
    this.onChangelng = this.onChangelng.bind(this);
    this.onChangebusinessName = this.onChangebusinessName.bind(this);
    this.onChangeCatagory = this.onChangeCatagory.bind(this);
    this.isShowLoading = this.isShowLoading.bind(this);
    this.selectFile = this.selectFile.bind(this);
    // this.upload = this.upload.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      businessName: "",
      branch: "",
      lat: "",
      lng: "",
      successful: false,
      listCatagoriesDropdown: [''],
      catagory: '',
      file: '',
      imagePreviewUrl: '',
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      fileNameforShow: 'No file chosen',
      fileInfos: [],
      isShowLoading: false,
      show: false,
      disabledbtn: true
    };
  }

  selectFile(event) {
    console.log("event.target.files", event.target.files[0].name);
    this.setState({
      selectedFiles: event.target.files,
      fileNameforShow: event.target.files[0].name
    });
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  // upload() {
  //   let currentFile = this.state.selectedFiles[0];
  //   this.setState({
  //     progress: 0,
  //     currentFile: currentFile,
  //   });


  // }

  handleUploadInput = () => {
    const actualBtn = document.getElementById('actual-btn');
    const fileChosen = document.getElementById('file-chosen');

    actualBtn.addEventListener('change', function () {
      fileChosen.textContent = this.files[0].name
    })
  }

  dropdown = () => {
    businessService.listCatagories()
      .then((res) => {
        console.log(res.data.listCatagories);
        this.setState({
          listCatagoriesDropdown: res.data.listCatagories,
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }
  componentDidMount() {
    this.onChangePassword();
    this.dropdown();
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangebusinessName(e) {
    this.setState({
      businessName: e.target.value,
    });
  }

  onChangebranch(e) {
    this.setState({
      branch: e.target.value,
    });
  }

  onChangelat(e) {
    this.setState({
      lat: e.target.value,
    });
  }

  onChangelng(e) {
    this.setState({
      lng: e.target.value,
    });
  }

  onChangeCatagory(e) {
    this.setState({
      catagory: e.target.value,
    });
  }
  onChangePassword() {
    const generator = require('generate-password');
    const passwordAutoGen = generator.generate({
      length: 10,
      numbers: true,
      lowercase: true,
      uppercase: true
    });
    this.setState({
      password: passwordAutoGen,
    });
    console.log(this.state.password);
  }

  isShowLoading(e) {
    e.preventDefault();
    this.props.dispatch(clearMessage()); // clear message when changing location
    if (this.state.username === "" || this.state.email === "" || this.state.businessName === "" || this.state.branch === "" || this.state.lat === "" || this.state.lng === "" || this.state.catagory === "" || this.state.catagory === "กรุณาเลือกประเภทสถานที่") {
      this.props.dispatch(setMessage("กรุณากรอกข้อมูลให้ครบ"));
    } else if (this.state.selectedFiles === undefined && this.state.currentFile === undefined) {
      this.props.dispatch(setMessage("กรุณาใส่รูปภาพร้าน"));
      console.log("false")
      // this.setState({
      //   show: true,
      // });
      // return;
    }else if (this.state.selectedFiles !== undefined) {
      let currentFile = this.state.selectedFiles[0];
      this.setState({
        disabledbtn: false,
        progress: 0,
      currentFile: currentFile,
      })
    }else{
      this.setState({
        disabledbtn: false,
    })
  }
    this.setState({
      isShowLoading: true,
    })
  }

  handleRegister(e) {
    e.preventDefault();
    //บัคอยู่ตรงนี้ this.state.selectedFiles[0] ต้องอัพรูปก่อน
    this.onChangePassword();

    this.setState({
      successful: false,
      isLoading: true
    });
    this.form.validateAll();
    console.log(this.state.password);
    console.log(this.state.catagory === "");
    console.log("this.checkBtn.context._errors.length: ", this.checkBtn.context._errors.length);
    // if (this.state.catagory === "") {
    //   alert("กรุณาเลือกประเภทสถานที่");
    // }

    // else 
    if (this.checkBtn.context._errors.length === 0) {
      this.setState({
        isLoading:true
      });
      this.props
        .dispatch(
          registerManager(this.state.username, this.state.email, this.state.password, this.state.businessName, this.state.branch, this.state.catagory, this.state.lat, this.state.lng)
        )
        .then(() => {
          this.setState({
            successful: true,
            isLoading:true
          });
          businessService.upLoadIconImg(this.state.currentFile, (event) => {
            this.setState({
              progress: Math.round((100 * event.loaded) / event.total),
            });
          }, this.state.businessName)
            .then((response) => {
              this.setState({
                message: response.data.message,
                fileNameforShow: 'No file chosen'
              });
              window.location.reload();
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
        })
        .catch(() => {
          this.setState({
            successful: false,
            isLoading: false,
          });
        });

      this.setState({
        selectedFiles: undefined,
        isLoading: false,
      });
    }

  }


  handleClose = (e) => {
    this.props.dispatch(clearMessage()); // clear message when changing location
    this.setState({
      show: false,
      successful: false,
      isShowLoading: false
    });
  };

  render() {
    const { message } = this.props;
    const { listCatagoriesDropdown,
      selectedFiles,
      currentFile,
      progress,
      fileInfos,
      isLoading } = this.state;
    console.log(listCatagoriesDropdown);
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img className="img-responsive" src={imagePreviewUrl} style={{
        height: "200px", width: "200px", display: "block",
        marginLeft: "auto", marginRight: "auto"
      }} />);
    }
    return (
      <Container className="d-flex" style={{ justifyContent: "center", fontFamily: "'Kanit', sans-serif;" }}>

        <div className="col-md-5">
          {/* <h1 className="text-center">Sign Up</h1> */}
          <h1 className="h1 text-center">Create Business</h1>
          <div>
            <Form
              onSubmit={this.isShowLoading}
              ref={(c) => {
                this.form = c;
              }}
            >

              <div>
                <div className="form-group">
                  <div className="imgPreview" >
                    {$imagePreview}
                  </div>
                  <label htmlFor="actual-btn" className="btn btn-outline-primary" >เพิ่มรูปร้าน</label>
                  <input type="file" id="actual-btn" onChange={this.selectFile} validations={[requiredPic]} hidden />
                  <span id="file-chosen" style={{ marginRight: "15%", marginLeft: "0.5rem" }} >{this.state.fileNameforShow}</span>

                  {/* <button
                      className="btn btn-primary btn-md"
                      disabled={!selectedFiles}
                      onClick={this.upload}>
                      Upload
                    </button> */}

                </div>
                <div className="form-group">
                  <label htmlFor="username">ชื่อผู้ใช้งาน*</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">อีเมลล์*</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="businessName">ชื่อร้าน</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="businessName"
                    value={this.state.businessName}
                    onChange={this.onChangebusinessName}
                    validations={[required]}
                    maxLength={100}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="branch">สาขา</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="branch"
                    value={this.state.branch}
                    onChange={this.onChangebranch}
                    validations={[required]}
                    maxLength={100}
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="lat">ละติจูดตำแหน่งร้าน</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="lat"
                    value={this.state.lat}
                    onChange={this.onChangelat}
                    validations={[required]}
                    maxLength={100}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lng">ลองจิจูดตำแหน่งร้าน</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="lng"
                    value={this.state.lng}
                    onChange={this.onChangelng}
                    validations={[required]}
                    maxLength={100}
                  />
                </div>

                <div className="form-group" name="branch">
                  <label htmlFor="catagory">ประเภทร้าน</label>
                  <select onChange={this.onChangeCatagory} className="form-control">
                    <option selected value="กรุณาเลือกประเภทสถานที่">กรุณาเลือกประเภทสถานที่</option>
                    {listCatagoriesDropdown.map((item) => (
                      <option value={item.categories_name} >{item.categories_name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block" style={{ backgroundColor: "#b38f2d", borderColor: "#b38f2d" }}>สร้างร้าน</button>
                </div>
              </div>

              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
              {/* <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>แจ้งเตือน</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ alignSelf: "center" }}>
                  กรุณาใส่รูปภาพร้าน
                </Modal.Body>
                {message && (
                  <div className="form-group">
                    <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                      {message}
                    </div>
                  </div>
                )}
                <Modal.Footer>
                  <Button variant="danger" onClick={this.handleClose}>
                    ปิด
              </Button>
                </Modal.Footer>
              </Modal> */}

              <Modal show={this.state.isShowLoading} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>ยืนยันการสร้างร้าน ?</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ alignSelf: "center" }}>
                  {isLoading ? (
                    <Spinner className="m-3" animation="border" style={{ alignSelf: "center" }} variant="primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : (
                    message ? (
                      <div className="form-group">
                        <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                          {message}
                        </div>
                      </div>
                    ) : (
                      "ต้องการสร้างร้านใช่หรือไม่ ?"
                    )
                  )}
                </Modal.Body>
                <Modal.Footer>
                  {isLoading ? (
                    <>
                      <Button variant="success" onClick={this.handleRegister} disabled>
                        ยืนยัน
                    </Button>
                      <Button variant="danger" onClick={this.handleClose} disabled>
                        ปิด
                    </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="success" onClick={this.handleRegister} disabled={this.state.disabledbtn}>
                        ยืนยัน
                      </Button>
                      <Button variant="danger" onClick={this.handleClose}>
                        ปิด
                      </Button>
                    </>
                  )}

                </Modal.Footer>
              </Modal>
            </Form>
          </div>
        </div>
      </Container>

    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(CreateBusiness);