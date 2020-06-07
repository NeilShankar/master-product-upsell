import axios from 'axios'

const SelectProduct = axios.create({
  baseURL: `https://77576360c859.ngrok.io/api/selectProduct`
})

export default SelectProduct