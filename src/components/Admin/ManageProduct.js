import React from 'react';
import Axios from 'axios';
import nl2br from 'react-nl2br';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {LoginAction} from './../../1.actions/userAction';
import {connect} from 'react-redux';
import './../../support/style.css';
import PageNotFound from './../PageNotFound';
import sweet from 'sweetalert';
import Currency from 'format-currency';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

class ManageProduct extends React.Component {
    state = {product : [], category : [], selectedFile : null, error : "",
             modal : false, dataEdit : {}, selectedFileEdit : null, edit : 0,
             searchData : '', filterKategori : 999, dataPerView : 10, errorEdit : ''}

    componentDidMount(){
        this.getDataProduct()
        this.getCategory()
        this.getDataUrl()
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


    renderCategory = () => {
        var renderCat = this.state.category.map((val)=> {
            return <option value={val.id}>{val.category}</option>
        })
        return renderCat
    }

    getProductByCat = () => {
        var category = this.refs.getCategory.value
        Axios.get('http://localhost:2000/product/productfilter/' + category)
        .then((res) => {
            this.setState({product : res.data})
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
            sweet('Warning','Jangan Ada Data yang Kosong!','error')
        } else {
            Axios.post('http://localhost:2000/product/addproduct' , fd)
            .then((res) => {
            if(res.data.error){
            this.setState({error : res.data.msg})
            }else{
            sweet('Add Product',res.data,'success')
            this.getDataProduct()
            this.refs.nama.value = ''
            this.refs.kategori.value = ''
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

    getDataUrl = () => {
        var obj = queryString.parse(this.props.location.search)
        if(obj.nama){
            this.setState({searchData : obj.nama})
        }
        if(obj.category){
            this.setState({filterKategori : obj.category})
        }
    }

    pushUrl = () => {
        var newLink = '/manage'
        var params = []
        if(this.refs.searchNama.value){
            params.push({
                params : 'nama',
                value : this.refs.searchNama.value
            })
        }
        if(this.refs.getCategory.value <= 3){
            params.push({
                params : 'category',
                value : this.refs.getCategory.value
            })
        }
        
        for(var i = 0; i < params.length; i++){
            if(i === 0){
                newLink += '?' + params[i].params +'=' + params[i].value
            } else  {
                newLink += '&' + params[i].params + '=' + params[i].value
            }
        }
        this.props.history.push(newLink)
    }

    onBtnFind = () => {
        this.pushUrl()
        var search = this.refs.searchNama.value
        this.setState({searchData : search.toLowerCase()})
    }

    renderProduct = () => {
        var arrFilter = this.state.product.filter((val)=> {
            return (val.nama.toLowerCase().startsWith(this.state.searchData)) // eslint-disable-next-line
            && (val.id_kategori == this.state.filterKategori || this.state.filterKategori > 4)
        })

        var data = arrFilter.slice(0, this.state.dataPerView)
        var renderProduct = data.map((val, index)=>{
            return (
                <tr>
                    <td>{index+1}</td>
                    <td>{val.nama}</td>
                    <td>{val.id_kategori}</td>
                    <td>{val.category}</td>
                    <td>{val.deskripsi}</td>
                    <td>{nl2br(val.spesifikasi)}</td>
                    <td>Rp.{Currency(val.harga)}</td>
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
            if(res.data.error){
                this.setState({error : res.data.msg})
            } else {
            sweet('Edit Product',res.data,'success')
            this.setState({modal : false, error : '', selectedFileEdit : null})
            this.getDataProduct()
            }
          })
        }else{
          Axios.put('http://localhost:2000/product/editproduct/' + this.state.dataEdit.id , newData)
          .then((res) => {
            if(res.data.error){
                this.setState({error : res.data.msg})
            } else {
                sweet('Edit Product',res.data,'success')
                this.setState({modal : false, error :'', selectedFileEdit : null})
                this.getDataProduct()
            }
          })
        }
    }

    onBtnDelete=(val)=>{
    Axios.delete('http://localhost:2000/product/delete/'+val.id, {data:val})
    .then((res)=>{
        // alert(res.data)
        if(typeof(res.data)==='string'){
        sweet('Warning',res.data,'danger')
        }
        else{
        sweet('Info','Delete data berhasil','success')
        this.setState({product : res.data})
        }
    })
    .catch((err)=>console.log(err))
    }

    renderErrorMessage = () => {
        if(this.state.error !== ""){
            return <div class="alert alert-danger mt-3" role="alert">
                        {this.state.error}
                    </div>
        }
    }
    
    render() {
        if(this.props.role === 'admin')
        {
        return (
            
            <div style={{paddingLeft : '50px', paddingRight : '50px'}}>
                <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card">
                        <div className="card-body">
                        <h3 className="text-center default-text py-3"><i class="fas fa-plus-square"></i> Add Product</h3>
                        <div className="md-form">
                            <label htmlFor="defaultForm-email">Product Name</label>
                            <input type="text" className="form-control" ref="nama" />
                        </div>
                        <div className="col-md-form">
                        <label htmlFor="defaultForm-email">Choose Category</label>
                        <select className="form-control" ref="kategori">
                            <option value={1}>Pilih Kategori</option>
                            {this.renderCategory()}
                        </select>
                        </div>
                        <div className="md-form">
                            <label htmlFor="defaultForm-pass">Description</label>
                            <textarea className="form-control" placeholder="Deskripsi Produk" ref="deskripsi" />
                        </div>
                        <div className="md-form">
                            <label htmlFor="defaultForm-pass">Spesification</label>
                            <textarea className="form-control" placeholder="Spesifikasi Produk" ref="spesifikasi" />
                        </div>
                        <div className="md-form">
                            <label htmlFor="defaultForm-pass">Price</label>
                            <input type="number" className="form-control" placeholder="Harga Produk" ref="harga" /> 
                        </div>
                        <div className="md-form">
                            <label htmlFor="defaultForm-pass">Discount</label>
                            <input type="number" className="form-control" placeholder="Diskon" ref="diskon" />
                        </div>
                        <div className="md-form">
                            <label htmlFor="defaultForm-pass">Insert Picture</label>
                            <input style={{display :'none'}} ref='input' type='file' onChange={this.onChangeHandler}/>
                            <input className='form-control btn-success' onClick={() => this.refs.input.click()} type='button' value={this.valueHandler()}/>
                        </div>
                        <div className="text-center mt-3">
                            <input type="button" value="ADD" className="btn btn-primary" onClick={this.onBtnAddProduct} />
                        </div>
                        {this.renderErrorMessage()}
                        </div>
                    </div>
                </div>

                
                <div className="col-md-9">
                <div className="row">
                <div className="col-md-4">
                    <h1>Product Table</h1>
                </div>
                <div className="row justify-content-end">
                <div className="col-md-5 md-form mt-2 mr-5" style={{display:'flex'}}>
                    <select className="form-control" style={{width : '15rem'}}
                        onChange={() =>{
                        this.pushUrl()
                        this.setState({filterKategori : this.refs.getCategory.value})}} ref='getCategory'>
                            <option value={999}>ALL</option>
                            {this.renderCategory()}
                    </select>
                    <input type="text" className="form-control ml-3 mr-2" ref='searchNama' placeholder="Search by Name" style={{width : '15rem'}} />
                    <i class="fas fa-search mt-2 pointer" onClick={this.onBtnFind} style={{fontSize : '20px'}}></i>
                </div>
                </div>
                
                <table className="table mt-3 ">
                    <tr>
                        <td>No.</td>
                        <td>Nama</td>
                        <td>ID.K</td>
                        <td>Kategori</td>
                        <td>Deskripsi</td>
                        <td>Spesifikasi</td>
                        <td>Harga</td>
                        <td>Diskon</td>
                        <td>Image</td>
                        <td>ACT</td>
                    </tr>
                    {this.renderProduct()}
                    <tr>
                        <td colspan='10'>
                            {
                                this.renderProduct().length < 10 ?
                                <center><p>End Of List </p></center> : this.renderProduct().length >= 10 ?
                                <center><p onClick={ () => this.setState({ dataPerView : this.state.dataPerView+10 })} style={{fontStyle:"italic", cursor:"pointer"}}> View More</p></center> :
                                null
                            }
                        </td>
                    </tr>
                </table>
                </div>
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
                            <label htmlFor="defaultForm-email">Product Name</label>
                            <input type="text" className="form-control" ref="namaEdit" defaultValue={this.state.dataEdit.nama} />
                        </div>
                        <div className="col-md-form">
                        <label htmlFor="defaultForm-email">Choose Category</label>
                        <select className="form-control" ref="kategoriEdit">
                            <option>{this.state.dataEdit.id_kategori}</option>
                            {this.renderCategory()}
                        </select>
                        </div>
                        <div className="md-form">
                            <label htmlFor="defaultForm-pass">Description</label>
                            <textarea className="form-control" defaultValue={this.state.dataEdit.deskripsi} ref="deskripsiEdit" />
                        </div>
                        <div className="md-form">
                            <label htmlFor="defaultForm-pass">Spesification</label>
                            <textarea className="form-control" defaultValue={this.state.dataEdit.spesifikasi} ref="spesifikasiEdit" />
                        </div>
                        <div className="md-form">
                            <label htmlFor="defaultForm-pass">Price</label>
                            <input type="number" className="form-control" defaultValue={this.state.dataEdit.harga} ref="hargaEdit" />
                        </div>
                        <div className="md-form">
                            <label htmlFor="defaultForm-pass">Discount</label>
                            <input type="number" className="form-control" defaultValue={this.state.dataEdit.diskon}ref="diskonEdit" />
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
                    <center>{this.renderErrorMessage()}</center>
                    <ModalFooter>
                    <Button color="primary" onClick={this.onSaveBtnClick}>Save</Button>
                    <Button color="secondary" onClick={() => this.setState({modal:false, error : '', selectedFileEdit : null, selectedFile : null})}>Cancel</Button>
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
export default connect(mapStateToProps,{LoginAction}) (withRouter(ManageProduct));