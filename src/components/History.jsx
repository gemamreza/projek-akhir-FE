import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import Currency from 'format-currency';
import Cookie from 'universal-cookie';
import PageNotFound from './PageNotFound';
import './../support/style.css';
import {Link} from 'react-router-dom';
import { Tooltip } from 'reactstrap';

const objCookie = new Cookie()
class History extends Component {
    state = {history : [], modal : false, detail: false, historydetail : [], tooltipOpen: false}

    componentDidMount(){
        this.getDataApi()
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

    getDetail = (id) => {
        Axios.get('http://localhost:2000/product/historydetail/' + id)
        .then((res) => {
            this.setState({historydetail : res.data, detail : true})
        })
        .catch((err) => console.log(err))
    }

    onClickAlert = () => {
        alert('WAIT, THE TRANSACTION IS UNDER REVIEW')
    }

    renderHistory = () => {
        var render = this.state.history.map((val, index) => {
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{val.tanggal}</td>
                    <td>{val.status}</td>
                    <td>
                        <a href={'http://localhost:2000/' + val.bukti} target='_blank' rel="noopener noreferrer" title='Click To See Picture'>
                            < img src = {'http://localhost:2000/' + val.bukti} width = '50px' alt='product'/>
                        </a>
                    </td>
                    <td>Rp. {Currency(val.total)}</td>
                    <td>
                        <input type="button" value="DETAIL" className="btn btn-dark" onClick={() => this.getDetail(val.id) }/>
                        { val.status === 'NOT YET PAID' ?
                        <Link to={'/payment/'+val.id}> <input type='button' value='Upload'  className='btn btn-success mr-2'/></Link>
                        : <input type='button' value='Upload'  className='btn btn-success mr-2' onClick={this.onClickAlert}/>  
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
                <table className="table table-striped mytable">
                    <tr>
                        <td>NO</td>
                        <td>Tanggal/Waktu</td>
                        <td>Status</td>
                        <td>Bukti</td>
                        <td>Total</td>
                        <td>ACT</td>
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


export default connect (mapStateToProps)(History);