import axios from 'axios'

export default defineNuxtPlugin((NuxtApp) => {

  axios.defaults.withCredentials = true; //THIS IS TO FORCE AXIOS INSTANCES TO MAKE CROSS-SITE ACCESS-CONTROL REQUESTS WITH CREDENTIALS
  axios.defaults.baseURL = 'http://localhost:8000'

  return {
    provide:{
      axios: axios
    }
  }
})
