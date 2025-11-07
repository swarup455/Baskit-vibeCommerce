import React, { useState, useRef } from 'react'
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import useTheme from '../../context/ThemeSwitcher';
import { NavLink } from "react-router-dom";
import { LuMenu } from "react-icons/lu";
import { useSelector } from "react-redux"
import ProfileMenu from '../Popup/ProfileMenu';
import useClickOutside from '../../customHooks/useClickOutside';
import LogoutPopup from '../Popup/LogoutPopup';

const Header = ({ onOpen, onLogoutOpen, logoutClose, logoutOpen }) => {
    const { themeMode, lightTheme, darkTheme } = useTheme();
    const { authUser } = useSelector((state) => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);
    const btnRef = useRef(null);
    const menuRef = useClickOutside(menuOpen, () => setMenuOpen(false), [btnRef]);

    return (
        <nav className='h-20 w-full border-b shadow-md border-zinc-200 dark:border-zinc-800 px-5 sticky top-0 bg-white dark:bg-neutral-900 z-10'>
            <div className='h-full w-full max-w-7xl mx-auto flex items-center'>
                <div className='h-full w-1/2 flex items-center justify-start gap-3'>
                    <button onClick={onOpen} className='cursor-pointer block md:hidden'>
                        <LuMenu size={23} />
                    </button>
                    <span className='flex items-center gap-2'>
                        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-sky-400'>
                            BasKit
                        </h1>
                        <img className='h-8 aspect-square' src="/shop.svg" alt="logo" />
                    </span>
                </div>
                <div className='h-full w-1/2 flex items-center justify-end gap-3 sm:gap-5 md:gap-8'>
                    <div className='h-full md:gap-8 hidden md:flex items-center'>
                        <NavLink to="/" className={({ isActive }) =>
                            `h-full flex items-center text-sm sm:text-[16px] ${isActive ? 'border-b-3 border-indigo-500 text-indigo-500 font-semibold' : 'border-b-3 border-transparent'
                            }`
                        }>
                            Products
                        </NavLink>
                        <NavLink to="/cart" className={({ isActive }) =>
                            `h-full flex items-center text-sm sm:text-[16px] ${isActive ? 'border-b-3 border-indigo-500 text-indigo-500 font-semibold' : 'border-b-3 border-transparent'
                            }`
                        }>
                            Checkout
                        </NavLink>
                    </div>
                    <button
                        onClick={() => themeMode === "light" ? darkTheme() : lightTheme()}
                        className='p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-pointer bg-zinc-100 dark:bg-zinc-800'>
                        {themeMode === "light" ?
                            <FiSun />
                            :
                            <FiMoon className='text-yellow-300' />
                        }
                    </button>
                    <button
                        onClick={() => setMenuOpen(true)}
                        ref={btnRef}
                        className='h-10 hidden md:block aspect-square rounded-full border border-zinc-200 dark:border-zinc-800 cursor-pointer bg-zinc-100 dark:bg-zinc-800'>
                        {authUser.fullName.charAt(0).toUpperCase()}
                    </button>
                    <ProfileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} menuRef={menuRef} logoutOpen={onLogoutOpen} />
                    <LogoutPopup isOpen={logoutOpen} onClose={logoutClose} />
                </div>
            </div>
        </nav>
    )
}

export default Header