import React from 'react';
import queryString from 'query-string';
import Axios from 'axios';
import sweet from 'sweetalert';


class Verify extends React.Component{
    componentDidMount(){
        this.verification()
    }

    verification = () => {
        var params = queryString.parse(this.props.location.search)
        Axios.put('http://localhost:2000/user/verify',
        {
            username : params.username,
            password : params.password
        })
        .then((res) => sweet('Success',res.data,'success'))
        .catch((err) => console.log(err))
    }

    render(){
        return(
            <div className="container">
               <center><h1>Email Berhasil di konfirmasi, silakan login kembali</h1></center>
               <img src="https://startuppekanbaru.org/wp-content/uploads/2018/02/12.jpg"
                style={{width:"100%", height:"350px"}} alt="banner" />
            </div>
        )
    }
}

export default Verify