import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from './firebase'; // Adjust the path if necessary
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify'; // Optional, for notifications
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const setDummy = (e) => {
        e.preventDefault();
        setEmail("example@gmail.com");
        setPass("123456");
    }

    const validateForm = () => {
        if (!email || !pass) {
            toast.error("Please fill in all fields.");
            return false;
        }
        return true;
    };

    const signIn = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);
            const res = await axios.post("https://react-pos-backend.vercel.app/api/login", { email, password: pass });
            localStorage.setItem("userInfo", JSON.stringify(res.data.userLogin));
            localStorage.setItem("jwt", JSON.stringify(res.data.token));
            navigate("/dashboard");
            toast.success("Login successful!");
        } catch (error) {
            toast.error("Error: " + error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    const signInWithGoogle = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            localStorage.setItem("userInfo", JSON.stringify(user));
            localStorage.setItem("jwt", JSON.stringify(user.accessToken));
            navigate("/dashboard");
            toast.success("Sign-In successful!");
        } catch (error) {
            toast.error('Error signing in with Google: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex h-screen">
                <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-[#ffffff]">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <div className="flex items-center">
                                <img
                                    className="h-16 w-auto"
                                    src="https://d30w0v1mttprqz.cloudfront.net/img/features/cloud-pos/stand-pos.svg"
                                    alt="Your Company"
                                />
                            </div>

                            <h2 className="mt-6 text-3xl font-bold tracking-tight">Sign in to BillEase</h2>
                        </div>

                        <div className="mt-8">
                            <div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700">Sign in with</p>

                                    <div className="mt-1 grid grid-cols-2 gap-3">
                                        <div>
                                            <button
                                                onClick={signInWithGoogle}
                                                className="inline-flex w-full justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                                disabled={loading}
                                            >
                                                <span className="sr-only">Sign in with Google</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 488 512">
                                                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                                                </svg>
                                            </button>
                                        </div>

                                        <div>
                                            <button
                                                className="inline-flex w-full justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                                                disabled={loading}
                                            >
                                                <span className="sr-only">Sign in with Twitter</span>
                                                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative mt-6">
                                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                        <div className="w-full border-t border-gray-300" />
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <form action="#" method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                            Password
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                value={pass}
                                                onChange={(e) => setPass(e.target.value)}
                                                id="password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                                Remember me
                                            </label>
                                        </div>

                                        <div className="text-sm">
                                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            onClick={signIn}
                                            className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            disabled={loading}
                                        >
                                            {loading ? 'Signing in...' : 'Sign in'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={setDummy}
                                            className="mt-3 flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                            disabled={loading}
                                        >
                                            {loading ? 'Loading...' : 'Use Dummy Credentials'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixid=MnwzNjUyOXwwfDF8c2VhcmNofDl8fHxlbnwwfHx8fDE2MzkwOTAxMzA&ixlib=rb-1.2.1&q=85&w=1920"
                        alt=""
                    />
                </div>
            </div>
        </>
    );
}
