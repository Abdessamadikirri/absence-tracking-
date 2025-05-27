import { USER_LOADING,REGISTER_FAILED,REGISTER_SUCCSSED,LOGIN_FAILED,LOGIN_SUCCSSED,LOGOUT_FAILED,LOGOUT_SUCCED , GET_USER,GET_USER_FAILED} from "../action/authaction";

const intialeState={
    user: '',
    isauth:false,
    is_loading:true,
    toggle_message:false,
    message:""
}


const Authreducer =(state=intialeState,action)=>{
    switch (action.type) {
        case USER_LOADING:
            
            return{
                ...state,is_loading:action.payload
            }
        case REGISTER_SUCCSSED:
            return{
                ...state,isauth:true,user:action.payload.user,message:action.payload.message
            }
        case REGISTER_FAILED:
            return{
                ...state,isauth:false,message:action.payload
            }
        case LOGIN_SUCCSSED:
            return {
                ...state,isauth:true , user:action.payload.user,message:action.payload.message
            }
        case LOGIN_FAILED: 
        return{
            ...state,isauth:false , message:action.payload,toggle_message:true
        }
        case LOGOUT_SUCCED:
            return{
                ...state,isauth:false,message:action.payload
            }
        case  LOGOUT_FAILED:
            return{
                ...state,isauth:false ,message:action.payload
            }
        case GET_USER :
            return{
                ...state,user:action.payload,isauth:true
            }
        case GET_USER_FAILED:
            return{
                ...state,message:action.payload
            }
        default:
            return state
    }
} 

export default Authreducer