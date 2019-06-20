import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import PageNotFound from './../PageNotFound';
import './../../support/style.css';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import formatCurrency from 'format-currency';
import sweet from 'sweetalert';

class ManageTransaksi extends Component {
    state = {data : [], status : [], selectStatus : 999}

    componentDidMount(){
        this.getData()
        this.getStatus()
        this.getDataUrl()
    }

    getData = () => {
        Axios.get('http://localhost:2000/product/transaction')
        .then((res) =>{
            this.setState({data : res.data})
        })
        .catch((err) => console.log(err))
    }

    onConfirm = (id) => {
        Axios.put('http://localhost:2000/product/updatestatus/' + id)
        .then((res) =>{
            sweet('Success',res.data,'success')
            this.getData()
        })
        .catch((err) => console.log(err))
    }

    onCancel = (id) => {
        Axios.put('http://localhost:2000/product/cancelstatus/' + id)
        .then((res) =>{
            sweet('Info',res.data,'success')
            this.getData()
        })
        .catch((err) => console.log(err))
    }

    getStatus = () => {
        Axios.get('http://localhost:2000/product/status')
        .then((res) => {
            this.setState({status : res.data})
        })
        .catch((err) => console.log(err))
    }
    
    renderStatus = () => {
        var render = this.state.status.map((val) => {
            return (
                <option value={val.status}>{val.status}</option>
            )
        })
        return render
    }
    
    getDataUrl = () => {
        var obj = queryString.parse(this.props.location.search)
        if(obj.status){
            this.setState({selectStatus : obj.status})
        }
    }

    pushUrl = () => {
        var newLink = '/managetransaksi'
        var params = []
        if(this.refs.dropdown.value){
            params.push({
                params : 'status',
                value : this.refs.dropdown.value
            })
        }
        for(var i = 0;  i < params.length; i++){
            if(i === 0){
                newLink += '?' + params[i].params + '=' + params[i].value
            }
        }
        this.props.history.push(newLink)
    }

    renderTransaksi = () => {
        var filterStatus = this.state.data.filter((val) => {
            return ( // eslint-disable-next-line
                val.status == this.state.selectStatus || this.state.selectStatus > 5
            )
        })

        var render = filterStatus.map((val, index) =>{
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{val.username}</td>
                    <td>{val.tanggal}</td>
                    <td>{val.status}</td>
                    <td> 
                        <a href={'http://localhost:2000/' + val.bukti} target='_blank' rel="noopener noreferrer" title='Click To Review'>
                            <img src = {'http://localhost:2000/' + val.bukti} width = '50px' alt='product'/>
                        </a>
                    </td>
                    <td>Rp. {formatCurrency(val.total)}</td>
                    <td>
                        {
                            val.status === 'ON PROSSES'  ?
                            <input type="button" value="CONFIRM" onClick={() => this.onConfirm(val.id)} className="btn btn-primary mr-2" /> :
                            val.status === 'TRANSACTION DONE' || val.status === 'INVALID PAYMENT' || val.status === 'UNPAID YET' ?
                            <input type="button" value="CONFIRM" disabled className="btn btn-dark mr-2" />
                            : null
                        } 
                        {
                            val.status === 'TRANSACTION DONE' || val.status === 'INVALID PAYMENT' || val.status === 'UNPAID YET' ?
                            <input type="button" value="REJECT" disabled className="btn btn-danger" />
                            : <input type="button" value="REJECT" onClick={() => this.onCancel(val.id)} className="btn btn-danger" />
                        }
                        
                    </td>
                </tr>
            )
        })
        return render
    }

    render() {
        if(this.props.role === 'admin'){
            return (
                <div className="container mt-3 mb-3" style={{minHeight: '365px'}}>
                    <div className="row justify-content-end">
                        <select ref="dropdown" className="form-control mr-3" style={{width : '18rem'}}
                        onChange={() => {
                            this.pushUrl()
                            this.setState({selectStatus : this.refs.dropdown.value})
                        }}>
                            <option value={999}>ALL STATUS</option>
                            {this.renderStatus()}
                        </select>
                    </div>
                    <table className="table mytable mt-3">
                        <tr>
                            <td>No.</td>
                            <td>Username</td>
                            <td>Tanggal</td>
                            <td>Status</td>
                            <td>Bukti</td>
                            <td>Total</td>
                            <td>ACT</td>
                        </tr>
                        {this.renderTransaksi()}
                    </table>
                </div>
            );
        } else {
            return <PageNotFound />
        }
        
    }
}

const mapStateToProps = (state) => {
    return {
        role : state.user.role
    }   
}

export default connect(mapStateToProps)(withRouter(ManageTransaksi));