
const initialState = [];

export const  CarouselImages = (state = initialState, action) => {
    switch (action.type) {
        case 'fetch_images':
        return {...state,images:action.data}
            
        default:
            return {...state};
    }
    
};