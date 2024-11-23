import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function errorToast(data){
    console.log(data)
        toast.error(String(data))
    
}


export function successToast(data){
    toast.success(data)
}