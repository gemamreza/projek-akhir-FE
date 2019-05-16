import React from 'react'
import { Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import {LoginAction, cartCount} from '../1.actions';


class Login extends React.Component{

    componentWillReceiveProps(newProps){
        console.log(newProps)
        if(newProps.username !== ""){
            this.props.cartCount(newProps.username)        
        //Cookie.set('userData',newProps.username,{path :'/'})
        }
    }
    
    onBtnLoginClick = () => {
        var username = this.refs.username.value
        var password = this.refs.password.value
        // Axios.post('http://localhost:2000/user/login', {username, password})
        // .then((res) => {
        //     if(res.data === 'Username atau Password tidak cocok!')
        //     {
        //         alert(res.data) 
        //     } else {
            //this.props.LoginAction(res.data[0].username)
            this.props.LoginAction(username, password)
        //     }
        // })
        // .catch((err) => console.log(err))

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
                <div className="row justify-content-sm-center ml-auto mr-auto mt-3" >
                    
                    <form className="border mb-3" style={{padding:"20px", borderRadius:"5%"}} ref="formLogin">
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
                                 <button type="button" className="btn btn-primary" onClick={this.onBtnLoginClick} style={{width:"300px"}} ><i className="fas fa-sign-in-alt" /> Login</button>
                                 {this.renderErrorMessage()}
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
        error : state.user.error
    }
}

export default connect(mapStateToProps,{LoginAction, cartCount})(Login)