import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import {connect} from "react-redux";
import { SSL_OP_PKCS1_CHECK_1 } from 'constants';

import {fetchImages} from "../../APIManager/carousel/carousel.action"

class Carousel extends Component {
  componentDidMount(){
    this.props.actions.fetchImages();
    
  }
  render() {
    console.log(this.props.carouselImages)
    return (
       <h1>Carousel</h1>
    );
  }
}

const mapStateToProps = state => ({
  carouselImages: state.carouselImages
});

const mapDispatchToProps = dispatch =>({
  actions:bindActionCreators({
    fetchImages
  }, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Carousel);
