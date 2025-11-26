import { useEffect } from "react";
import { history } from "../../../index";
const WithAuth = (Component: Function) => {

  
    
    const Auth = (props: object) => {

          useEffect(()=>{
        console.log('sadasd')
    },[])

            const authenticatedUser = localStorage.getItem('access_token');
            if (authenticatedUser==null) {
                if(history.location.pathname!=="/register"){
                    history.push('/login')
                }
            }else if(history.location.pathname=='/register' || history.location.pathname=="/login"){

                history.push('/')
            }
            return (
                <Component {...props} />
            )
    };

    return Auth;
};

export default WithAuth;
