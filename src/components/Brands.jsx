import React from 'react';
import './../support/style.css';


class Brands extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-md-12 justify-content-center ">
                    <center>
                        <p style={{fontFamily:"Raleway", fontSize:"30px", fontWeight:800, fontStyle:"italic"}}> OFFICIAL BRANDS </p>
                    </center>
                    <hr />
                    </div>   
                </div>
                <div className="row mt-3">
                    <div className="col-md-2 mr-auto">
                        <img src={require('./img/brands/logo_msi.jpg')} alt="logo" height="250px" width="250px" />
                    </div>
                    <div className="col-md-2 mr-auto ">
                        <img src={require('./img/brands/logo_razer.jpg')} alt="300" height="250px" width="250px" />  
                    </div>
                    <div className="col-md-2 mr-auto">
                        <img src={require('./img/brands/logo_steelseries.jpg')} alt="logo" height="250px" width="250px" />
                    </div>
                    <div className="col-md-2 mr-auto">
                        <img src={require('./img/brands/logo_gigabyte.jpg')} alt="logo" height="250px" width="250px" />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-2 mr-auto">
                        <img src={require('./img/brands/logo_asus.jpg')} alt="logo" height="250px" width="250px" />
                    </div>
                    <div className="col-md-2 mr-auto ">
                        <img src={require('./img/brands/logo_dell.png')} alt="300" height="250px" width="250px" />  
                    </div>
                    <div className="col-md-2 mr-auto">
                        <img src={require('./img/brands/logo_hp.jpg')} alt="logo" height="250px" width="250px" />
                    </div>
                    <div className="col-md-2 mr-auto">
                        <img src={require('./img/brands/logo_acer.png')} alt="logo" height="250px" width="250px" />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-2 mr-auto">
                        <img src={require('./img/brands/logo_alienware.png')} alt="logo" height="250px" width="250px" />
                    </div>
                    <div className="col-md-2 mr-auto ">
                        <img src={require('./img/brands/logo_lenovo.jpg')} alt="300" height="250px" width="250px" />  
                    </div>
                    <div className="col-md-2 mr-auto">
                        <img src={require('./img/brands/logo_sony.jpg')} alt="logo" height="250px" width="250px" />
                    </div>
                    <div className="col-md-2 mr-auto">
                        <img src={require('./img/brands/logo_rog.png')} alt="logo" height="250px" width="250px" />
                    </div>
                </div>
                <div>
                    <hr />
                </div>
            </div>
            
            
        );
    }
}

export default Brands;