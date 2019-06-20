import React, { Component } from 'react';

class HowToOrder extends Component {
    render() {
        return (
            <div className="container" style={{minHeight:'365px', marginTop:'10px'}}>
               <div className="row justify-content-center">
                  <center><h1>How To Order</h1></center>
               </div>
               <div className="row justify-content-center">
                  <ol>
                      <li>Sign up first if you don't have any account.</li>
                      <li>Login, because you can't order without login first.</li>
                      <li>Go to the page you want such as (Notebook, Gaming Notebook, etc).</li>
                      <li>Click the picture of product you want.</li>
                      <li>Input the quantity of the product, and than click 'Masukan ke Keranjang' button.</li>
                      <li>Go to your cart, if you want to check out the product.</li>
                      <li>Click the 'Check Out' button, wait a second and you will receive the email for your order.</li>
                      <li>Open up your email and follow the next instruction.</li>
                  </ol>
                </div>
                  <center><h3>Kind Regards : gadgetmarket Team</h3></center> 
            </div>
        );
    }
}

export default HowToOrder;