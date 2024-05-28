import { useSelector } from 'react-redux';

function PrivateRoute({ component: RouteComponent }) {
    // const user = useSelector(selectCurrentUser);
    // const userHasRequiredRole = user && roles.includes(user.role) ? true : false;
    // if (isAuthenticated && !userHasRequiredRole) {
    //     return <AccessDenied />;
    // }
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (isAuthenticated && userHasRequiredRole) {
        return <RouteComponent />;
    }

    return <Navigate to="/" />;
}

export default PrivateRoute;
