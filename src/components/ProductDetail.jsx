import React, { Component } from 'react';
import Axios from 'axios';
import {LoginAction} from './../1.actions/userAction';
import {cartCount} from './../1.actions/cartCount';
import {connect} from 'react-redux';
import nl2br from 'react-nl2br';
import FormatCurrency from 'format-currency';
import sweet from 'sweetalert';

class ProductDetail extends Component {
    state = {product : []}

    componentDidMount(){
        this.getDataProduct()
    }

    getDataProduct = () => {
        var id = this.props.match.params.id
        Axios.get('http://localhost:2000/product/productdetail/' + id)
        .then((res) => this.setState({product : res.data}))
        .catch((err) => console.log(err))
    }
    
    qtyValidation =() => {
        var qty = this.refs.inputQty.value
        if(qty < 1) {
            this.refs.inputQty.value = 1
        }
    }

    onBtnAddProduct = () => {
        var newData = {
            username : this.props.username,
            id_produk : this.state.product[0].id,
            qty : parseInt(this.refs.inputQty.value)
        }
        Axios.post('http://localhost:2000/product/addcart', newData)
        .then((res) => {
            sweet('Add To Cart',res.data,'success')
            this.props.cartCount(this.props.username)
        })
        .catch((err) => console.log(err))
    }

    renderProduct = () => {
        var render = this.state.product.map((val) => {
           
            return (
            <div className='row'>
                <div className='col-md-4'>
                <div className="card" style={{width: '100%'}}>
                    <img className="card-img-top" src={'http://localhost:2000/' + val.img} alt="Product" />
                    <div className="card-body">
                    </div>
                </div>
                </div>

                <div className='col-md-8'>
                    <h1 style={{color:'#4C4C4C'}}>{val.nama}</h1>
                    <div style={{backgroundColor:'#D50000',
                                 width:"50px",
                                 height:'22px',
                                 color : 'white',
                                 textAlign:'center',
                                 display:'inline-block'}} >
                        {val.diskon}%
                    </div>
                    <span style={{fontSize:'12px',
                                  fontWeight:'600',
                                  color:'#606060',
                                  marginLeft:'10px',
                                  textDecoration:'line-through'}}> Rp. {FormatCurrency(val.harga)} </span>

                    <div style={{fontSize:'24px',
                                 fontWeight : '700',
                                 color:'#FF5722',
                                 marginTop:'20px'}}>Rp. {FormatCurrency(val.harga - (val.harga * (val.diskon/100)))}</div>

                    <div className='row'>
                        <div className='col-md-2'>
                            <div style={{marginTop:'15px',
                                    color:'#606060',
                                    fontWeight:'700',
                                    fontSize:'14px'}}>Jumlah</div>
                            <input type='number' onChange={this.qtyValidation} ref='inputQty' defaultValue={1} min={1} className='form-control' style={{width : '60px',
                                                                                          marginTop:'10px'}} />
                        </div>
                        <div className='col-md-6'>
                            <div style={{marginTop:'15px',
                                        color:'#606060',
                                        fontWeight:'700',
                                        fontSize:'14px'}}>
                                         <p>{nl2br(val.spesifikasi)}</p>
                            </div>
                           
                        </div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-md-8'>
                            <p style={{color:'#606060',fontStyle:'italic'}}>{val.deskripsi}</p>
                        </div>

                    </div>
                    {this.props.username === "" || this.props.role === 'admin'
                    ?
                        <div className='row mt-4'>
                            <input type='button' disabled className='btn btn-success col-md-3' style={{marginLeft : "10px"}} value='Masukan Ke Keranjang' />
                        </div>
                    :
                        <div className='row mt-4'>
                            <input type='button' className='btn btn-success col-md-3' style={{marginLeft : "10px"}} onClick={this.onBtnAddProduct} value='Masukan Ke Keranjang' />
                        </div>
                    }
                    
                </div>
            </div>
            )
        })
        return render
    }

    render() {
        console.log(this.state.product)
        return (
            <div className='container'>
                {this.renderProduct()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
   return{
        username : state.user.username,
        role : state.user.role
    }
}
   
export default connect (mapStateToProps,{LoginAction, cartCount})(ProductDetail);