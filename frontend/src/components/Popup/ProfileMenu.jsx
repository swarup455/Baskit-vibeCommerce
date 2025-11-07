import React, { useState } from 'react'
import { MdLogout } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector } from "react-redux"

function ProfileMenu({ isOpen, onClose, logoutOpen, menuRef: profileRef }) {
    const { authUser } = useSelector((state) => state.auth);

    const handleLogoutPopup = () => {
        logoutOpen();
        onClose();
    }
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        ref={profileRef}
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className='w-50 rounded-2xl bg-white dark:bg-zinc-900 absolute z-50 top-16 
                        right-8 sm:right-10 md:right-11 lg:right-15 2xl:right-38 p-2 flex flex-col 
                        border border-zinc-300/50 dark:border-zinc-700/50 shadow-md'
                    >

                        <div className='flex flex-col p-3 rounded-xl items-center justify-center dark:bg-zinc-800/30 bg-zinc-200/30
                        border border-zinc-300/50 dark:border-zinc-700/50 cursor-pointer'>
                            <span className='p-3 aspect-square flex items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800'>
                                {authUser.fullName.charAt(0).toUpperCase()}
                            </span>
                            <p className='text-base font-semibold text-zinc-700 dark:text-zinc-200 mb-1'>
                                Welcome {authUser?.fullName?.split(" ")[0]?.toLowerCase().trim()}
                            </p>
                            <p className='text-sm text-zinc-500 dark:text-zinc-400'>{authUser?.email}</p>
                        </div>

                        <nav className='mt-2'> 
                            <button
                                onClick={handleLogoutPopup}
                                className='w-full flex items-center gap-3 px-2 py-2.5 rounded-lg
                                        text-zinc-600 dark:text-zinc-400 font-medium text-sm
                                        hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 
                                        transition-colors cursor-pointer'
                            >
                                <MdLogout size={20} />
                                <span>Logout</span>
                            </button>
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default ProfileMenu