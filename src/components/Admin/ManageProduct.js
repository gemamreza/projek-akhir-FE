import React from 'react';
import Axios from 'axios';
import nl2br from 'react-nl2br';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {LoginAction} from './../../1.actions/userAction';
import {connect} from 'react-redux';
import './../../support/style.css';
import PageNotFound from './../PageNotFound';

class ManageProduct extends React.Component {
    state = {product : [], category : [], selectedFile : null, error : "",
             modal : false, dataEdit : {}, selectedFileEdit : null, edit : 0}

    componentDidMount(){
        this.getDataProduct()
        this.getCategory()
    }

    valueHandler = () => {
        var value = this.state.selectedFile ? this.state.selectedFile.name : 'Pick A Picture'
        return value
    }

    onChangeHandler = (event) => {
         this.setState({selectedFile : event.target.files[0]})
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
            alert(res.data)
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
                <td>{val.category}</td>
                <td>
                    <input type="button" value="X" onClick={() => this.onBtnCatDelete(val.id)} className="btn btn-danger" />
                    <input type="button" value="E" onClick={() => this.setState({edit : val.id})} className="btn btn-info" />
                </td>
                </tr>
            )
            }       
            return (
                <tr>
                <td><input type="text" ref="editCat" className="form-control" defaultValue={val.category}/></td>
                <td>
                    <input type="button" value="C" onClick={() => this.setState({edit : 0})} className="btn btn-danger" />
                    <input type="button" value="S" onClick={() => this.onBtnSave(val.id)} className="btn btn-info" />
                </td>
                </tr>
            )     
        })
        return renderCat
    }

    onBtnCatDelete = (id) => {
        Axios.delete('http://localhost:2000/product/deletecat/' + id)
        .then((res) => {
            alert(res.data)
            this.getCategory()
        })
        .catch((err) => console.log(err))
    }

    onBtnAddProduct = () => {
        var data = {
            nama : this.refs.nama.value,
            id_kategori :  this.refs.kategori.value,
            deskripsi : this.refs.deskripsi.value,
            spesifikasi : this.refs.spesifikasi.value,
            harga : this.refs.harga.value,
            diskon : this.refs.diskon.value
        }
        var fd = new FormData()
        fd.append('image',this.state.selectedFile)
        fd.append('product' ,JSON.stringify(data))
        if(this.refs.nama.value === '' || this.refs.kategori.value === '' ||  this.refs.deskripsi.value === '' ||
        this.refs.spesifikasi.value === '' || this.refs.harga.value === '' || this.refs.diskon.value === '' ||
        this.state.selectedFile === null ){
            alert('Jangan Ada Data yang Kosong!')
        } else {
            Axios.post('http://localhost:2000/product/addproduct' , fd)
            .then((res) => {
            if(res.data.error){
            this.setState({error : res.data.msg})
            }else{
            alert(res.data)
            this.getDataProduct()
            this.refs.nama.value = ''
            this.refs.deskripsi.value = ''
            this.refs.spesifikasi.value = ''
            this.refs.harga.value = ''
            this.refs.diskon.value = ''
            this.setState({selectedFile : null, error : ''})
            }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    getDataProduct = () => {
        Axios.get('http://localhost:2000/product/allproduct')
        .then((res) => this.setState({product : res.data}))
        .catch((err) => console.log(err))
    }

    addCatBtnClick = () => {
        var data = {
            category :  this.refs.tambahKategori.value
        }
       Axios.post('http://localhost:2000/product/addcategory', data)
       .then((res) => {
            alert(res.data)
            this.getCategory()
            this.refs.tambahKategori.value = ''
       })
       .catch((err) => console.log(err))
    }

    renderProduct = () => {
        var renderProduct = this.state.product.map((val, index)=>{
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{val.id}</td>
                    <td>{val.nama}</td>
                    <td>{val.id_kategori === 1 ? <p>Notebook</p> : val.id_kategori === 2 ? <p>Gaming Notebook</p> :
                        val.id_kategori === 3 ? <p>Mouse</p> : null }</td>
                    <td>{val.deskripsi}</td>
                    <td>{nl2br(val.spesifikasi)}</td>
                    <td>{val.harga}</td>
                    <td>{val.diskon}</td>
                    <td><img src = {'http://localhost:2000/' + val.img} 
                         width = '50px' alt='product' /></td>
                    <td>
                        <input type="button" value="EDIT" className="btn btn-info" onClick={() => this.setState({modal : true, dataEdit : val})} />
                        <input type="button" value="DELETE" className="btn btn-danger" onClick={() => this.onBtnDelete(val)}/>
                    </td>
                </tr>
            )  
        })
        return renderProduct
    }

    onChangeHandlerEdit = (event) => {
        // UNTUK NGE GET VALUE FILES
        this.setState({selectedFileEdit : event.target.files[0]})
      }
    
      valueHandlerEdit =() => {
        var value = this.state.selectedFileEdit ? this.state.selectedFileEdit.name : 'Pick A Picture'
        return value 
      }
    
      onSaveBtnClick = () => {
        var newData = {
          nama : this.refs.namaEdit.value ? this.refs.namaEdit.value : this.state.dataEdit.nama,
          id_kategori : this.refs.kategoriEdit.value ? this.refs.kategoriEdit.value : this.state.dataEdit.id_kategori,
          deskripsi : this.refs.deskripsiEdit.value ? this.refs.deskripsiEdit.value : this.state.dataEdit.deskripsi,
          spesifikasi : this.refs.spesifikasiEdit.value ? this.refs.spesifikasiEdit.value : this.state.dataEdit.spesifikasi,
          harga : this.refs.hargaEdit.value ? this.refs.hargaEdit.value : this.state.dataEdit.harga,
          diskon : this.refs.diskonEdit.value ? this.refs.diskonEdit.value : this.state.dataEdit.diskon
        }
        if(this.state.selectedFileEdit){
          var fd = new FormData()
          fd.append('edit' , this.state.selectedFileEdit)
          fd.append('data' ,JSON.stringify(newData))
          
          // UNTUK DAPETIN PATH IMAGE YANG MAU DIHAPUS
          fd.append('imageBefore' , this.state.dataEdit.img)
          Axios.put('http://localhost:2000/product/editproduct/' + this.state.dataEdit.id , fd)
          .then((res) => {
            alert(res.data)
            this.setState({modal : false})
            this.getDataProduct()
          })
        }else{
          Axios.put('http://localhost:2000/product/editproduct/' + this.state.dataEdit.id , newData)
          .then((res) => {
            alert(res.data)
            this.setState({modal : false})
            this.getDataProduct()
          })
        }
      }

      onBtnDelete=(val)=>{
        Axios.delete('http://localhost:2000/product/delete/'+val.id, {data:val})
        .then((res)=>{
          // alert(res.data)
          if(typeof(res.data)==='string'){
            alert(res.data)
          }
          else{
            alert('delete data berhasil')
            this.setState({product : res.data})
          }
        })
        .catch((err)=>console.log(err))
      }
    
    render() {
        if(this.props.role === 'admin')
        {
        return (
            <div className="container">
                <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <h3 className="text-center default-text py-3"><i class="fas fa-plus-square"></i> Add Product</h3>
                        <div className="md-form">
                            <input type="text" className="form-control" ref="nama" />
                            <label htmlFor="defaultForm-email">Product Name</label>
                        </div>
                        <div className="col-md-form">
                        <select className="form-control" ref="kategori">
                            <option>Pilih Kategori</option>
                            {this.renderCategory()}
                        </select>
                        <label htmlFor="defaultForm-email">Choose Category</label>
                        </div>
                        <div className="md-form">
                            <textarea className="form-control" placeholder="Deskripsi Produk" ref="deskripsi" />
                            <label htmlFor="defaultForm-pass">Description</label>
                        </div>
                        <div className="md-form">
                            <textarea className="form-control" placeholder="Spesifikasi Produk" ref="spesifikasi" />
                            <label htmlFor="defaultForm-pass">Spesification</label>
                        </div>
                        <div className="md-form">
                            <input type="number" className="form-control" placeholder="Harga Produk" ref="harga" />
                            <label htmlFor="defaultForm-pass">Price</label>
                        </div>
                        <div className="md-form">
                            <input type="number" className="form-control" placeholder="Diskon" ref="diskon" />
                            <label htmlFor="defaultForm-pass">Discount</label>
                        </div>
                        <div className="md-form">
                            <input style={{display :'none'}} ref='input' type='file' onChange={this.onChangeHandler}/>
                            <input className='form-control btn-success' onClick={() => this.refs.input.click()} type='button' value={this.valueHandler()}/>
                        </div>
                        <div className="text-center mt-3">
                            <input type="button" value="ADD" className="btn btn-primary" onClick={this.onBtnAddProduct} />
                        </div>
                        {this.state.error}
                        </div>
                    </div>

                    {/* Insert Category */}
                    <hr style={{marginTop : '10px', marginBottom: '10px'}}/>
                    <div className="md-form mt-3">
                        <table className="table">
                            <tr>
                                <td>Kategori</td>
                                <td>ACT</td>
                            </tr>
                            {this.renderCategoryTable()}
                        </table>
                        <input type="text" className="form-control" ref="tambahKategori" placeholder="Kategori" />
                        <center><input type="button" value="ADD" className="btn btn-primary mt-2" onClick={this.addCatBtnClick} /></center>
                    </div>
                </div>
                <div className="col-md-9">
                <center><h1>Product Table</h1></center>
                <table className="table mt-3">
                    <tr>
                        <td>No.</td>
                        <td>ID</td>
                        <td>Nama</td>
                        <td>Kategori</td>
                        <td>Deskripsi</td>
                        <td>Spesifikasi</td>
                        <td>Harga</td>
                        <td>Diskon</td>
                        <td>Image</td>
                        <td>ACT</td>
                    </tr>
                    {this.renderProduct()}
                </table>
                </div>
            </div>

                                         {/* =================== MODAL EDIT =======================*/}
                <div>
                <Modal isOpen={this.state.modal} toggle={() => this.setState({modal:false})} className={this.props.className}>
                    <ModalHeader toggle={() => this.setState({modal:false})}>Edit Product : {this.state.dataEdit.nama}</ModalHeader>
                    <ModalBody>
                    <div className='row'> 
                        <div className="card">
                        <div className="card-body">
                        <div className="md-form">
                            <input type="text" className="form-control" ref="namaEdit" placeholder={this.state.dataEdit.nama} />
                            <label htmlFor="defaultForm-email">Product Name</label>
                        </div>
                        <div className="col-md-form">
                        <select className="form-control" ref="kategoriEdit" placeholder={this.state.dataEdit.id_kategori}>
                            <option>Pilih Kategori</option>
                            {this.renderCategory()}
                        </select>
                        <label htmlFor="defaultForm-email">Choose Category</label>
                        </div>
                        <div className="md-form">
                            <textarea className="form-control" placeholder={this.state.dataEdit.deskripsi} ref="deskripsiEdit" />
                            <label htmlFor="defaultForm-pass">Description</label>
                        </div>
                        <div className="md-form">
                            <textarea className="form-control" placeholder={this.state.dataEdit.spesifikasi} ref="spesifikasiEdit" />
                            <label htmlFor="defaultForm-pass">Spesification</label>
                        </div>
                        <div className="md-form">
                            <input type="number" className="form-control" placeholder={this.state.dataEdit.harga} ref="hargaEdit" />
                            <label htmlFor="defaultForm-pass">Price</label>
                        </div>
                        <div className="md-form">
                            <input type="number" className="form-control" placeholder={this.state.dataEdit.diskon}ref="diskonEdit" />
                            <label htmlFor="defaultForm-pass">Discount</label>
                        </div>
                        <div className="md-form">
                                <img src={'http://localhost:2000/' + this.state.dataEdit.img} width='100%' alt='broken' />
                                <input type='file' onChange={this.onChangeHandlerEdit} style={{display:'none'}} ref='inputEdit' />
                                <input type='button' value={this.valueHandlerEdit()} className='btn btn-primary' 
                                onClick={ () =>this.refs.inputEdit.click()} />
                        </div>
                        </div> 
                        </div>
                    </div>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.onSaveBtnClick}>Save</Button>{' '}
                    <Button color="secondary" onClick={() => this.setState({modal:false})}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                </div>
            </div>
        );
    } return <PageNotFound />
}
}

const mapStateToProps = (state) => {
    return {
        role : state.user.role
    }
}
export default connect(mapStateToProps,{LoginAction})(ManageProduct);