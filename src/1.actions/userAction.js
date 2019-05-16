import axios from 'axios';
import cookie from 'universal-cookie';

const objCookie = new cookie()
// export const LoginAction = (a) => {
//     // objCookie.set('userData',a, {path : '/'})
//     // return {
//     //     type : 'LOGIN_SUCCESS_USERNAME',
//     //     payload : a
//     // }
   
// }

export const LoginAction=(username,password)=>{
    return(dispatch)=>{
        dispatch({
            type:'LOADING'
        })
        axios.get('http://localhost:2000/user/login',{params:{username,password}})
        .then((res)=>{
            console.log(res.data)
            if(res.data.length === 0){
                dispatch({
                    type:'USER_NOT_FOUND'
                })
            }else if(res.data[0].verified==='true'){
                dispatch({
                    type:'LOGIN_SUCCESS',
                    payload: res.data[0]
                })
                objCookie.set('userData', res.data[0].username, {path:'/'})
            }else if(res.data[0].verified==='false'){
                dispatch({
                    type:'USER_NOT_VERIFIED'
                })
            }
        })
        .catch((err)=>{
            dispatch({
                type:'SYSTEM_ERROR'
            })
        })
    }
}

export const resetUser = (a) => {
    // objCookie.remove('userData')
    return {
        type : 'RESET_USER',
        payload : a
    }
    
}

export const keepLogin = (cookie) => {
    return(dispatch) => {
        axios.get('http://localhost:2000/user/users', {params:{username : cookie}})
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : res.data[0]
                })
            }
        })
        .catch((err) => console.log(err))
    }
} 

export const userRegister = (a,b,c,d,e,f) => { // userRegister('fikri')
    return(dispatch)=>{
        dispatch({
            type : 'LOADING'
        })
        var newData = {namadepan : a, namabelakang : b, username : c, password : d, email : e, phone : f, role : 'user'}
        // Mengecek Username availablity

        axios.get('http://localhost:2000/user/users?username=' + c)
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type : 'USERNAME_NOT_AVAILABLE'
                })
            }
            else{
                axios.post('http://localhost:2000/user/register',newData)
                .then((res) => dispatch({
                    type : 'REGISTER_SUCCESS',
                    //Mengirim Payload dalam bentuk Object
                    //payload : { username : newData.username, id : res.data.id, email : c} 
                    payload : res.data
                },
                    // Parameter Ketiga agar cookie bisa diakses di semua komponen
                    //objCookie.set('userData',res.data[0].username,{path : '/'}),
                ))
                .catch((err) => console.log(err))
            }
        })
        .catch((err) => {
            dispatch({
                type : 'SYSTEM_ERROR'
            })
        })
    }
}

export const makeCookieTrue = () => {
    return {
        type : 'COOKIE_TRUE'
    }
}
