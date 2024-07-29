import { Navigate } from "react-router-dom";

export default function Dashboard() {
 const isTeacher = true;

 if (isTeacher) return <div>Dashboard</div>;
 return <Navigate to={"/home"} />;
}
