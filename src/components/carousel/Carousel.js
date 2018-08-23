import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux'
import {connect} from "react-redux";
import PropTypes from 'prop-types';

/**
 * Local & custom imports
 */
import {fetchImages} from "../../APIManager/carousel/carousel.action"
import "../common/button/Button"
import  "./carousel.css";
import {CarouselStyle, AnimateSlider} from "./customStyle";
import {Button} from "../common";

class Carousel extends Component {
  constructor(props){
    super(props);
    this.state = {
      images:[],
      animate:false,
      animateNext:0,
      animatePrev:0,
      containerWidth:0,
      imageWidth:0
    }
  }
   
  
  componentDidMount(){
    let {carouselImages, actions, options} = this.props;
    actions.fetchImages()
    .then(data=>{
      this.setState({images:data});
    });
    this.resizeCarousel();
  }

  /**
   * Adjust container width on resize of browser
   */
  resizeCarousel() {
    const {options} = this.props;    
    const {containerWidth, imageWidth} =  this.props.options;
 
    /**
     * Common set state    
     */
    let setState = (type,value)=>{
      this.setState({
          type:value
      });
    }

    /**
     * calculate brower width for responsive
     */
    let calculateWidth = () =>{
      if(window.innerWidth <= options.containerWidth){
        let _containerWidth = window.innerWidth - 40;
        this.setState({containerWidth:_containerWidth});
         
        if(window.innerWidth<=768){
          this.setState({containerWidth:_containerWidth / 2, imageWidth : _containerWidth/2});
        }else{
          this.setState({imageWidth: _containerWidth / 3});
        }
      }else{
        this.setState({containerWidth: containerWidth, imageWidth:imageWidth() });
      }
    }


    /**
     * window browser resize event
     */
    window.onresize = ()=>{
      calculateWidth()
     };
     calculateWidth();
  }
  
  /**
   * Rendering the carousel list
   */
  renderCarousel = (imageWidth, imageGap) => {
    let _list =  this.state.images && this.state.images.length && this.state.images.map((data, index)=>
      {return data.userImageURL && 
      <li key={index}><img src={data.userImageURL} width={imageWidth} alt={data.tags} />
        <span>{data.user}</span>
       </li>}
    );
    return _list;
  }

  /**
   * previous click event
   */
  previous = () =>{
    let {animateNext,imageWidth } = this.state
    this.setState({  animateNext: (animateNext-5) - imageWidth });
  }

  /**
   * Next click  event
   */
  next = (event) =>{
    let {animateNext,imageWidth } = this.state
    this.setState({  animateNext: imageWidth + (animateNext+5) });
  }

  render() { 
    const {containerWidth, imageWidth, imageGap} = this.props.options;

    return (
        <Fragment>
          <div className="container">
              <h1>Carousel Test</h1>
          </div>
          
          <div className="container-fluid">
            <CarouselStyle className="carousel-wrapper" witdh={this.state.containerWidth}  >
              <AnimateSlider className="carousel"  next={this.state.animateNext} > {this.renderCarousel(this.state.imageWidth || imageWidth(), imageGap)}</AnimateSlider>
            </CarouselStyle>
          </div>

          <div className="controls">
              <Button type="prev" text="Prev" onClick={this.previous} />
              <Button type="next" text="Next" onClick={this.next} />
          </div>
          
         </Fragment>
      );
  }
};

/**
 * Property type
 */
Carousel.propTypes = {
  options:PropTypes.object,
  containerWidth: PropTypes.number,
  imageWidth: PropTypes.number,
  imageGap: PropTypes.number,
  carouselImages: PropTypes.array
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
