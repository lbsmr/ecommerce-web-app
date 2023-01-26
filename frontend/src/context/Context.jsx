import React, {createContext,useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode';
import AxiosInstance from '../util/Axios.jsx';

const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn,setLoggedIn] = useState(false);
    const [roleAndId,setRoleAndId] = useState({});

    async function getLoggedIn(){
        const loggedInRes = await AxiosInstance.get('/loggedIn',{withCredentials:true,headers:{'access-token': sessionStorage.getItem('access-token')}});
        if(loggedInRes.data !== true){
            setLoggedIn(false);
        }else{
            setLoggedIn(true);
        }
    }
    
    async function getRoleAndId(){
        try {
            const token = jwt_decode(sessionStorage.getItem('access-token'));
            console.log(token.id)
            console.log(token.role)
            setRoleAndId({'id':token.id,'role':token.role})
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=>{
        getLoggedIn();
        getRoleAndId();
    },[]);

    return(
        <AuthContext.Provider value = {{ loggedIn , getLoggedIn , roleAndId , setRoleAndId }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export {AuthContextProvider};