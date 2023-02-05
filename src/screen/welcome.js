import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../component/nav";
function Welcome(){

const [userdata,setUserData]= useState([])


useEffect(()=>{


    fetch('http://localhost:8080/welcome', {
            method: "POST",
        })
        
        .then(res => res.json())
        .then(res => {
            setUserData(res.message)
            console.log(res.message);
          })
          .catch((err) => console.log(err));
},[])




useEffect(() => {
    const data = new FormData();
    data.append("token", localStorage.getItem("token"));
    fetch('http://localhost:8080/welcome', {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUserData(res.message);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



console.log(localStorage.getItem("token"))
if(localStorage.getItem("token") == undefined){
                window.location="/login"
            }



function handleRoute(){
    localStorage.removeItem("token");
    window.location = navigate("/login")();
  }
  
  const navigate = useNavigate();
    

    return (
        <>

       


<Nav/>

<Link to="/">Home</Link> <br></br>


      <>
        <h1 style={{color:"green"}}>GeeksForGeeks</h1>
        <button onClick={handleRoute}>Logout</button>
      </>
 

{/* <Link to="/logout" onclick={handleRoute}> logout</Link> */}


<ul> 



{userdata.map((item)=>(
  <>
    <li>{item.name}</li>
    <li>{item.fname}</li>
    <li>{item.mname}</li>
    <li>{item.blood}</li>
    <li>{item.gender}</li>
    <li>{item.service}</li>
    <li>{item.email}</li>
    <li>{item.tshirt}</li>
    <li>{item.paddress}</li>
    <li>{item.paddress}</li>
    <li>{item.year}</li>
    <li>{item.number}</li>
    <li>{item.password}</li>

    <li> 
      <img alt="..." 
           src={"http://localhost:8080/image/" + item.file}>
      </img> 
    </li>

    
  </>
))}






        

</ul>



    
      



        </>
    )
}
export default Welcome;