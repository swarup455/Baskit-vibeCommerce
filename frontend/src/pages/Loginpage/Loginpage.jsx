import React, { useEffect, useState } from 'react'
import { ImSpinner8 } from "react-icons/im";
import { loginUser, signupUser } from '../../reduxToolkit/auth/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"
import { clearMessage, clearError } from '../../reduxToolkit/auth/authSlice';

const Loginpage = () => {
    const [currState, setCurrState] = useState("login");
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { pending, error, message } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleSubmit = async (e, userData) => {
        e.preventDefault();
        if (currState === "login") {
            if (email && password) {
                try {
                    await dispatch(loginUser({ email, password })).unwrap();
                    toast.toast(message);
                    clearMessage();
                } catch (error) {
                    toast.error(error);
                    clearError();
                }
            } else {
                toast.error("both email and password required!")
            }
        } else {
            if (fullname && email && newPassword && newPassword === confirmPassword) {
                try {
                    await dispatch(signupUser({ fullName: fullname, email, password:newPassword })).unwrap();
                    toast.toast(message);
                    clearMessage();
                } catch (error) {
                    toast.error(error);
                    clearError();
                }
            } else if (newPassword !== confirmPassword) {
                toast.error("Confirm password mismatched!!");
            } else {
                toast.error("All fields are required!!")
            }
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            clearError();
        }
    }, [])

    return (
        <div className='fixed inset-0 flex items-center justify-center'>
            <div className='min-h-130 w-full max-w-md border rounded-2xl border-zinc-300 dark:border-zinc-700 py-10 px-5 overflow-hidden mx-5'>
                <h1 className='text-2xl mx-auto my-3 text-center'>{currState === "login" ? "Welcome Back" : "Welcome to SlotSwapper"}</h1>
                <p className='text-zinc-500 text-center my-5'>
                    {currState === "login" ? "Welcome back! please enter your details" : "Create a new account by entering details"}
                </p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    {currState === "signup" &&
                        <input
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder='Enter Fullname'
                            className='w-full bg-zinc-100 dark:bg-zinc-700/30 border border-zinc-300 dark:border-zinc-700 p-3 rounded-xl focus:outline-none'
                        />
                    }
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter Email'
                        className='w-full bg-zinc-100 dark:bg-zinc-700/30 border border-zinc-300 dark:border-zinc-700 p-3 rounded-xl focus:outline-none'
                    />
                    {currState === "login" &&
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter Password'
                            className='w-full bg-zinc-100 dark:bg-zinc-700/30 border border-zinc-300 dark:border-zinc-700 p-3 rounded-xl focus:outline-none'
                        />
                    }
                    {currState === "signup" &&
                        <input
                            type="text"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder='New Password'
                            className='w-full bg-zinc-100 dark:bg-zinc-700/30 border border-zinc-300 dark:border-zinc-700 p-3 rounded-xl focus:outline-none'
                        />
                    }
                    {currState === "signup" &&
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirm Password'
                            className='w-full bg-zinc-100 dark:bg-zinc-700/30 border border-zinc-300 dark:border-zinc-700 p-3 rounded-xl focus:outline-none'
                        />
                    }
                    <div className='w-full flex flex-col gap-5'>
                        <div className='w-full'>
                            <button type="submit"
                                className='w-full flex items-center justify-center gap-3 text-white bg-violet-500 border border-zinc-300 dark:border-zinc-700 p-3 rounded-xl cursor-pointer'
                            >
                                {pending && <ImSpinner8 size={15} className='animate-spin' />}
                                {currState === "login" ? "Sign In" : "Sign Up"}
                            </button>
                            <p className='w-full p-3 gap-2 flex justify-center items-center text-sm text-zinc-800 dark:text-zinc-500'>
                                {currState === "signup" ? "Already have an account?" : "Don't have an account?"}
                                <button
                                    type="button"
                                    onClick={() => setCurrState(currState === "login" ? "signup" : "login")}
                                    className='cursor-pointer font-semibold text-red-500'>
                                    {currState === "login" ? "Register" : "Login"}
                                </button>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Loginpage