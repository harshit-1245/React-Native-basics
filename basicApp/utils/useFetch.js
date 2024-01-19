//holding api here
import axios from "axios"

export const fetchData=async()=>{
    try {
        const response=await axios.get("http://192.168.29.163:5000/user")
        const data=await response.json()
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


