import { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import 'react-toastify/dist/ReactToastify.css';
import { updateUserData, updateUserPhone } from '../services/user';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import OTP from './components/opt';
import { ToastContainer, toast } from 'react-toastify';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
    ChevronDownIcon,
} from '@heroicons/react/20/solid'
import { countries } from '../constants/countries'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const navigation = [
    { name: 'User Dashboard', href: '/user/user/', current: false },
    { name: 'User Details', href: '/user/user-details/', current: true },
    { name: 'Upload File', href: '/user/upload-file/', current: false }
]



function UserDetail() {

    const navigate = useNavigate();
    const location = useLocation();
    const user_data = location.state.user
    const phone = location.state.phone

    const [user, setUser] = useState(false);
    const [open, setOpen] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [selected, setSelected] = useState("")

    let code = "+91"


    const toggleAddEditModal = () => {
        setOpen(!open)
        return;
    }


    const firebaseConfig = {
        apiKey: "AIzaSyDSEnkYVUblAdfLWikT-_zzt8a_1flxAGE",
        authDomain: "sample-5cf69.firebaseapp.com",
        projectId: "sample-5cf69",
        storageBucket: "sample-5cf69.appspot.com",
        messagingSenderId: "118450696622",
        appId: "1:118450696622:web:a80a33a134babad44b183f",
        measurementId: "G-6M7EV4M20Z"
    };

    firebase.initializeApp(firebaseConfig);


    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    const auth = firebase.auth();

    auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        }
    });

    const sample = (input_code) => {
        code = input_code
        return
    }

    const notify = (message) => toast(message);

    const updateAddress = (e) => {
        e.preventDefault();
        console.log(e.target.address.value)
        updateUserData("address", e.target.address.value, localStorage.getItem("user_id"))
        notify("User Details Updated")
    }

    const updateEmail = (e) => {
        e.preventDefault();
        updateUserData("email", e.target.email.value, localStorage.getItem("user_id"))
        notify("User Details Updated")
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        console.log("selected text", code)

        let phone_number = code + e.target.phone.value;
        const appVerifier = window.recaptchaVerifier;

        const is_phone_available = phone.filter((item, index) => e.target.phone.value === item.phone && item.is_verified === 1)

        if (is_phone_available.length > 0) {
            notify("phone number already available")
            return;
        }

        const get_empty_number = phone.filter((item, index) => item.phone === "" && item.is_verified === 0)


        if (get_empty_number.length === 0) {
            notify("user limit is full")
            return;
        }

        auth
            .signInWithPhoneNumber(phone_number, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                console.log("otp sent");
                window.confirmationResult = confirmationResult;
                setPhoneNumber(e.target.phone.value)
                toggleAddEditModal()
                // ...
            })
            .catch((error) => {
                // Error; SMS not sent
                // ...
                alert(error.message);
            });
    };

    const otpSubmit = (e) => {
        e.preventDefault();
        let opt_number = e.target.otp_value.value;
        const get_empty_number = phone.filter((item, index) => item.phone === "" && item.is_verified === 0)

        window.confirmationResult
            .confirm(opt_number)
            .then((confirmationResult) => {
                console.log(confirmationResult);
                console.log("success");
                updateUserPhone(code, phoneNumber, get_empty_number[0].id)
                toggleAddEditModal()
                notify("phone number updated successfully")
                handleBack()
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                alert(error.message);
            });
    };


    const handleLogout = () => {
        window.location.href = "http://localhost:3000/";
    }

    const handleBack = () => {
        navigate("/user/user/");
    }



    useEffect(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: function (response) {
                    console.log("Captcha Resolved");
                    this.onSignInSubmit();
                },
                defaultCountry: "IN",
            }
        );
    }, [])

    const CountryCodeDropdown = () => {
        return (
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        {code}
                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <div className="py-1 h-40 overflow-y-auto">
                            {countries && countries.map((item) => {
                                return (
                                    <Menu.Item onClick={() => sample(item.dial_code)}>
                                        {({ active }) => (
                                            <button
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'group flex items-center px-4 py-2 text-sm'
                                                )}
                                            >
                                                {item.dial_code + " " + item.name}
                                            </button>
                                        )}
                                    </Menu.Item>

                                )
                            })}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        )
    }


    console.log("selected", selected)

    return (
        <div className="min-h-full">
            {open && <OTP toggleAddEditModal={toggleAddEditModal} otpSubmit={otpSubmit} />}
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-8 w-8"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-900 text-white'
                                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                        'px-3 py-2 rounded-md text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <button type="button" class="my-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    onClick={handleLogout}>Logout</button>

                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block px-3 py-2 rounded-md text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <header className="bg-white shadow-sm">
                <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-lg font-semibold leading-6 text-gray-900">User Details</h1>
                </div>
            </header>
            <main className='mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8'>
                <button type="button" class="float-rigth inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => handleBack()}>Back</button>

                <div class="my-3 space-y-8 divide-y divide-gray-200 border rounded-lg">
                    <div class="p-3 space-y-8 divide-y divide-gray-200 sm:space-y-5">

                        <div class="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                            <div>
                                <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
                                <p class="mt-1 max-w-2xl text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                            </div>
                            <div class="space-y-6 sm:space-y-5">
                                <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="name" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Name</label>
                                    <div class="mt-1 sm:col-span-2 sm:mt-0">
                                        <input type="text" name="name" id="name" autocomplete="given-name" class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm" defaultValue={user_data.name} />
                                    </div>
                                </div>

                                <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="address" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">address</label>
                                    <div class="mt-1 sm:col-span-2 sm:mt-0">
                                        <form id="loginForm" onSubmit={updateAddress}>
                                            <input type="text" name="address" id="address" autocomplete="address" class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm" defaultValue={user_data.address} />

                                            <button
                                                type="submit"
                                                className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Save
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                    <label for="email" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">Email address</label>
                                    <div class="mt-1 sm:col-span-2 sm:mt-0">
                                        <form id="loginForm" onSubmit={updateEmail}>
                                            <input id="email" name="email" type="email" autocomplete="email" class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" defaultValue={user_data.email} />
                                            <button
                                                type="submit"
                                                className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                Save
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                {phone && phone.map((item, index) => (
                                    <>
                                        <div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label for="email" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">{`Phone ${index + 1}`}</label>


                                            <div class="mt-1 flex flex-row">
                                                {item.is_verified === 0 && <div className='-mt-2'>{CountryCodeDropdown()}</div>}
                                                <div className='ml-3'>
                                                    <form id="loginForm" onSubmit={loginSubmit}>

                                                        <div className="input-field">
                                                            <input
                                                                type="text"
                                                                placeholder="Phone"
                                                                name="phone"
                                                                autoComplete="false"
                                                                defaultValue={item.phone}
                                                                disabled={item.is_verified === 1 ? true : false}
                                                            />
                                                        </div>
                                                        {item.is_verified === 0 && <button className="main-button" type="submit" id="sign-in-button">
                                                            Send OTP
                                                        </button>
                                                        }
                                                    </form>
                                                </div>

                                            </div>
                                        </div>
                                    </>
                                ))}
                                <><div id="recaptcha-container"></div></>


                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </main>
        </div>

    )
}

export default UserDetail;