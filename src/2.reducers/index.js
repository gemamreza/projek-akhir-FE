import userReducers from './userReducers';
import cartCount from './cartCount';
import { combineReducers } from 'redux';

export default combineReducers({
    user : userReducers,
    cart : cartCount
})