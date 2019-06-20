import React from 'react';

class About extends React.Component {
    render() {
        return (
            <div className="container ">
                <div className="col-md-12">
                <h1 style={{fontFamily:'sans-serif'}}>About Us</h1>
                <p style={{fontFamily:"sans-serif", textAlign:"justify", fontSize:"20px", display:"block"}}>
                   Gadgetmarket adalah website ecommerce pertama di Indonesia yang menjual
                   berbagai produk mulai dari notebook / gaming notebook dan aksesoris lainnya dari official brand-brand yang terkemuka.
                   Dengan mengutamakan kualitas barang serta packaging agar produk sampai dengan selamat kepada pembeli.
                </p>
                <p  style={{fontFamily:"sans-serif", textAlign:"justify", fontSize:"20px", display:"block"}}>
                   Gadgetmarket is the first ecommerce website in Indonesia that sells
                   various products ranging from notebooks / gaming notebooks and other accessories from official brands.
                   By prioritizing the quality of goods and packaging so that the product arrives safely to the buyer.  
                </p>

                <p style={{fontFamily:"sans-serif", textAlign:"center", fontSize:"20px", display:"block", marginBottom:"87px"}}>
                    Kind Regards : Gadgetmarket Team.
                </p>
                </div>
            </div>
        );
    }
}

export default About;