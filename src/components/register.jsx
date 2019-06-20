import React from 'react';
import { Link } from 'react-router-dom';
import {userRegister} from './../1.actions/userAction';
import {connect} from 'react-redux';
// import {Redirect} from 'react-router-dom';
import validator from 'validator';
import Loader from 'react-loader-spinner';
import './../support/style.css';
import Button from '@material-ui/core/Button';

class Register extends React.Component{
    state = {error : '', msg : ''}

    renderLoadingOrBtn =() => {
        if(this.props.loading === true){
            return <Loader
                    type="Rings"
                    color="#00BFFF"
                    height="50"	
                    width="50"
                    />
        }else{
            return <Button color="primary" variant="contained"  style={{width:"300px"}} onClick={this.onBtnSignUp} ><i className="fas fa-sign-in-alt mr-2"  /> Sign Up!</Button>
        }
    }

    onBtnSignUp = () => {
        var namadepan = this.refs.namadepan.value
        var namabelakang = this.refs.namabelakang.value
        var username = this.refs.username.value 
        var password = this.refs.password.value
        var repassword = this.refs.repassword.value
        var email = this.refs.email.value
        var phone = this.refs.phone.value

        if(namadepan === '' || namabelakang === '' || username === '' || password === '' ||
           repassword === '' || email === '' || phone === '') {
               this.setState({error : 'Semua form harus ter-isi'})
        } else if(validator.isEmail(email) === false){
                this.setState({error : 'Email tidak valid'})
        }else if(password !== repassword) {
                this.setState({error : 'Password tidak match'})
        } else {
            this.props.userRegister(namadepan, namabelakang, username, password, email, phone)
            this.setState({msg:'Thankyou for register, check your email to verify your accout'})

            // this.refs.namadepan.value = ''
            // this.refs.namabelakang.value = ''
            // this.refs.username.value = ''
            // this.refs.password.value = ''
            // this.refs.repassword.value = ''
            // this.refs.email.value = ''
            // this.refs.phone.value = ''
        }
    }

    renderMessage = () => {
        if(this.props.error !== ""){
            return <div class="alert alert-danger mt-3" role="alert">
                        {this.props.error}
                    </div>
        } else if(this.state.msg !==''){
            return <div className="alert alert-success mt-3" role="alert">
                        {this.state.msg}
                    </div>
        } else if(this.state.error!==''){
            return <div className="alert alert-danger mt-3" role="alert">
                        {this.state.error}
                    </div>
        }
    }

    render(){
        // if(this.props.username !== ""){
        //     return <Redirect to='/login' />
        // }
        return(
            <div className="container myBody" style={{minHeight:"600px"}}>
            <div className="row justify-content-sm-center ml-auto mr-auto mt-3">
                <form className="sign" ref="formLogin">
                    <fieldset>
                        
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Nama Depan</label>
                            <div className="col-sm-9">
                            <input type="text" ref="namadepan" className="form-control" id="inputNamaDepan" placeholder="Nama Depan" required autoFocus/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Nama Belakang</label>
                            <div className="col-sm-9">
                            <input type="text" ref="namabelakang" className="form-control" id="inputNamaBelakang" placeholder="Nama Belakang" required autoFocus/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Username</label>
                            <div className="col-sm-9">
                            <input type="text" ref="username" className="form-control" id="inputUsername" placeholder="Username" required autoFocus/>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Password</label>
                            <div className="col-sm-9">
                            <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" required />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Retype-Password</label>
                            <div className="col-sm-9">
                            <input type="password" ref="repassword" className="form-control" id="inputRePassword" placeholder="Retype-Password" required />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-9">
                            <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="Email@mail.com" required />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label">Phone</label>
                            <div className="col-sm-9">
                            <input type="number" ref="phone" className="form-control" id="inputPhone" placeholder="Ex: 0857xxxxxxxx" required />
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <div className="col-12">
                            <center>
                            <div> {this.renderLoadingOrBtn()} </div>
                            </center>
                            <center>
                            {this.renderMessage()}
                            </center>
                            </div>     
                        </div>
                        <div className="btn my-auto"><p>Already have Account? <Link to="/login" className="border-bottom">Login</Link></p></div>
                        
                    </fieldset>
                </form>
                    
                </div>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        error : state.user.error,
        msg : state.user.msg,
        username : state.user.username,
        loading : state.user.loading
    }
}

export default connect (mapStateToProps,{userRegister})(Register)