import axios from 'axios'

const SelectProduct = axios.create({
  baseURL: `https://4b2bd71169fc.ngrok.io/api/selectProduct`
})

export default SelectProduct