import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { clearReceipt } from "../../reduxToolkit/product/productSlice";

const ReceiptPopup = ({ receipt, isOpen, on }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (!receipt) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
            >
                <motion.div
                    className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-700"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                        duration: 0.05,
                    }}>
                    <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
                        ✅ Order Successful!
                    </h2>
                    <div className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 mb-4">
                        <p className="text-zinc-600 dark:text-zinc-400">
                            <span className="font-semibold dark:text-zinc-300 text-zinc-800">Order ID:</span> {receipt.orderId}
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            <span className="font-semibold dark:text-zinc-300 text-zinc-800">Date:</span>{" "}
                            {new Date(receipt.timestamp).toLocaleString()}
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            <span className="font-semibold dark:text-zinc-300 text-zinc-800">Customer:</span>{" "}
                            {receipt.customer.name} ({receipt.customer.email})
                        </p>
                    </div>
                    <div className="border-t border-b border-zinc-200 dark:border-zinc-700 py-4 mb-4">
                        <h3 className="text-lg font-semibold mb-3 text-zinc-800 dark:text-zinc-200">
                            Purchased Items:
                        </h3>
                        <div className="space-y-2">
                            {receipt.items.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex justify-between text-sm md:text-base text-zinc-700 dark:text-zinc-300"
                                >
                                    <span>
                                        {item.productName} × {item.qty}
                                    </span>
                                    <span>₹{item.lineTotal}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                            <span>Subtotal:</span>
                            <span>₹{receipt.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                            <span>Shipping:</span>
                            <span>₹{receipt.shipping}</span>
                        </div>
                        <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                            <span>Taxes:</span>
                            <span>₹{receipt.taxes}</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold text-indigo-600 mt-2">
                            <span>Total:</span>
                            <span>₹{receipt.total}</span>
                        </div>
                    </div>
                    <p className="text-xs text-center text-zinc-500 dark:text-zinc-400 mb-6">
                        {receipt.note}
                    </p>
                    <div className="flex justify-center">
                        <button
                            onClick={() => {navigate("/"), dispatch(clearReceipt())}}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ReceiptPopup;