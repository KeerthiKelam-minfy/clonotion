// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    if (!currentUser) {
        // If no user, redirect to the login page
        return <Navigate to="/login" />;
    }
    return children;
}
export default ProtectedRoute;
