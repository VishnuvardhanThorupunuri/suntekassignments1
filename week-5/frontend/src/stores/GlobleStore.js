import {create} from 'zustand'
import axios from 'axios'


export const useAuth=create((set)=>({
    currentUser:null,
    isAuthenticated:false,
    loading:false,
    error:null,
    login: async(userCredwithRole)=>{
        const {role, ...userCredObj} = userCredwithRole;
        try{
            //set loading true
            set({ loading:true,error:null });
            //make api call
            let res = await axios.post("http://localhost:4000/common-api/login", userCredObj);
            console.log("res is ",res);
            //update state
            set({
                loading:false,
                isAuthenticated: true,
                currentUser: res.payload
            });

        }catch(err){
            console.log("err is ",err);
            
            set({
                loading: false,
                isAuthenticated: false,
                currentUser: null,
                error: err,
            });
            
        }
    },
    logout:()=>[]
}))