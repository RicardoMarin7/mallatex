import Axios from 'axios'

const AxiosClient = Axios.create({
    baseURL : process.env.REACT_APP_BACKEND_URL
})

export default AxiosClient