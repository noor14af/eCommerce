
import baseUrl from "../../baseUrl/BaseUrl"
import axios from "axios";
class ReagisterApi{
    relUrl=`${baseUrl}/auth/signup`;
    async addUser(params){
     return await axios.post(this.relUrl, params);
    }

}
export default new ReagisterApi();
