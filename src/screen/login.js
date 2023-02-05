import { useState } from "react";
import Nav from "../component/nav";
function Login (){

    const [password, setPassword] = useState('')
    const [number, setMobile] = useState('')
 
  
  

    if(localStorage.getItem("token") != null){
        window.location="/welcome"
    }
    
   function submit() {

        const data = new FormData();
        data.append("number", number);
        data.append("password", password);
        fetch("http://localhost:8080/loginUser", {
          method: "POST",
          body:data
        })
          .then(res => res.json())
          .then(res => {
            if(res.message){
                localStorage.setItem("token",res.token)
                window.location = "/welcome";
            } else {
                alert(res.alert)
            }
          })
          
      } 

    
    
    return(
            <>
          
          
            <Nav/>
            <br></br>
<div className="container">

<input type="number"  id="mobile" name="mobile" onChange={(e)=>{setMobile(e.target.value)}} placeholder ="mobile"/>
<br></br>   <br></br>
<input type="password" id="password" name="password" onChange={(e)=>{setPassword(e.target.value)}}  placeholder="Password" required/>
<br></br>   <br></br>
  
<button className="btn-primary" onClick={submit} type="submit">Submit</button>
            
       </div>     
            </>



    )
}

export default Login