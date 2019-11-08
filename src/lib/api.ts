import axios from 'axios'

export default axios.create({
  baseURL: 'https://asia-east2-grader-ef0b5.cloudfunctions.net'
})
