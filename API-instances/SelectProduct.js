import axios from 'axios'

const SelectProduct = axios.create({
  baseURL: `https://8479d5748b7b.ngrok.io/api/selectProduct`
})

export default SelectProduct