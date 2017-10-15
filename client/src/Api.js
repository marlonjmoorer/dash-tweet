import axios from "axios"

export default axios.create({
   params:{token:localStorage.getItem("token")}
})