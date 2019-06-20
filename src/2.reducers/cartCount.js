const INITIAL_STATE = {count : 0, loading : false}

export default(state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'CART_COUNT':
            return {count : action.payload}
        case 'RESET_COUNT':
            return INITIAL_STATE
        case 'LOADING':
            return {...INITIAL_STATE, loading : true}
        default:
            return state
    }
}