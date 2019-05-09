import { BASE_API, HTTP_CATEGORY } from './../config';
import httpBase from '../http-base';
import axios from 'axios';

class HttpCategory {

    async getHttpCategories(){
        axios.get(`${ BASE_API }${ HTTP_CATEGORY.getCategories }`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
    }

    async deleteCategory(id){
        try {
            const url  = `${ BASE_API }${ HTTP_CATEGORY.deleteCategory }${ id }`
            const data = await httpBase.baseDelete(url, {});
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

    async updateHttpCategory(params){
        try {
            const url  = `${ BASE_API }${ HTTP_CATEGORY.updateCategory }${ params.ideCategory }`
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

export default new HttpCategory;