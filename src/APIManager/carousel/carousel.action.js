import {GET} from "../../services/webApiService";
import {BASE_URL, API_KEY} from "../../services/APIURLs";

import {carouselArrayTransformer} from "./carousel.transformer";

export const fetchImages = (options) => (dispatch) => {
    const options = {
        config:"q=beautiful+landscape&image_type=photo"
    }
    const URL = `${BASE_URL}/?key=${API_KEY}&${options.config}`;
    return GET(URL)
    .then(response=>{
        const _images = carouselArrayTransformer(response.data.hits);
        dispatch({
            type: "fetch_images",
            data:_images
        });
        return _images;
    });
}