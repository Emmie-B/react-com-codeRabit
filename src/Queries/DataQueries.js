import { useQuery } from '@tanstack/react-query'


import { fetchProducts } from '../services/Api.js'

export const useProducts = () => {
    const {data: prd, isPending, error} =  useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    })
    
    return {prd, isPending, error }
}   