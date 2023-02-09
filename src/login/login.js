import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { getUsername } from '../services/user';
import { ToastContainer, toast } from 'react-toastify';



export default function Login() {

  const [username, setUsername] = useState(null);

  const [password, setPassword] = useState(null);

  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const notify = (message) => toast(message);


  const authenticate = () => {
    if(username === 'admin' && password === 'admin'){
      navigate("/admin/dashboard");
      localStorage.setItem("user_id", 1);
    } else {
      user.forEach((item) => {
        if(item.username === username && item.password === password){
          navigate("/user/user");
          localStorage.setItem("user_id", item.id);
        }
      })
    }
    notify("username or password is incorrect")

  }

  const navigateToRegister = () => {
    navigate("/register");
    
  }

  useEffect(() => {
    (async () => {
      setUser(await getUsername())
    })()
  }, [])

    return (
      <>
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <ToastContainer />
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
          </div>
  
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="username"
                      autoComplete="email"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
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
                    <p className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </p>
                  </div>
                </div>
  
                <div>
                  <button
                    type="button"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => authenticate()}
                  >
                    Sign in
                  </button>
                </div>
              </form>
  
              <div className="mt-6">
              <div>
                  <button
                    type="button"
                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => navigateToRegister()}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  