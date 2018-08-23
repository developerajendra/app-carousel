 
export const  carouselObjectTransformer = (images) => {
    if(images && !images.userImageURL){
        return;
    }
    return {
        imageURL: images.userImageURL,
        alt: images.tags,
        imageTitle: images.user
    };
}

export const carouselArrayTransformer = (collection) => {
    if(!collection && !collection.length)
    return [];
    return collection.filter(data=> {
        if(data.userImageURL){
            return data;
        }
    }).map(data=>{
        return carouselObjectTransformer(data)
    });

    
};