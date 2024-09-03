'use client';
import {BeatLoader} from "react-spinners";
import {  useFormStatus } from "react-dom";
const LoadingMessage = () => {
    const {pending} = useFormStatus();
  return (
 pending && (
    <p className="message ml-auto text-white">
        <BeatLoader color="white"/> 
    </p>
 )
  )
}

export default LoadingMessage