import React, { useEffect } from 'react'
import ProductCard from '../../components/Cards/ProductCard'
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from '../../reduxToolkit/product/productSlice'
import { clearError } from '../../reduxToolkit/product/productSlice'
import { toast } from "react-toastify"

const Homepage = () => {
    const { mockProducts, error } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const handleAddCart = async ({ productId, qty }) => {
        if (dispatch && productId && qty) {
            try {
                await dispatch(addToCart({ productId, qty })).unwrap();
                toast.success("Product added to cart successfully!")
            } catch (error) {
                toast.error(error);
            }
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [dispatch])

    return (
        <div className='w-full px-5 md:px-10'>
            <div className='w-full max-w-7xl mx-auto mt-10 flex flex-col items-center justify-center'>
                <h1 className='text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-200 text-center'>
                    Shop products that match your style — effortlessly.
                </h1>
                <p className='text-md my-4 text-zinc-600 dark:text-zinc-500 text-center'>
                    Discover what’s trending today — grab your favorites before they’re gone!
                </p>
            </div>
            <div className='w-full max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5'>
                {mockProducts.map((item) => (
                    <ProductCard
                        key={item?.id}
                        id={item?.id}
                        name={item?.name}
                        price={item?.price}
                        image={item?.image}
                        description={item?.description}
                        stock={item?.stock}
                        status={"notCart"}
                        onAddOrRemoveToCart={handleAddCart}
                    />
                ))}
            </div>
        </div>
    )
}

export default Homepage