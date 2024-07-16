import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "./useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";



const Login = () => {
    const [user,setUser] = useState(false);
    const [userInfo,setUserInfo] = useState(null);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const emailMobile = form.emailMobile.value;
        const pin = form.pin.value;
        const user = {emailMobile,pin};
        setUserInfo(user);
        axiosPublic.post('/login',user)
        .then(res => {
            if(res.data === true){
                axiosPublic.post('/jwt',user)
                .then(res => {
                    localStorage.setItem('token',res.data.token)
                    setUser(true);
                    navigate('/about')
                })
                .catch(error => {
                    console.log(error);
                })
                return Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged In Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }else{
                return Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `Error Occured`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        const {emailMobile} = userInfo;
        if(emailMobile.includes('@')){
            const currentUser = {
                emailMobile,
                available : false
            }
                axiosPublic.post('/logout',currentUser)
                .then(() => {
                 setUser(false);
            })
        }else{
            const currentUser = {
                emailMobile,
                available : false
            }
            axiosPublic.post('/logout',currentUser)
            .then(() => {
            setUser(false);
        })
        }
        
    }
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center w-2/4 bg-[#F2EEFE] border">
                <div className="bg-white rounded-xl flex flex-col items-center w-[calc(100%-30px)]">
                    <h3 className="mt-12 mb-8 text-2xl font-semibold">Sign in</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center mb-7">
                        <input type="text" name="emailMobile" placeholder="Email or Mobile" className="py-2 px-3 rounded-lg bg-[#F0F0F0] border focus:outline-none lg:min-w-[538px]" required/>
                            
                        <input  type="password" name="pin" placeholder="Pin" className="py-2 px-3 rounded-lg bg-[#F0F0F0] border focus:outline-none lg:min-w-[538px]" required/>
                        <button type="submit" className="bg-[#7B51F1] text-white font-semibold py-2 w-full rounded-lg ">Sign in</button>
                    </form>
                </div>
                <p className="font-medium text-lg text-[#5A5C5E] my-7">
                    Do Not Have an Account? <Link to={'/register'}><span className="font-semibold text-black">Sign up</span></Link>
                </p>

                {user ? <button onClick={handleLogout}>Logout</button> : ''}
            </div>
        </div>
    );
};

export default Login;