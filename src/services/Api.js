export const API_BASE_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {

    try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;

    }

}