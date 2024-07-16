import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "./useAxiosPublic";
import { Link } from "react-router-dom";

const Register = () => {
    const [error,setError] = useState('');

    const axiosPublic = useAxiosPublic();
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const number = form.number.value;
        const pin = form.pin.value;   
        if (/^\d+$/.test(pin)) {
            if(pin.length === 5){
                console.log(true);
                const user = {
                    name,
                    email,
                    number,
                    pin
                }
                axiosPublic.post('/users',user)
                .then(res => {
                    if(res.data.insertedId){
                        return Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "You have registered successfully",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            }else{
                setError('Pin Must be 5 digits');
                return Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${error}`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        else{
            return Swal.fire({
                position: "center",
                icon: "error",
                title: "Pin must be number",
                showConfirmButton: false,
                timer: 1500
              });
        }

    }
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center w-2/4 bg-[#F2EEFE] border">
                <div className="bg-white rounded-xl flex flex-col items-center w-[calc(100%-30px)]">
                    <h3 className="mt-12 mb-8 text-2xl font-semibold">Sign Up</h3>
                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center mb-7">
                        <input type="text" name="name" placeholder="Full Name" className="py-2 px-3 rounded-lg bg-[#F0F0F0] border focus:outline-none lg:min-w-[538px]" required/>
                        <input type="email" name="email" placeholder="Email" className="py-2 px-3 rounded-lg bg-[#F0F0F0] border focus:outline-none lg:min-w-[538px]" required/>
                        <input type="text" name="number" placeholder="Number" className="py-2 px-3 rounded-lg bg-[#F0F0F0] border focus:outline-none lg:min-w-[538px]" required/>
                        
                        <input  type="password" name="pin" placeholder="Pin" className="py-2 px-3 rounded-lg bg-[#F0F0F0] border focus:outline-none lg:min-w-[538px]" required/>
                        <button type="submit" className="bg-[#7B51F1] text-white font-semibold py-2 w-full rounded-lg ">Register</button>
                    </form>
                </div>
                <p className="font-medium text-lg text-[#5A5C5E] my-7">
                    Already Have an Account? <Link to={'/signin'}><span  className="font-semibold text-black">Sign in</span></Link>
                </p>
            </div>
        </div>
    );
};

export default Register;