import { BASE_API, HTTP_PRODUCT } from './../config';
import httpBase from '../http-base';

class HttpProduct {

    async getHttpProducts(){
        try {
            const url  = `${ BASE_API }${ HTTP_PRODUCT.getProducts }`
            const data = await httpBase.baseGet(url, {});
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteHttpProduct(id){
        try {
            const url  = `${ BASE_API }${ HTTP_PRODUCT.deleteProduct }${ id }`
            const data = await httpBase.baseDelete(url, {});
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async saveHttpProduct(params){
        try {
            const url  = `${ BASE_API }${ HTTP_PRODUCT.saveProduct }`
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

    async updateHttpProduct(params){
        try {
            const url  = `${ BASE_API }${ HTTP_PRODUCT.updateProduct }${ params.idProduct }`
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

    getUrlImage(id){
        try {
            const url  = `${ BASE_API }${ HTTP_PRODUCT.getImage }${ id }${ '/images' }`
            return url;
        } catch (error) {
            console.log(error);
        }
    }
}
export default new HttpProduct;