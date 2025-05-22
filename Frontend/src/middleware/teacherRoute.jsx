import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function TeacherRoute({ children }) {
    const isauth = useSelector(state => state.user.isauth);
    const role = useSelector(state => state.user.user.role);

    if (!isauth) return <Navigate to="/login" />;

    if (role !== "teacher") return <Navigate to="/Formbiden" />;

    return children;
}