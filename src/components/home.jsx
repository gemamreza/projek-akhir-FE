import React from 'react';
import {connect} from 'react-redux';
import Brands from './Brands';
import Carousel from './Carousel';


class Home extends React.Component{
    render(){
        return(
            <div>
              <Carousel />  
              <Brands />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id : state.user.id,
        role : state.user.role
    }
}

export default connect(mapStateToProps)(Home)
