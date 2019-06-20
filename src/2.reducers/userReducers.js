const INITIAL_STATE = {id : 0, username :'', role : "", cookie : false, loading : false, error : "", msg : ""}

export default (state=INITIAL_STATE, action)=>{
    if(action.type==='LOADING'){
        return {...INITIAL_STATE, loading: true , cookie : true} 
    }else if(action.type==='LOGIN_SUCCESS'){
        return {...INITIAL_STATE, id : action.payload.id, username:action.payload.username , role: action.payload.role ,  cookie : true}
    }else if(action.type==='USER_NOT_FOUND'){
        return {...INITIAL_STATE, error:'Incorrect username or password', cookie : true}
    }else if(action.type==='USER_NOT_VERIFIED'){
        return {...INITIAL_STATE, error : 'Please verify your account first' , cookie : true}
    }else if(action.type==='SYSTEM_ERROR'){
        return {...INITIAL_STATE, error:'System error, please try again later', cookie : true}
    }else if(action.type==='RESET_USER'){
        return {...INITIAL_STATE, cookie: true}
    }else if(action.type==='USERNAME_NOT_AVAILABLE'){
        return {...INITIAL_STATE, cookie : true,error:'Username Has Been Taken!'}
    }else if(action.type==='REGISTER_SUCCESS'){
        return {...INITIAL_STATE, msg : action.payload,cookie : true}
    }else if(action.type==='COOKIE_TRUE'){
        return {...state, cookie : true}
    }else{
        return {...state, cookie : true}
    }
}