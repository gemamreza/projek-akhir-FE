import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './../support/style.css';
import PageNotFound from './PageNotFound';
import sweet from 'sweetalert';

class PaymentConfirmation extends Component {
    state = {selectedFile : null, error : ""}

    valueHandler = () => {
        var value = this.state.selectedFile ? this.state.selectedFile.name : "Pick A Picture"
        return value
    }

    onChangeHandler = (event) => {
        this.setState({selectedFile : event.target.files[0]})
    }

    onBtnSave = () => {
        var id = this.props.match.params.id
        var fd = new FormData()
        fd.append('transaction', this.state.selectedFile)
        if(this.state.selectedFile === null) {
           sweet('ALERT','Data Tidak Boleh Kosong!','error')
        } else {
            Axios.put('http://localhost:2000/product/payment?id=' + id + '&username=' + this.props.user , fd)
            .then((res) => {
                if(res.data.error) {
                    this.setState({error : res.data.msg})
                } else {
                    if(res.data === 'Upload Bukti Pembayaran Berhasil'){
                        sweet('Success',res.data,'success')
                        this.refs.input.value = ''
                        this.setState({selectedFile : null, error : ''})
                    } else if(res.data === 'TRANSACTION HAS ALREADY DONE. THANK YOU!'){
                        sweet('ALERT',res.data,'error')
                    } else if(res.data === "YOU DON'T HAVE THIS TRANSACTION"){
                        sweet('ALERT',res.data,'error')
                    }  else {
                        sweet('ALERT',res.data,'error')
                    }          
                }
            })
            .catch((err) => console.log(err))
        }
    }

    renderErrorMessage = () => {
        if(this.state.error !== ""){
            return <div class="alert alert-danger mt-3" role="alert">
                        {this.state.error}
                    </div>
        }
    }

    render() {
        if(this.props.user){
        return (
            <div className="container mt-5 mb-5" style={{minHeight:'285px'}}>
                <div className="row justify-content-center">
                <div class="panel">
                    <div className="md-form">
                        <center><h1>PAYMENT</h1></center>
                        <h1>CONFIRMATION</h1>
                        <input style={{display :'none'}} ref='input' type='file' onChange={this.onChangeHandler}/>
                        <input className='form-control btn-success pointer' onClick={() => this.refs.input.click()} type='button' value={this.valueHandler()} style={{width : '20rem'}}/>
                    <div style={{marginTop : '20px'}}>
                        <Link to='/history'><input type="button" value="BACK TO HISTORY" className="btn btn-warning" /></Link>
                        <input type="button" value="SAVE" className="btn btn-primary" onClick={this.onBtnSave} style={{marginLeft : '5px', width :'10rem'}}/>
                    </div>
                    </div>
                    {this.renderErrorMessage()}    
                </div>
                </div>
            </div>
        );
        } return (
            <PageNotFound />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id : state.user.id,
        user : state.user.username
    }
}

export default connect (mapStateToProps)(PaymentConfirmation);