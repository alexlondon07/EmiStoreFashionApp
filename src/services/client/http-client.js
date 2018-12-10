import { BASE_API, HTTP_CLIENT } from './../config';
import httpBase from '../http-base';

class HttpClient {

    async getHttpClients(){
        try {
            const url  = `${ BASE_API }${ HTTP_CLIENT.getClients }`
            const data = await httpBase.baseGet(url, {});
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteHttpClient(id){
        try {
            const url  = `${ BASE_API }${ HTTP_CLIENT.deleteClient }${ id }`
            const data = await httpBase.baseDelete(url, {});
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async saveHttpClient(params){
        try {
            const url  = `${ BASE_API }${ HTTP_CLIENT.saveClient }`
            const config = {
                header: {},
                params
            }
            const data = await httpBase.basePost(url, config);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async updateHttpClient(params){
        try {
            const url  = `${ BASE_API }${ HTTP_CLIENT.updateClient }${ params.idClient }`
            const config = {
                header: {},
                params
            }
            const data = await httpBase.basePatch(url, config);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
}
export default new HttpClient;