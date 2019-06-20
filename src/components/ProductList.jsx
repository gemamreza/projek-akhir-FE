import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import './../support/product.css';
import { connect} from 'react-redux';
import {cartCount} from './../1.actions/cartCount';
import './../support/style.css';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
const formatCurrency = require('format-currency');


class ProductList extends Component {
    state = {productList : [], category : '', filterNama : '', from : 0, to : 999999999}

    componentDidMount() {
        this.getDataProduct()
        this.getName()
        this.getDataUrl()
    }

    getDataProduct = () => {
        var id = this.props.match.params.id
        Axios.get('http://localhost:2000/product/productlist/' + id )
        .then((res) => {
            this.setState({productList : res.data})
        })
        .catch((err) => console.log(err))
    }
        
    getName = () => {
        var id = this.props.match.params.id
        Axios.get('http://localhost:2000/product/productlist/' + id )
        .then((res) => {
            this.setState({category : res.data[0].category})
        })
        .catch((err) => console.log(err))
    }

    onBtnFind = () => {
        this.pushUrl()
        var search = this.refs.search.value
        this.setState({filterNama : search.toLowerCase()})
    }

    renderProduct = () => {
        var filter = this.state.productList.filter((val) => {
            return (val.nama.toLowerCase().startsWith(this.state.filterNama))
            && (val.harga >= this.state.from && val.harga <= this.state.to)
        })

        var render = filter.map((val) => {
            return (
                <div className="card col-md-3 mr-3 mt-3 mb-3 mytable" style={{width: '18rem'}}>
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

    getDataUrl = () => {
        var obj = queryString.parse(this.props.location.search)
        if(obj.name){
            this.setState({filterNama : obj.name})
        }
        if(obj.from){
            this.setState({from : obj.from})
        }
        if(obj.to){
            this.setState({to : obj.to})
        }
      }

    pushUrl = () => {
        var id = this.props.match.params.id
        var newLink = `/productlist/${id}`
        var params = []
        if(this.refs.search.value){
            params.push({
                params : 'name',
                value : this.refs.search.value
            })
        }
        if(this.refs.from.value){
            params.push({
                params : 'from',
                value : this.refs.from.value
            })
        }
        if(this.refs.to.value){
            params.push({
                params : 'to',
                value : this.refs.to.value
            })
        }
        for(var i = 0; i < params.length; i++){
            if(i === 0){
                newLink += '?' + params[i].params + '=' + params[i].value
            } else {
                newLink += '&' + params[i].params + '=' + params[i].value
            }
        }
        this.props.history.push(newLink)
    }

    render() {
        return (
            <div className="container" style={{minHeight :'365px'}}>
                <div className="row justify-content-center">
                    <h1 style={{fontWeight:500, fontFamily : 'Raleway, sans-serif', fontSize:'48px', marginTop : '20px'}}>{this.state.category}</h1>
                    <hr style={{height:'0.5px'}}></hr>
                </div>
               
                <div className="row justify-content-start mt-3 mb-3">
                    <p style={{fontSize:'12px', marginTop : '10px', marginRight:'2px'}}> Show items priced from IDR : </p> <input type="number" className="form-control mr-2" ref='from' placeholder="Start From IDR" style={{width:'10rem'}}
                    onChange={ () => {
                        this.pushUrl()
                        this.setState({from : this.refs.from.value})}}/>
                    <p style={{fontSize:'12px', marginTop : '10px', marginRight:'2px'}}> To IDR : </p><input type="number" className="form-control mr-2" placeholder="To IDR" ref='to' style={{width:'10rem'}}
                    onChange={ () => {
                        this.pushUrl() // eslint-disable-next-line
                        this.setState({to : this.refs.to.value === '' ? this.state.to = 999999999 : this.refs.to.value})}} />
                    <input type="text" className="form-control" style={{width:'20rem'}} placeholder="Search Product By Name" ref='search'/> 
                    <i class="fas fa-search ml-2 mt-2 pointer" onClick={this.onBtnFind} style={{fontSize : '20px'}}></i>
                </div>

                <div className="row justify-content-center">
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
export default withRouter(connect(mapStateToProps,{cartCount})(ProductList));