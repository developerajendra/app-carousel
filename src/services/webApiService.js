import axios from 'axios';
  
 
const GET = (URL,  options = null) => {
    return axios.get(URL,options);
};

export { GET };
export default axios;

