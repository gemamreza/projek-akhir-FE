import React from 'react';
import './../support/style.css';
import {Link} from 'react-router-dom';

class Footer extends React.Component {
    render() {
        return (
            <div className='footer mt-3'>
                <div style={{marginTop:"30px"}}>
                    <center>
                        <a href='http://www.facebook.com/gemamuhammadreza' target='_blank' rel="noopener noreferrer"><i class="fab fa-facebook-f" style={{marginRight:'25px', fontSize:'24px', color:'#000000'}} /></a>
                        <a href='http://www.twitter.com/gemamreza' target='_blank' rel="noopener noreferrer"><i class="fab fa-twitter" style={{marginRight:'25px', fontSize:'24px', color:'#000000'}} /></a>
                        <a href='http://www.instagram.com/gemamreza' target='_blank' rel="noopener noreferrer"><i class="fab fa-instagram" style={{marginRight:'25px', fontSize:'24px', color:'#000000'}}/></a>
                    </center>
                </div>
                <div style={{marginTop:"20px", lineHeight:"30px"}}>
                    <center>
                        <Link to="/" style={{color:"black"}}><p style={{display:"inline-block", marginRight:"5px"}}>Home &nbsp;|</p></Link>
                        <Link to='/howtoorder' style={{ color:'#000000', textDecoration:'none'}}><p style={{display:"inline-block", marginRight:"5px"}}>How To Order &nbsp;|</p></Link>
                        <Link to="/about" style={{color:"black"}}><p style={{display:"inline-block"}}>About</p></Link>
                    </center>
                </div>
                <div style={{marginTop:"0px", color:"black"}}>
                    <p>Created By The Good People of Indonesia  &copy; 2019</p>
                </div>
            </div>
        );
    }
}

export default Footer;