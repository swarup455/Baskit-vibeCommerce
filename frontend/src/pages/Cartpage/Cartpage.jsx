import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/Cards/ProductCard';
import { removeFromCart, checkoutCart } from '../../reduxToolkit/product/productSlice';
import { toast } from "react-toastify";
import ReceiptPopup from '../../components/Popup/ReceiptPopup';

const Cartpage = () => {
    const { cartProducts, totalAmount, receipt, pending } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const handleRemoveFromCart = async ({ productId }) => {
        if (productId && dispatch) {
            try {
                await dispatch(removeFromCart(productId)).unwrap();
                toast.success("Product removed from cart!!")
            } catch (error) {
                toast.error(error);
            }
        }
    };

    const handleCheckout = async () => {
        if (!cartProducts.length) {
            toast.warn("Your cart is empty!");
            return;
        }
        await dispatch(checkoutCart()).unwrap();

    };

    return (
        <div className="w-full px-5 md:px-10 min-h-[80vh]">
            {receipt && <ReceiptPopup receipt={receipt} />}
            <div className="w-full max-w-7xl mx-auto py-8">
                <div className='mb-10 text-center space-y-3'>
                    <h1 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-200">
                        Your Shopping Cart
                    </h1>
                    <p className='text-sm text-zinc-600 dark:text-zinc-400'>
                        Click proceed to checkout to buy products!
                    </p>
                </div>
                {cartProducts.length === 0 ? (
                    <p className="text-center text-zinc-600 dark:text-zinc-400 mt-10">
                        Your cart is empty. Go add some products!
                    </p>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {cartProducts.map((item) => (
                                <ProductCard
                                    key={item?.productId}
                                    id={item?.productId}
                                    name={item?.productName}
                                    price={item?.price}
                                    image={item?.image}
                                    description={item?.description}
                                    stock={item?.stock}
                                    status={"cart"}
                                    qty={item?.qty}
                                    onAddOrRemoveToCart={handleRemoveFromCart}
                                />
                            ))}
                        </div>
                        <div className="mt-10 flex flex-col text-center md:text-start md:flex-row justify-between items-center bg-white dark:bg-zinc-800/50 rounded-xl shadow-md p-5 border border-zinc-200 dark:border-zinc-700">
                            <div className="mb-4 md:mb-0">
                                <h2 className="text-lg md:text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                                    Cart Summary
                                </h2>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                                    Total Items: {cartProducts.length}
                                </p>
                                <p className="text-lg font-bold text-indigo-600 mt-2">
                                    Total Amount: ₹{totalAmount}
                                </p>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={pending}
                                className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-60 transition-all cursor-pointer"
                            >
                                {pending ? "Processing..." : "Proceed to Checkout"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Cartpage;