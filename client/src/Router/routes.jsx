import App from "../Pages/App";
import UserPage from "../Pages/UserPage";
import SignUp from "../Pages/SignUp";

const routes = [
    {
        path: '/',
        element: <App></App>
    },
    {
        path: '/users/:userid',
        element: <UserPage></UserPage>
    },
    {
        path: '/signup',
        element: <SignUp></SignUp>
    }
]

export default routes;