import { useEffect } from "react";
import { history } from "../../../index";
const WithAuth = (Component: Function) => {



    const Auth = (props: object) => {

        useEffect(() => {
            // Burada normalde getUserInfoile Token Check yapılabilir 401 alırsak logine pushlanırız 
            // yapıyı görmek için utils/httpHelpera bakılabişlir
        }, [])

        const authenticatedUser = localStorage.getItem('access_token');
        if (authenticatedUser == null) {
            if (history.location.pathname !== "/register") {
                history.push('/login')
            }
        } else if (history.location.pathname == '/register' || history.location.pathname == "/login") {

            history.push('/')
        }
        return (
            <Component {...props} />
        )
    };

    return Auth;
};

export default WithAuth;
