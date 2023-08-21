import axios from 'axios';
export const getData = (url,setter)=>{
    axios.get(url)
    .then(response => {
        setter(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}