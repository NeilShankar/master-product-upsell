import axios from 'axios'

const SelectProduct = axios.create({
  baseURL: `https://4129250fce81.ngrok.io/api/selectProduct`
})

export default SelectProduct