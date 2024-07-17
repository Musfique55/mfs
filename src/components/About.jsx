import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const About = () => {
    const axiosSecure = useAxiosSecure();
    const [data,setData] = useState([]);
    useEffect(() => {
        axiosSecure.get('/services')
        .then(res => {
            setData(res.data)
        })
    },[axiosSecure])
    
    return (
        <div>
            About
        </div>
    );
};

export default About;