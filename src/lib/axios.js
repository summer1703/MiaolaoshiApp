import axios from 'axios';
// import router from '../router';

// const instance = axios.create({
// 	baseURL: 'http://192.168.0.106:8080',
// 	headers: {
// 		authorization: 'Bearer ' + localStorage.token
// 	}
// })
const instance = axios.create({
  
  //baseURL: 'http://172.20.10.8:8080',
  baseURL: 'http://192.168.0.107:8080',
	headers: {
		authorization: 'Bearer ' + localStorage.token
	}
})
instance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    if(error.response.status == 401){
    	location.hash = '/login';
    }
  });
export default instance;