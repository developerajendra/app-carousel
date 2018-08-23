import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux'
import {connect} from "react-redux";
import styled from 'styled-components';
import { keyframes } from 'styled-components';

import {fetchImages} from "../../APIManager/carousel/carousel.action"
import "./carousel.css";


const CarouselStyle = styled.section` 
    font-size: 1em;
    margin: 1em;
    border-radius: 3px;
    width: ${props=> props.witdh + 'px'}
    position: relative;
    overflow: hidden;
    margin: auto;
    min-height: 403px;
`;

 
const animate = keyframes`
  from {
    left:0;
  }
  to{
    left:  ${props=> props.witdh + 'px'}
  }
   
`;

function animation (props) {
  return keyframes`
  from{
    left:0
  }
    to {
      right: ${props.width};
    }
  `
}

 
const AnimateSlider = styled.ul`   
  transition: all ease-in-out .3s;
    display: flex;
    position: absolute;
    left:0
    width: 919px;
    padding: 0;
    transform:${props=>  `translateX(-${props.next}px)`}
  `;

class Carousel extends Component {
  

  constructor(props){
    super(props);

    this.state = {
      images:[],
      animate:false,
      animateNext:0,
      animatePrev:0,
      containerWidth:0,
      itemsToShow:0,
      imageWidth:0,
      imageGap:0
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
     
    const {containerWidth, itemsToShow, imageWidth, imageGap} =  this.props.options;
 

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
          this.setState({imageWidth : _containerWidth});
        }else{
          this.setState({imageWidth: _containerWidth / 3});
        }
      }else{
        this.setState({containerWidth: containerWidth, imageWidth:imageWidth() });
      }
    }



  
    window.onresize = ()=>{
      calculateWidth()
     };
     calculateWidth();

  }
  
  renderCarousel = (imageWidth, imageGap) => {
    let _list =  this.state.images && this.state.images.length && this.state.images.map((data, index)=>
      {return data.userImageURL && <li key={index}><img src={data.userImageURL} width={imageWidth} alt={data.tags} /> </li>}
    );
    return _list;
  }

  previous = () =>{
    let {animateNext,imageWidth } = this.state
    this.setState({  animateNext: (animateNext-5) - imageWidth });
  }

  /**
   * Next click 
   */
  next = (event) =>{
    let {animateNext,imageWidth } = this.state
    this.setState({  animateNext: imageWidth + (animateNext+5) });
  }

  render() { 
    const {containerWidth, imageWidth, imageGap} = this.props.options;

    return (
        <Fragment>
          <h1 style={{textAlign:'center', paddingTop: 50}}>Carousel</h1>
          <CarouselStyle witdh={this.state.containerWidth}  >
            <AnimateSlider className="carousel"  next={this.state.animateNext} > {this.renderCarousel(this.state.imageWidth || imageWidth(), imageGap)}</AnimateSlider>
            <div className="controls">
              <button class="btn btn-primary" onClick={(event)=>this.previous(event)}>Previous</button>
              <button class="btn btn-primary" onClick={(event)=>this.next(event)}>Next</button>
            </div>
          </CarouselStyle>
         </Fragment>
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
