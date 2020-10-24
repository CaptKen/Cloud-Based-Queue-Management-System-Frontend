import Axios from 'axios';
import React, { Component } from 'react';
import axios from 'axios';

class Admin extends Component {
    callAPI = () => {
        axios.get('http://localhost:8080/getqueue')
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentWillMount() {
        this.callAPI();
    }
    render() {
        return (
            <div className="container">
                <div className="card text-center">
                    <div className="card-header">
                        คิวปัจจุบัน
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">ข้อมูลคิว</h5>
                        <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit eum quod repudiandae assumenda amet, recusandae eaque optio. Molestias sapiente minus dolorum sunt facere, nemo numquam autem enim veniam laboriosam necessitatibus.</p>
                        <div>
                            <button type="button" className="btn btn-success">รับคิว</button>
                            <button type="button" className="btn btn-danger" style={{
                                marginLeft: 10
                            }}>ยกเลิกคิว</button>
                        </div>
                    </div>
                </div>
                <br />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>
                                <div>
                                    <button type="button" className="btn btn-success">รับคิว</button>
                                    <button type="button" className="btn btn-danger" style={{
                                        marginLeft: 10
                                    }}>ยกเลิกคิว</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>
                                <div>
                                    <button type="button" className="btn btn-success">รับคิว</button>
                                    <button type="button" className="btn btn-danger" style={{
                                        marginLeft: 10
                                    }}>ยกเลิกคิว</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>
                                <div>
                                    <button type="button" className="btn btn-success">รับคิว</button>
                                    <button type="button" className="btn btn-danger" style={{
                                        marginLeft: 10
                                    }}>ยกเลิกคิว</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Admin;