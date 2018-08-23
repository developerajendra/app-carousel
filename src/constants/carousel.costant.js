export const CAROUSEL_CONFIG = {
    containerWidth:999,  
    itemsToShow: 5,
    imageGap:3,
    imageWidth: ()=>{ 
        let {containerWidth, itemsToShow, imageGap} = CAROUSEL_CONFIG;
        return Math.floor((containerWidth / itemsToShow)  - imageGap);
    }
  };