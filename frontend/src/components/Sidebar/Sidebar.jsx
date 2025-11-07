import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { GrHomeRounded } from "react-icons/gr";
import { LuShoppingCart } from "react-icons/lu";
import { useSelector } from "react-redux"
import { IoIosLogOut } from "react-icons/io";

const Sidebar = ({ isOpen, onClose, onLogoutOpen }) => {
    const sidebarVariants = {
        open: { x: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
        closed: { x: "-100%", transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
    };

    const backdropVariants = {
        open: { opacity: 1, transition: { duration: 0.2 } },
        closed: { opacity: 0, transition: { duration: 0.2 } }
    };
    const { authUser } = useSelector((state) => state.auth);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed h-screen inset-0 bg-black/40 z-30 md:hidden"
                        onClick={onClose}
                        variants={backdropVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <motion.aside
                            variants={sidebarVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className='fixed top-0 left-0 h-screen w-60 sm:w-72 px-3 flex flex-col border-r border-zinc-400/30 dark:border-zinc-700/30 bg-white dark:bg-zinc-900 z-40 md:hidden'
                        >
                            <button className='absolute top-3 right-3 text-gray-500 dark:text-gray-400 cursor-pointer'>
                                <RxCross2 />
                            </button>
                            <div className='py-7 flex items-center gap-3 border-b border-zinc-200 dark:border-zinc-800'>
                                <button
                                    className='h-10 aspect-square rounded-full border border-zinc-200 dark:border-zinc-800 cursor-pointer bg-zinc-100 dark:bg-zinc-800'>
                                    {authUser.fullName.charAt(0).toUpperCase()}
                                </button>
                                <span>
                                    <p className='text-md text-zinc-700 dark:text-zinc-100'>{authUser.fullName}</p>
                                    <p className='text-sm text-zinc-400 dark:text-zinc-400'>{authUser.email}</p>
                                </span>
                            </div>
                            <div className='px-3 py-5 flex flex-col gap-6'>
                                <Link to="/" className='flex items-center gap-3'>
                                    <GrHomeRounded size={18} />
                                    Products
                                </Link>
                                <Link to="/cart" className='flex items-center gap-3'>
                                    <LuShoppingCart size={20} />
                                    Checkout
                                </Link>
                            </div>
                            <div className='w-full flex-1 px-3 py-5 flex flex-col justify-end'>
                                <button
                                    onClick={onLogoutOpen}
                                    className='w-full bg-zinc-100 text-red-500 flex items-center justify-center gap-2 dark:bg-zinc-800/30 border border-zinc-200 
                                    dark:border-zinc-800 rounded-md py-2 cursor-pointer'>
                                    <IoIosLogOut size={20} />
                                    Logout
                                </button>
                            </div>
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Sidebar