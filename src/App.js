import React, { Component } from 'react';
import { Route,withRouter,Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Verify from './components/Verify';
import Footer from './components/Footer';
import About from './components/About';
import Manage from './components/Admin/ManageProduct';
import ProductList from './components/ProductList';
import PageNotFound from './components/PageNotFound';
import ProductDetail from './components/ProductDetail';
import History from './components/History';
import Cart from './components/Cart';
import PaymentConfirmation from './components/PaymentConfirmation';
import cookie from 'universal-cookie';
import {keepLogin, makeCookieTrue, cartCount} from './1.actions';
import {connect} from 'react-redux';
import ScrollToTop from './components/scrollToTop';


const objCookie = new cookie()
class App extends Component {

  componentDidMount(){
    var cookie = objCookie.get('userData')
    if(cookie !== undefined || cookie === ''){
      this.props.keepLogin(cookie)
      this.props.cartCount(cookie)
    } else {
      this.props.makeCookieTrue()
    }
  }

  render() {
   if(this.props.cookie){
    return (
      <div>
          <Navbar/>
          <ScrollToTop>
          <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/register' component={Register} exact/>
          <Route path='/verify' component={Verify} exact />
          <Route path='/about' component={About} exact />
          <Route path='/manage' component={Manage} exact />
          <Route path='/getcart' component={Cart} exact />
          <Route path='/productlist/:id' component={ProductList} exact />
          <Route path='/productdetail/:id' component={ProductDetail} exact />
          <Route path='/history' component={History} exact />
          <Route path='/payment/:id' component={PaymentConfirmation} exact />
          <Route path='*' component={PageNotFound} exact/>
          </Switch>
          </ScrollToTop>
          <Footer />
        
      </div>
    );
  } return <center><h1> Loading ....</h1></center>
  }
}

const mapStateToProps = (state) => {
  return {
    cookie : state.user.cookie
  }
}

export default withRouter(connect(mapStateToProps , {keepLogin, cartCount, makeCookieTrue})(App));
