import React from 'react'
import { Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {LoginAction, cartCount} from '../1.actions';
import Loader from 'react-loader-spinner';
import './../support/style.css';
import Button from '@material-ui/core/Button';

class Login extends React.Component{

    componentWillReceiveProps(newProps){
        if(newProps.username !== ""){
            this.props.cartCount(newProps.username)        
        }
    }

    renderBtnOrLoading = () => {
        if(this.props.loading === true){
            return <Loader
                    type="Bars"
                    color="#00BFFF"
                    height="50"	
                    width="50"
                    />
        }else{
            return <Button color="primary" variant="contained" onClick={this.onBtnLoginClick} style={{width:"300px"}} ><i className="fas fa-sign-in-alt mr-2" /> Sign In</Button>
        }
    }
    
    onBtnLoginClick = () => {
        var username = this.refs.username.value
        var password = this.refs.password.value
        this.props.LoginAction(username, password)
    }

    renderErrorMessage = () => {
        if(this.props.error !== ""){
            return <div class="alert alert-danger mt-3" role="alert">
                        {this.props.error}
                    </div>
        }
    }


    render(){
        if(this.props.username !== ""){
            return <Redirect to='/' />
        }
        return(
            <div className="container myBody" style={{minHeight:"350px"}}>
                <div className="row justify-content-sm-center ml-auto mr-auto mt-3 " >
                    
                    <form className="sign" ref="formLogin">
                        <fieldset>
                            
                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Username</label>
                                <div className="col-sm-9">
                                <input type="text" ref="username" className="form-control" id="inputEmail" placeholder="Username" required autoFocus/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-3 col-form-label">Password</label>
                                <div className="col-sm-9">
                                <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" onKeyPress={this.renderOnKeyPress} required />
                                </div>
                            </div>
                            
                            <div className="form-group row">
                                <div className="col-12">
                                    <center>
                                    {this.renderBtnOrLoading()}
                                    {this.renderErrorMessage()}
                                    </center>                                 
                                </div>
                                    
                            </div>
                            <div className="btn my-auto"><p>Don't have Account? <Link to="/register" className="border-bottom">Sign Up!</Link></p></div>
                        </fieldset>
                    </form>
                    
                </div>                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        error : state.user.error,
        loading : state.user.loading
    }
}

export default connect(mapStateToProps,{LoginAction, cartCount})(Login)