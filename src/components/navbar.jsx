import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {resetUser, LoginAction,resetCount, cartCount} from './../1.actions';
import cookie from 'universal-cookie';
import Axios from 'axios';
import './../support/style.css';

const objCookie = new cookie()
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      category: []
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


  componentDidMount() {
      this.getCategory()
  }

  getCategory = () => {
      Axios.get('http://localhost:2000/product/category')
      .then((res) => {
          this.setState({category : res.data})
      })
      .catch((err) => console.log(err))
  }

  onBtnLogout = () => {
      objCookie.remove('userData', {path:'/'})
      this.props.resetUser()
      this.props.resetCount()
  }

  renderCategory = () => {
    var render = this.state.category.map((val) => {
      return (
        <DropdownItem value={val.id} style={{fontFamily:'raleway', fontWeight:'500', fontSize:'14px', color:'#000000'}}>
          <a href={'/productlist/' + val.id} style={{color:"black",textDecoration:"none"}}>
            <p>{val.category}</p>
          </a>
        </DropdownItem>
      )
    })
    return render
  }

  render() {
    if(this.props.username === ""){
    return (
      <div>
        <Navbar style={{backgroundColor: '#ffffff'}} light expand="md" fixed="top">
          <NavbarBrand style={{fontWeight :"1000", marginLeft:"480px", fontSize:"72px"}}><Link to='/' style={{color:"black", textDecoration:"none"}}>gadgetmarket<sup>®</sup></Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/getcart" style={{marginTop:"-60px", color:"#000000"}}><i class="fas fa-shopping-cart"></i></NavLink>
              </NavItem>
              <NavItem>
                <NavLink style={{marginTop:"-60px"}}><a href='/register' style={{color:"#000000"}}><i class="fas fa-user-plus"/></a></NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{marginTop:"-60px", color:"#000000"}}>
                  Menu
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                   <a href='/login' style={{color:"black", textDecoration:"none"}}>Login</a>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to='*' style={{color:"black", textDecoration:"none"}}>
                    Manage History
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <Navbar style={{backgroundColor: '#ffffff', marginTop:'120px'}} light expand="md" >
          <NavbarBrand style={{marginLeft : '600px', fontFamily:'Raleway, sans-serif', fontWeight:'700', fontSize:'13px'}}><Link to='/' style={{textDecoration:"none", color:"black"}} >HOME</Link></NavbarBrand>
          <UncontrolledDropdown>
          <DropdownToggle nav caret style={{fontFamily:'Raleway, sans-serif', fontWeight:'700', fontSize:'13px', color:'#000000', marginLeft:'-10px'}}>
                  SHOP
                </DropdownToggle>
                <DropdownMenu right>
                  {this.renderCategory()}
                </DropdownMenu>
            </UncontrolledDropdown>
          <NavbarBrand  style={{fontFamily:'Raleway, sans-serif',fontWeight:'700', fontSize:'13px'}}><Link to='/howtoorder' style={{ color:'#000000', textDecoration:'none'}}>HOW TO ORDER</Link></NavbarBrand>
          <NavbarBrand  className='onHover' style={{fontFamily:'Raleway, sans-serif',fontWeight:'700', fontSize:'13px'}}><Link to='/about' style={{ color:'#000000', textDecoration:'none'}}>ABOUT</Link></NavbarBrand>
        </Navbar>
      </div>
    );
    } else {
      return (
        <div>
        <Navbar style={{backgroundColor: '#ffffff'}} light expand="md" fixed="top">
          <NavbarBrand style={{fontWeight :"1000", marginLeft:"480px", fontSize:"72px"}}><Link to='/' style={{color:"black", textDecoration:"none"}}>gadgetmarket<sup>®</sup></Link></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink style={{marginTop:"-60px", color:"#000000"}}>Hai, {this.props.username} <i class="fas fa-user"></i></NavLink>
              </NavItem>
              <NavItem>
                <Link to='/getcart'><NavLink style={{marginTop:"-60px", color:"#000000"}}><sup><span class="badge badge-success">{this.props.count}</span></sup><i class="fas fa-shopping-cart"></i></NavLink></Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{marginTop:"-60px", color:"#000000"}}>
                  Menu
                </DropdownToggle>
                <DropdownMenu right>
                {
                  this.props.role === "admin" ?
                  <DropdownItem>
                    <Link to='/manage' style={{color:"#000", textDecoration:"none"}}>
                    Manage Product
                    </Link>
                  </DropdownItem>
                  :
                  <DropdownItem>
                    <Link to='/history' style={{color:"#000", textDecoration:"none"}}>
                    Manage History
                    </Link>
                  </DropdownItem>
                }

                {
                  this.props.role === 'admin' ?
                  <DropdownItem>
                    <Link to='/managetransaksi' style={{color:"#000", textDecoration:"none"}}>
                    Manage Transaksi
                    </Link>
                  </DropdownItem>
                  : null
                }
                 {
                  this.props.role === 'admin' ?
                  <DropdownItem>
                    <Link to='/managecategory' style={{color:"#000", textDecoration:"none"}}>
                    Manage Kategori
                    </Link>
                  </DropdownItem>
                  : null
                }
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onBtnLogout} className='logout'>
                    <a href='/' style={{color:"#000", textDecoration:"none"}}>
                    Log Out
                    </a>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <Navbar style={{backgroundColor: '#ffffff', marginTop:'120px'}} light expand="md" >
          <NavbarBrand style={{marginLeft : '600px', fontFamily:'Raleway, sans-serif', fontWeight:'700', fontSize:'13px'}}><Link to='/' style={{textDecoration:"none", color:"black"}}>HOME</Link></NavbarBrand>
          <UncontrolledDropdown>
          <DropdownToggle nav caret style={{fontFamily:'Raleway, sans-serif', fontWeight:'700', fontSize:'13px', color:'#000000', marginLeft:'-10px'}}>
                  SHOP
                </DropdownToggle>
                <DropdownMenu right>
                  {this.renderCategory()}
                </DropdownMenu>
            </UncontrolledDropdown>
          <NavbarBrand style={{fontFamily:'Raleway, sans-serif',fontWeight:'700', fontSize:'13px'}}><Link to='/howtoorder' style={{ color:'#000000', textDecoration:'none'}}>HOW TO ORDER</Link></NavbarBrand>
          <NavbarBrand style={{fontFamily:'Raleway, sans-serif',fontWeight:'700', fontSize:'13px'}}><Link to='/about' style={{ color:'#000000', textDecoration:'none'}}>ABOUT</Link></NavbarBrand>
        </Navbar>
      </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        role : state.user.role,
        count : state.cart.count
    }
}

export default connect(mapStateToProps,{resetUser, LoginAction, resetCount, cartCount})(Header);