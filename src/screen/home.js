import { Link } from "react-router-dom";
import Nav from "../component/nav";
function Home(){
    return (
        <>

<Nav/>

<Link to="/">Home</Link> <br></br>

<Link to="/login">Login</Link> <br></br>

<Link to="/register">Register</Link> <br></br>

<Link to="/logout">Logout</Link> <br></br>




        </>
    )
}
export default Home;