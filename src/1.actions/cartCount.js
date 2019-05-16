import Axios from "axios";


export const cartCount = (int) => {
    return (dispatch) => {
            Axios.get('http://localhost:2000/product/getCount?username=' + int)
            .then((res) => {
                dispatch({
                    type : 'CART_COUNT',
                    payload : res.data[0].count
                })
            })
        }
    }


export const resetCount = () => {
    return{
        type : 'RESET_COUNT'
    }
}