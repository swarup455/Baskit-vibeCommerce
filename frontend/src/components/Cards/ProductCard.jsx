import React from "react";
import { useState, useEffect } from "react";

function ProductCard({ id, name, price, image, description, stock, onAddOrRemoveToCart, status, qty }) {
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        if (qty) setQuantity(qty);
    }, []);

    return (
        <div className="group flex flex-col rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 ease-in-out 
      dark:bg-zinc-800/30 bg-white p-1 sm:p-2 border border-zinc-200 dark:border-zinc-700 shadow-sm">
            <div className="w-full aspect-square rounded-lg overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="mt-3 flex flex-col grow justify-between">
                <span className="flex items-start justify-between">
                    <h3 className="text-md sm:text-lg font-semibold text-zinc-800/30 dark:text-zinc-100 line-clamp-2">
                        {name}
                    </h3>
                    <span className="text-xs flex items-center gap-1 md:gap-2 sm:text-sm bg-zinc-100 dark:bg-zinc-800 px-2 sm:px-3 py-1 sm:py-2 rounded-full border border-zinc-200 dark:border-zinc-700">
                        <p className="hidden sm:block">stock:</p>
                        {stock}
                    </span>
                </span>
                <span>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1">
                        {description}
                    </p>
                    <p className="mt-1 text-lg text-zinc-800 dark:text-zinc-200 font-semibold">
                        ₹{price}
                    </p>
                </span>
                <div className="mt-4 flex justify-center items-center gap-3">
                    {status === "cart" ?
                        <span
                            className="py-3 px-3 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg text-sm"
                        >
                            {quantity}
                        </span>
                        :
                        <select
                            id="quantity"
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="py-1 md:py-3 px-1 md:px-3 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none cursor-pointer"
                        >
                            {[1, 2, 3, 4, 5].map((q) => (
                                <option className="bg-zinc-200 dark:bg-zinc-800" key={q} value={q}>
                                    {q}
                                </option>
                            ))}
                        </select>
                    }
                    <button
                        onClick={() => onAddOrRemoveToCart({ productId: id, qty: quantity })}
                        className="flex-1 md:w-2/3 py-3 text-xs sm:text-sm font-medium rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors cursor-pointer"
                    >
                        {status === "cart" ? "Remove from cart" : "Add to cart"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;