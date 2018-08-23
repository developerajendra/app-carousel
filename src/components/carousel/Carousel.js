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
      nextIndex:0,
      animateNext:0,
      animatePrev:0,
      containerWidth:0,
      imageWidth:0,
      isMobile:false
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
          this.setState({isMobile:true,containerWidth:_containerWidth / 2, imageWidth : _containerWidth/2});
        }else{
          this.setState({isMobile:false,imageWidth: _containerWidth / 3});
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
    let {images} = this.state;
    if(!images.length){
      return; 
    }

    const _list = images.map((data, index)=>
      <li key={index}><img src={data.imageURL} width={imageWidth} alt={data.alt} />
        <span>{data.imageTitle}</span>
       </li> 
    );
    return _list;
  }

  /**
   * previous click event
   */
  previous = () =>{
    let {animateNext,imageWidth, nextIndex } = this.state
    if(nextIndex == 0){
      return;
    }
    this.setState({  animateNext: (animateNext-5) - imageWidth,  nextIndex: nextIndex -= 1 });
  }

  /**
   * Next click  event
   */
  next = (event) =>{
    let {animateNext,imageWidth, images, nextIndex, isMobile } = this.state
    if(nextIndex>=images.length-6 && !isMobile){
      return;
    }else if(nextIndex>=images.length-1 && isMobile){
      return;
    }
    this.setState({  animateNext: imageWidth + (animateNext+5), nextIndex: nextIndex += 1});
    
  }

  render() { 
    const {imageWidth, imageGap} = this.props.options;
    const {containerWidth, animateNext} = this.state;

    return (
        <Fragment>
          <div className="container">
              <h1>Carousel Test</h1>
          </div>

          <div className="container-fluid">
            <CarouselStyle className="carousel-wrapper" witdh={containerWidth}  >
              <AnimateSlider className="carousel"  next={animateNext} > {this.renderCarousel(this.state.imageWidth || imageWidth(), imageGap)}</AnimateSlider>
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
  carouselImages: PropTypes.object
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
