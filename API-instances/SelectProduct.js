import axios from 'axios'

const SelectProduct = axios.create({
  baseURL: `https://912288751566.ngrok.io/api/selectProduct`
})

export default SelectProduct