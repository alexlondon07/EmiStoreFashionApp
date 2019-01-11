//export const BASE_API = 'http://localhost:8080/api/v1';
export const BASE_API = 'https://backend-api-rest.herokuapp.com/api/v1';

//Category
export const HTTP_CATEGORY = {
    getCategories: '/categories',
    saveCategory: '/categories',
    deleteCategory: '/category/',
    updateCategory: '/category/'
}

//Client
export const HTTP_CLIENT = {
    getClients: '/clients',
    saveClient: '/clients',
    deleteClient: '/client/',
    updateClient: '/client/'
}

//  Product
export const HTTP_PRODUCT = {
    getProducts:    '/products',
    saveProduct:    '/products',
    deleteProduct:  '/product/',
    updateProduct:  '/product/', 
    getImage:       '/products/'
}
