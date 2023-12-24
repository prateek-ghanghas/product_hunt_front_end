import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
const {isAuthenticated} = useAuth0()
return(
    isAuthenticated ? <Outlet></Outlet> : <Navigate to='login'/>
)
}

export default PrivateRoutes;