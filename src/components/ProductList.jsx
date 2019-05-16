import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import './../support/product.css';
import { connect} from 'react-redux';
import {cartCount} from './../1.actions/cartCount';
import './../support/style.css';
const formatCurrency = require('format-currency');



class ProductList extends Component {
    state = {productList : [], category : []}

    componentDidMount() {
        this.getDataProduct()
    }

    getDataProduct = () => {
        var id = this.props.match.params.id
        Axios.get('http://localhost:2000/product/productlist/' + id )
        .then((res) => {
            this.setState({productList : res.data})
        })
        .catch((err) => console.log(err))
    }
        

    renderProduct = () => {
        var render = this.state.productList.map((val) => {
            return (
                <div className="card col-md-3 mr-5 mt-3 mytable" style={{width: '18rem'}}>
                    <Link to={'/productdetail/' + val.id}><img className="card-img-top img" height='200px' src={'http://localhost:2000/' + val.img} alt="Card"  /></Link>
                    {   
                        val.diskon > 0 ?
                        <div className='discount'>{val.diskon}%</div>
                        : null
                    }
                    <div className="card-body">
                    <h4 className="card-text">{val.nama}</h4>

                    {
                        val.diskon > 0 ?
                        <p className="card-text" style={{textDecoration:'line-through',color:'red',display:'inline'}}>Rp. {formatCurrency(val.harga)}</p>
                        : null
                    }

                    <p style={{ fontWeight:'500'}}>Rp. {formatCurrency(val.harga - (val.harga*(val.diskon/100)))}</p>
                    </div>
                </div>
                
            )
        })
        return render
    }

    render() {
        return (
            <div className="container" style={{minHeight :'350px'}}>
                <div className="row justify-content-center">
                    <center><h1 style={{fontWeight:500}}>PRODUK</h1></center>
                    <hr style={{height:'0.5px'}}></hr>
                    {this.renderProduct()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        id : state.user.id,
        username : state.user.username
    }
}
export default connect (mapStateToProps,{cartCount})(ProductList);