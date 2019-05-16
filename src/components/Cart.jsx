import React, { Component } from 'react';
import Axios from 'axios';
import {cartCount} from './../1.actions';
import {connect} from 'react-redux';
import FormatCurrency from 'format-currency';
import cookie from 'universal-cookie';
import {Link} from 'react-router-dom';
import './../support/style.css';
const objCookie = new cookie()
   
class Cart extends Component {
    state = {cart : [], selectedEdit : 0}

    componentDidMount(){
        this.getCartApi()
    }

    getCartApi = () => {
        var getCookie = objCookie.get('userData')
        Axios.get('http://localhost:2000/product/getcart?username=' + getCookie)
        .then((res) => {
            this.setState({cart : res.data})
        })
        .catch((err) => console.log(err))
    }

    onBtnSave = (id) => {
        var newData = {
            qty : this.refs.editQty.value
        }
        Axios.put('http://localhost:2000/product/editcart/' + id, newData)
        .then((res) => {
            alert(res.data)
            this.getCartApi()
            this.setState({selectedEdit : 0})
        })
        .catch((err) => console.log(err))
    }

    onBtnDelete = (id) => {
        Axios.delete('http://localhost:2000/product/deletecart/' + id )
        .then((res) => {
            alert(res.data)
            this.getCartApi()
            this.props.cartCount(this.props.username)
        })
        .catch((err) => console.log(err))
    }

    qtyValidation =() => {
        var qty = this.refs.editQty.value
        if(qty < 1) {
            this.refs.editQty.value = 1
        }
    }

    totalBelanja = () => {
        var sum = 0
        for(var i = 0 ; i< this.state.cart.length ; i ++){
        sum+= ((this.state.cart[i].harga - (this.state.cart[i].harga*(this.state.cart[i].diskon/100)))*this.state.cart[i].qty)
        }
        return sum
    }

    onBtnCheckOut = () => {
        Axios.post('http://localhost:2000/product/checkout', {username : this.props.username, total : this.totalBelanja()})
        .then((res) => {
            alert(res.data)
            this.getCartApi()
            this.props.cartCount(this.props.username)
        })
        .catch((err) => console.log(err))
    }

    renderCart = () => {
        var render = this.state.cart.map((val, index) => {
            if(this.state.selectedEdit !== val.id){
                return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{val.nama}</td>
                        <td>{FormatCurrency(val.harga)}</td>
                        <td>{val.diskon}</td>
                        <td>{val.qty}</td>
                        <td>
                            <input type="button" value="EDIT" onClick={ () => this.setState({selectedEdit : val.id})} className="btn btn-info" />
                            <input type="button" value="DELETE" onClick={ () => this.onBtnDelete(val.id)} className="btn btn-danger" />
                        </td>
                    </tr>
                   
                )
            }
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{val.nama}</td>
                    <td>{FormatCurrency(val.harga)}</td>
                    <td>{val.diskon}</td>
                    <td><input type="number" defaultValue={val.qty} style={{width : '5rem' }} ref="editQty" className="form-control" onChange={this.qtyValidation}/></td>
                    <td>
                        <input type="button" value="SAVE" onClick={ () => this.onBtnSave(val.id)}  className="btn btn-success" />
                        <input type="button" value="CANCEL" onClick={ () => this.setState({selectedEdit : 0})}  className="btn btn-danger" />
                    </td>
                </tr>
            )
        })
        return render
    }
    render() {
        if(this.props.username !== "" && this.state.cart.length > 0){
            return (
                <div className="container" style={{minHeight:'360px'}}>
                    <table className="table mytable mt-5">
                    <tr>
                        <td>NO</td>
                        <td>Nama Produk</td>
                        <td>Harga</td>
                        <td>Diskon</td>
                        <td>Quantity</td>
                        <td colSpan="2">ACT</td>
                    </tr>
                    {this.renderCart()}
                    <tr>
                        <td colSpan='7'>
                            <h4>Total Belanja : Rp {FormatCurrency(this.totalBelanja())}</h4>
                        </td>
                    </tr>
                    </table>
                    <div>
                        <center>
                                <input type="button" value="Check Out" onClick={this.onBtnCheckOut} className="btn btn-warning" />
                        </center>
                    </div>
                </div>
            );
        } 
        return (
            <div className="container" style={{minHeight:'365px'}}>
                <div class="alert alert-danger mt-5" role="alert">
                   <center>Your Cart is Empty. <Link to="/" class="alert-link">Go Shopping</Link></center>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        username : state.user.username,
        count : state.cart.count
    }
}

export default connect (mapStateToProps,{cartCount})(Cart)