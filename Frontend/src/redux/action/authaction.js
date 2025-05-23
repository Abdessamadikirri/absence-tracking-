import axios from "axios";
import Cookies from "js-cookie"
 

export const USER_LOADING = 'USER_LOADING'
export const REGISTER_SUCCSSED = 'REGISTER_SUCCSSED'
export const REGISTER_FAILED = 'REGISTER_FAILED'
export const LOGIN_SUCCSSED = 'LOGIN_SUCCSSED'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOGOUT_SUCCED = 'LOGOUT_SUCCED'
export const LOGOUT_FAILED = 'LOGOUT_FAILED'
export const GET_USER = 'GET_USER'
export const GET_USER_FAILED = 'GET_USER_FAILED'

 


export const register = (formdata) =>{
    return async (dispatch)=>{
        try {
            dispatch({
                type:USER_LOADING,
                payload:true
            })
            const token =Cookies.get("XSRF-TOKEN")
            const response = await axios.post('http://localhost:8000/api/register',formdata,{headers:{"X-XSRF-TOKEN":token},withCredentials:true})
            dispatch({
                type:REGISTER_SUCCSSED,
                payload:response.data
            })
            dispatch({type:USER_LOADING,payload:false})
            return response.data
        } catch (error) {
            dispatch({
                type:REGISTER_FAILED,
                payload:error.response?.data?.message || error.message
            })
            dispatch({type:USER_LOADING,payload:false})
            return Promise.reject(error)
        }
    }

}

export const login = (formdata) =>{
    return async(dispatch)=>{
        try {
            dispatch({
                type:USER_LOADING,
                payload:true
            })
            const token =Cookies.get("XSRF-TOKEN")
            const response = await axios.post("http://localhost:8000/api/login",formdata,{headers:{"X-XSRF-TOKEN":token},withCredentials:true})
            dispatch({
                type:LOGIN_SUCCSSED,
                payload:response.data
            })

            dispatch({type:USER_LOADING,payload:false})
            return response.data
        } catch (error) {

            dispatch({
                type:LOGIN_FAILED,
                payload:error.response?.data?.message || error.message
            })
            dispatch({
                type:USER_LOADING,
                payload:false
            })
            return Promise.reject(error)
        }
    }
}

export const logout = ()=>{
    return async (dispatch)=>{
       try {
             dispatch({
                type:USER_LOADING,
                payload:true
            })
        const token = Cookies.get("XSRF-TOKEN")
        const response = await axios.post('http://localhost:8000/api/logout',{},{headers:{"X-XSRF-TOKEN":token},withCredentials:true})
         dispatch({
            type:LOGOUT_SUCCED,
            payload:response.data.message
         })
         dispatch({type:USER_LOADING,payload:false})
         
       } catch (error) {
        dispatch({
            type:LOGOUT_FAILED,
            payload:error.response?.data?.message || error.message
        })
        dispatch({type:USER_LOADING,payload:false})
         

       }
    }
}

export const user = ()=>{
    return async(dispatch)=>{
       try {
        dispatch({
                type:USER_LOADING,
                payload:true
            })
         const response = await axios.get('http://localhost:8000/api/user',{withCredentials:true})
       
        if(response.statusText){
            dispatch({type:GET_USER,payload:response.data})
        }
       } catch (error) {
         
         dispatch({type:GET_USER_FAILED,payload:error.response?.data?.message || error.message})

        
       }finally{
        dispatch({
                type:USER_LOADING,
                payload:false 
            })

       }
    }
}