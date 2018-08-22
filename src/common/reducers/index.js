import { combineReducers } from 'redux';

import {CarouselImages} from "../../APIManager/carousel/carousel.reducer";

const rootReducer = combineReducers({
    carouselImages:CarouselImages
});
  
export default rootReducer;