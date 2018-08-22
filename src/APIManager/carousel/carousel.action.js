import {GET} from "../../services/webApiService";

export const fetchImages = () => (dispatch) => {
    return GET('https://pixabay.com/api/?key=9656065-a4094594c34f9ac14c7fc4c39&q=beautiful+landscape&image_type=photo')
    .then(response=>{
        const _images = response.data.hits;

        dispatch({
            type: "fetch_images",
            data:_images
        })
    });
}