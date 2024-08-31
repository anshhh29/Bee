import React, { useState, useRef, Fragment } from 'react';
import { motion } from "framer-motion";
import { Dialog, Transition } from '@headlessui/react';
import { UserIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCustomer } from '../store/customerSlice';

const table = [
    { id: 0, title: "Table 1", status: "Vacant" },
    { id: 1, title: "Table 2", status: "Vacant" },
    { id: 2, title: "Table 3", status: "Vacant" },
    { id: 3, title: "Table 4", status: "Booked" },
    { id: 4, title: "Table 5", status: "Vacant" },
    { id: 5, title: "Table 6", status: "Vacant" },
    { id: 6, title: "Table 7", status: "Vacant" },
    { id: 7, title: "Table 8", status: "Vacant" },
    { id: 8, title: "Table 9", status: "Vacant" },
    { id: 9, title: "Table 10", status: "Vacant" },
    { id: 10, title: "Table 11", status: "Vacant" },
    { id: 11, title: "Table 12", status: "Vacant" },
    { id: 12, title: "Table 13", status: "Vacant" },
    { id: 13, title: "Table 14", status: "Vacant" },
    { id: 14, title: "Table 15", status: "Vacant" },
    { id: 15, title: "Table 16", status: "Vacant" },
];

const bgarr = ["#203688", "#5b45b0", "#8a9dad", "#1d2569", "#EB6440", "#f987c4", "#4C0033", "#434242", "#5b45b0", "#1d2569", "#00a183", "#3C2A21", "#7F167F", "#9C254D", "#735F32", "#285430"];

const Tables = ({ onClick }) => {
    const customer = useSelector(state => state.customer);
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState(null);
    const [open, setOpen] = useState(false);
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const cancelButtonRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const allEvents = (id) => {
        if (customer.length !== 0) {
            onClick();
        }
        setOpen(true);
        setSelectedId(id);
    };

    const next = () => {
        const { name, phone, email } = customerDetails;

        // Check if any field is empty
        if (!name || !phone || !email) {
            toast.error("Please enter all the details.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored" // This will make the toast more prominent with bright colors
            });
            return;
        }

        // Email validation regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com|hotmail\.com|live\.com|icloud\.com)$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address with allowed domains.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored" // Ensures high visibility of the toast
            });
            return;
        }

        setOpen(false);
        dispatch(addCustomer({ ...customerDetails, tableNum: table[selectedId]?.title }));
        onClick();
    };

    return (
        <div>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2 p-3'>
                {table.map((curr, i) => (
                    <motion.div 
                        key={curr.id} 
                        style={{ backgroundColor: bgarr[i] }} 
                        whileHover={{ backgroundColor: "#1f2544" }} 
                        onClick={() => allEvents(curr.id)} 
                        className='flex justify-between p-3 cursor-pointer text-[#dfe3f4]'
                    >
                        <div className='flex flex-col items-start justify-between pl-4 font-bold h-[135px] space-y-5'>
                            <div>
                                <h3 className='text-2xl'>{curr.title}</h3>
                            </div>
                            <div className='flex flex-row items-center space-x-2'>
                                <p className='text-xs font-normal'>Status</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                                <p className='text-xs font-bold'>{curr.status}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <UserIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                Customer Details <small>of {table[selectedId]?.title}</small>
                                            </Dialog.Title>
                                            <div className="mt-2 space-y-3">
                                                <input 
                                                    name="name" 
                                                    value={customerDetails.name} 
                                                    onChange={handleInputChange} 
                                                    className='border border-gray-200 outline-none px-5 py-2 text-sm' 
                                                    type="text" 
                                                    placeholder='Full name'
                                                />
                                                <input 
                                                    name="phone" 
                                                    value={customerDetails.phone} 
                                                    onChange={handleInputChange} 
                                                    className='border border-gray-200 outline-none px-5 py-2 text-sm' 
                                                    type="number" 
                                                    placeholder='Phone'
                                                />
                                                <input 
                                                    name="email" 
                                                    value={customerDetails.email} 
                                                    onChange={handleInputChange} 
                                                    className='border border-gray-200 outline-none px-5 py-2 text-sm' 
                                                    type="email" 
                                                    placeholder='Email'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:text-sm"
                                            onClick={next}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            <ToastContainer />
        </div>
    );
};

export default Tables;
