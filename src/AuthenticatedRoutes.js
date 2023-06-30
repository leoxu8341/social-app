import { useNavigate, Outlet } from 'react-router-dom';

const AuthenticatedRoutes = ({ isLoggedIn }) => {
    const navigate = useNavigate();
    return (
        isLoggedIn ? <Outlet /> : navigate('/login')
    );
};

export default AuthenticatedRoutes;