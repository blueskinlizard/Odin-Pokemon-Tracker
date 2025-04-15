import App from "../Pages/App";
import UserPage from "../Pages/UserPage";
import SignUp from "../Pages/SignUp";
import CreatePage from "../Pages/CreatePage";

const routes = [
    {
        path: '/',
        element: <App></App>
    },
    {
        path: '/users/:user',
        element: <UserPage></UserPage>
    },
    {
        path: '/signup',
        element: <SignUp></SignUp>
    },
    {
        path: '/create',
        element: <CreatePage></CreatePage>
    },

]

export default routes;