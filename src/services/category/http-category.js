import { BASE_API, HTTP_CATEGORY } from './../config';
import httpBase from '../http-base';

class HttpCategory {

    async getHttpCategories(){
        try {
            const url  = `${ BASE_API }${ HTTP_CATEGORY.getCategories }`
            const data = await httpBase.baseGet(url, {});
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async saveHttpCategories(params){
        try {
            const url  = `${ BASE_API }${ HTTP_CATEGORY.saveCategory }`
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
}

export default new HttpCategory;