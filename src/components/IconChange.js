import React, { Component } from "react";
import businessService from '../services/business.service';
import { connect } from "react-redux";

class IconChange extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: '',
            imagePreviewUrl: '',
            businessName: '',
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            fileInfo: {},
            edit: false,
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            fileNameforShow: 'No file chosen',
            fileInfos: []
        };
    }
    // _handleSubmit(e) {
    //     e.preventDefault();
    //     // TODO: do something with -> this.state.file
    //     console.log('handle uploading-', this.state.file);
    // }

    selectFile(event) {
        console.log("event.target.files", event.target.files[0].name);
        this.setState({
            selectedFiles: event.target.files,
            fileNameforShow: event.target.files[0].name
        });
    }

    handleUploadInput = () => {
        const actualBtn = document.getElementById('actual-btn');
        const fileChosen = document.getElementById('file-chosen');
    
        actualBtn.addEventListener('change', function () {
          fileChosen.textContent = this.files[0].name
        })
      }

    handleImageChange(e) {
        e.preventDefault();
        console.log("event.target.files", e.target.files[0].name);
        this.setState({
            selectedFiles: e.target.files,
            fileNameforShow: e.target.files[0].name
        });
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    componentDidMount() {
        // this.callAPI();
        const user = this.props.user;
        console.log(user.businessName);
        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
                businessName: user.businessName
            });
            businessService.getIconImg(user.businessName)
                .then((res) => {
                    console.log(res.data[0]);
                    this.setState({
                        fileInfo: res.data[0]
                    })
                })
        }
    }

    handleEditMode = () => {
        this.setState({
            edit: true
        })
    }

    handleEditSave = () => {
        let currentFile = this.state.selectedFiles[0];
        this.setState({
            progress: 0,
            currentFile: currentFile,
          });
          
        businessService.deleteIconImg(this.state.businessName)
            .then((res) => {
                console.log(res.data);
                businessService.upLoadIconImg(currentFile, (event) => {
                    this.setState({
                      progress: Math.round((100 * event.loaded) / event.total),
                    });
                  }, this.state.businessName)
                    .then((response) => {
                      this.setState({
                        message: response.data.message,
                        fileNameforShow: 'No file chosen'
                      });
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
                this.setState({
                    edit: false
                })
            })

    }



    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img className="img-responsive" alt={this.state.fileInfo.name + "'s icon"} src={imagePreviewUrl} style={{
                height: "200px", width: "200px", display: "block",
                marginLeft: "auto", marginRight: "auto"
            }} />);
        } else {
            $imagePreview = (<img
                className="img-responsive"
                src={this.state.fileInfo.url}
                alt={this.state.fileInfo.name + "'s icon"}
                style={{
                    height: "200px", width: "200px", display: "block",
                    marginLeft: "auto", marginRight: "auto"
                }}
            />);
        }

        return (
            <div className="previewComponent">

                <div style={{ textAlign: "center" }}>
                    <div className="imgPreview" >
                        {$imagePreview}
                    </div>
                    {this.state.edit === false ? (
                        <>
                            <button className="btn btn-warning btn-sm" onClick={this.handleEditMode} style={{ margin: "3%" }}>
                                แก้ไขรูปร้าน
                        </button>
                        </>
                    ) : (
                            <>
                                <input className="fileInput" id="actual-btn" type="file" onChange={(e) => this.handleImageChange(e)} />
                                <button className="btn btn-success btn-sm" onClick={this.handleEditSave} style={{ margin: "3%" }}>
                                    Save
                        </button>
                            </>
                        )}

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(IconChange);