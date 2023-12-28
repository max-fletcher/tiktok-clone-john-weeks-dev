import axios from 'axios'

export default defineNuxtPlugin((NuxtApp) => {

  axios.defaults.withCredentials = true; //THIS IS TO FORCE AXIOS INSTANCES TO MAKE CROSS-SITE ACCESS-CONTROL REQUESTS WITH CREDENTIALS
  axios.defaults.withXSRFToken = true;
  axios.defaults.baseURL = 'http://localhost:8000'

  axios.defaults.headers.common['Accept'] = `application/json`;
  axios.defaults.headers.common['Content-Type'] = `application/json`;

  axios.interceptors.request.use(
    (config) => {
      // USING LOCAL STORAGE TO STORE AUTH TOKEN. THIS WORKS IF WE SEND 'auth_token' IN RESPONSE BODY
      // let auth_token = localStorage.getItem('auth_token');
      // console.log('request_interceptor_auth_token', localStorage.getItem('auth_token'), auth_token);

      // NEEDS FIXING
      // USING COOKIE TO STORE AUTH TOKEN. THIS WORKS IF WE SEND 'auth_token' AS COOKIE FROM BACKEND
      // console.log(auth_token_cookie);


      // if(auth_token) {
      //   config.headers['Authorization'] = `Bearer ${auth_token}`;
      // }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use((response) => {
    // console.log('from interceptor', response);
    // if(response.data.auth_token)
    //   localStorage.setItem('auth_token', response.data.auth_token)
      // console.log('auth_token_stored', localStorage.getItem('auth_token'))

    return response;
  }, function (error) {
    return Promise.reject(error);
  });

  return {
    provide:{
      axios: axios
    }
  }
})
