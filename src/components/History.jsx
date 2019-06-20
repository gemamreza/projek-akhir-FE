import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import Currency from 'format-currency';
import Cookie from 'universal-cookie';
import PageNotFound from './PageNotFound';
import './../support/style.css';
import {Link} from 'react-router-dom';
import sweet from 'sweetalert';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';

const objCookie = new Cookie()
class History extends Component {
    state = {history : [], modal : false, detail: false, historydetail : [], tooltipOpen: false,
             status : [], selectStatus : 999}

    componentDidMount(){
        this.getDataApi()
        this.getStatus()
        this.getDataUrl()
    }

    toggle = () => {
        this.setState(prevState => ({
          modal : !prevState.modal,
          tooltipOpen: !this.state.tooltipOpen
        }));
      }

    getDataApi = () => {
        var cookie = objCookie.get('userData')
        Axios.get('http://localhost:2000/product/history?username=' + cookie)
        .then((res) => {
            this.setState({history : res.data})
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

    getDataUrl = () => {
        var obj = queryString.parse(this.props.location.search)
        if(obj.status){
            this.setState({selectStatus : obj.status})
        }
    }

    pushUrl = () => {
        var newLink = '/history'
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

    renderStatus = () => {
        var render = this.state.status.map((val) => {
            return (
                <option value={val.status}>{val.status}</option>
            )
        })
        return render
    }

    getDetail = (id) => {
        Axios.get('http://localhost:2000/product/historydetail/' + id)
        .then((res) => {
            this.setState({historydetail : res.data, detail : true})
        })
        .catch((err) => console.log(err))
    }

    onClickAlert = () => {
        sweet('ALERT','WAIT, THE TRANSACTION IS UNDER REVIEW', 'error')
    }

    renderHistory = () => {
        var filterStatus = this.state.history.filter((val) => {
            return ( // eslint-disable-next-line
                val.status == this.state.selectStatus || this.state.selectStatus > 5
            )
        })

        var render = filterStatus.map((val, index) => {
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{val.tanggal}</td>
                    <td>{val.status}</td>
                    <td>
                        <a href={'http://localhost:2000/' + val.bukti} target='_blank' rel="noopener noreferrer" title='Click To See Picture'>
                            <img src = {'http://localhost:2000/' + val.bukti} width = '50px' height = '50px' alt='bukti'/>
                        </a>
                    </td>
                    <td>Rp. {Currency(val.total)}</td>
                    <td>
                        <input type="button" value="DETAIL" className="btn btn-dark mr-2" onClick={() => this.getDetail(val.id) }/>
                        { val.status === 'UNPAID YET' || val.status === 'INVALID PAYMENT' ?
                        <Link to={'/payment/'+val.id}> <input type='button' value='UPLOAD'  className='btn btn-success mr-2'/></Link>
                        : val.status === 'ON PROSSES' ? <input type='button' value='UPLOAD'  className='btn btn-success mr-2' onClick={this.onClickAlert}/> 
                        : <input type='button' disabled value='UPLOAD'  className='btn btn-success mr-2'/>
                        }
                    </td>
                </tr>
            )
        })
        return render
    }

    renderHistoryDetail = () => {
        var render = this.state.historydetail.map((val, index) => {
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{val.nama}</td>
                    <td>{val.qty}</td>
                    <td>Rp. {Currency(val.total)}</td>
                </tr>
            )
        })
        return render
    }

    renderDetail = () => {
        var render = this.state.historydetail.map((val, index) => {
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{val.nama}</td>
                    <td>{val.qty}</td>
                    <td>Rp. {Currency(val.total)}</td>
                </tr>
            )
        })
        return render
    }

    render() {
        if(this.props.username){
        return (
            <div className="container mt-5" style={{minHeight:"365px"}}>
                <div className="row justify-content-end">
                 <select ref="dropdown" className="form-control mr-3 mb-3" style={{width : '18rem'}}
                        onChange={() => {
                            this.pushUrl()
                            this.setState({selectStatus : this.refs.dropdown.value})
                        }}>
                            <option value={999}>ALL STATUS</option>
                            {this.renderStatus()}
                </select>
                </div>
                <table className="table table-striped mytable">
                    <tr>
                        <td>NO</td>
                        <td>Tanggal/Waktu</td>
                        <td>Status</td>
                        <td>Bukti</td>
                        <td>Total</td>
                        <td>PAYMENT</td>
                    </tr>
                    {this.renderHistory()}
                </table>
                {
                    this.state.detail ? 
                <div>
                    <table className="table mytable">
                    <tr>
                        <td>No</td>
                        <td>Nama Produk</td>
                        <td>Qty</td>
                        <td>Harga/Pcs</td>
                    </tr>
                    {this.renderDetail()}
                    <tr>
                        <td colspan='4'>
                            <center>
                                <input type="button" className="btn btn-danger" value='CLOSE' onClick={ () => this.setState({detail : false})} />
                            </center>
                        </td>
                    </tr>
                    </table>
                </div>
                : null
                } 
            </div>
        );
        } return <PageNotFound />
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username
    }
}


export default connect (mapStateToProps)(withRouter(History));