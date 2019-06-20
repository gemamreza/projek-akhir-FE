import React, { Component } from 'react';
import Axios from 'axios';
import './../../support/style.css';
import {connect} from 'react-redux';
import sweet from 'sweetalert';
import Page404 from './../PageNotFound';

class ManageCategory extends Component {
    state = {category :  [], edit : 0}

    componentDidMount(){
        this.getCategory()
    }

    getCategory = () => {
        Axios.get('http://localhost:2000/product/category')
        .then((res) => {
            this.setState({category : res.data})
        })
        .catch((err) => console.log(err))
    }

    onBtnSave = (id) => {
        var data = {
             category : this.refs.editCat.value
        }
        Axios.put('http://localhost:2000/product/editcat/' + id, data)
        .then((res)=> {
            sweet('Success',res.data,'success')
            this.getCategory()
            this.setState({edit : 0})
        })
        .catch((err) => console.log(err))
    }

    renderCategory = () => {
        var renderCat = this.state.category.map((val)=> {
            return <option value={val.id}>{val.category}</option>
        })
        return renderCat
    }

    renderCategoryTable = () => {
        var renderCat = this.state.category.map((val, index) => {
            if(this.state.edit !== val.id) {
            return (
                <tr>
                <td>{index+1}</td>
                <td>{val.category}</td>
                <td>
                    <input type="button" value="Delete" onClick={() => this.onBtnCatDelete(val.id)} className="btn btn-danger mr-3" />
                    <input type="button" value="Edit" onClick={() => this.setState({edit : val.id})} className="btn btn-info" />
                </td>
                </tr>
            )
            }       
            return (
                <tr>
                <td>{index+1}</td>
                <td><input type="text" ref="editCat" className="form-control" defaultValue={val.category}/></td>
                <td>
                    <input type="button" value="Cancel" onClick={() => this.setState({edit : 0})} className="btn btn-danger mr-3" />
                    <input type="button" value="Save" onClick={() => this.onBtnSave(val.id)} className="btn btn-info" />
                </td>
                </tr>
            )     
        })
        return renderCat
    }

    onBtnCatDelete = (id) => {
        Axios.delete('http://localhost:2000/product/deletecat/' + id)
        .then((res) => {
            sweet('Success',res.data,'success')
            this.getCategory()
        })
        .catch((err) => console.log(err))
    }

    addCatBtnClick = () => {
        var data = {
            category :  this.refs.tambahKategori.value
        }
       Axios.post('http://localhost:2000/product/addcategory', data)
       .then((res) => {
            sweet('Success',res.data,'success')
            this.getCategory()
            this.refs.tambahKategori.value = ''
       })
       .catch((err) => console.log(err))
    }

    render() {
        if(this.props.role === 'admin'){
            return (
                <div className="container" style={{minHeight : '360px'}}>
                    <div className="md-form mt-3">
                        <center><h3>Manage Category</h3></center>
                        <div className="row justify-content-center">
                        <table className="table mytable" style={{width : '40rem'}}>
                            <tr>
                                <td>No.</td>
                                <td>Kategori</td>
                                <td>ACT</td>
                            </tr>
                            {this.renderCategoryTable()}
                        </table>
                        </div>
                        <div className="row justify-content-center">
                        <div className='md-from mt-3'>
                        <input type="text" className="form-control" ref="tambahKategori" placeholder="Kategori" style={{width : '30rem'}} />
                        <center><input type="button" value="ADD" className="btn btn-primary mt-2" onClick={this.addCatBtnClick} /></center>
                        </div>
                        </div>
                    </div>
                </div>
            );
        } return <Page404 />
       
    }
}

const mapStateToProps = (state) => {
    return {
        role : state.user.role
    }
}
export default connect (mapStateToProps)(ManageCategory);