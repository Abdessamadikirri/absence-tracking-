import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const isauth = useSelector(state => state.user.isauth);
    const role = useSelector(state => state.user.user.role);

    if (!isauth) return <Navigate to="/login" />;

    if (role !== "admin") return <Navigate to="/Formbiden" />;

    return children;
}
