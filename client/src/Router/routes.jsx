import App from "../Pages/App";

const routes = [
    {
        path: '/',
        element: <App></App>
    },
    {
        path: '/users/:userid',
        element: <UserPage></UserPage>
    }
]

export default routes;