import { useState } from "react";
import Nav from "../component/nav";
function Register (){
  const [name , setName] = useState('')
  const [fname , setFname] = useState('')
  const [mname , setMname] = useState('')
    const [email , setEmail] = useState('')
    const [service, setService] = useState('')
    const [password, setPassword] = useState('')
    const [paddress, setPaddress] = useState('')
    const [peraddress, setPeraddress] = useState('')
    const [number, setMobile] = useState('')
    const [fileData, setFiledata] = useState('')
    const [tshirt, setSelectedTshirtSize] = useState("XS");
    const tShirtSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"];
    const [blood, setBlood] = useState('');
    const [bloodGroup] = useState(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    const [gender, setGenderData] = useState('')
    const [Gender] = useState(["Male", "Female", "Prefer not to say"])
    const [year, setYear] = useState("");

    const years = (startYear) => {
      const currentYear = new Date().getFullYear();
      const years = [];
      startYear = startYear || 1980;
      while (startYear <= currentYear) {
          years.push(startYear++);
      }
      return years;
    }
    
    const allYears = years();
    
   
  
  if(localStorage.getItem("token") != null){
    window.location="/welcome"
}
   function submit() {

        const data = new FormData();
        data.append("name", name);
        data.append("fname", fname);
        data.append("mname", mname);
        data.append("blood", blood);
        data.append("gender", gender);
        data.append("service", service);
        data.append("email", email);
        data.append("tshirt", tshirt);
        data.append("paddress", paddress);
        data.append("peraddress", peraddress);
        data.append("year", year);
        data.append("number", number);
        data.append("password", password);

        data.append("file", fileData);
        fetch("http://localhost:8080/uploadFile", {
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
            <input type="text" id="name" name="name" onChange={(e)=>{setName(e.target.value)}}  placeholder="Name" required/>
            <input type="text" id="fname" name="fname" onChange={(e)=>{setFname(e.target.value)}}  placeholder="Father's Name" required/>
            <input type="text" id="mname" name="mname" onChange={(e)=>{setMname(e.target.value)}}  placeholder="Mother's Name" required/>
            <br></br>

            <select id="blood" onChange={(e) => setBlood(e.target.value)}>
            {bloodGroup.map((item) => (
            <option value={item}>{item}</option>
            ))}

            
            </select>

    

            
    
 
  <br></br>
  <br></br>
  


    <select id="gender" onChange={(e) => setGenderData(e.target.value)}>
            {Gender.map((item) => (
            <option value={item}>{item}</option>
            ))}
            </select>


    <br></br>
  <br></br>
<input type="text" id="service" name="service" onChange={(e)=>{setService(e.target.value)}}  placeholder="Service" required/>
<br></br>   <br></br>

<input type="email" id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}}  placeholder="Email" required/>
<br></br>   <br></br>


<select id="tshirt" onChange={(e) => setSelectedTshirtSize(e.target.value)}>
            {tShirtSizes.map((item) => (
            <option value={item}>{item}</option>
            ))}
            </select>



    <br></br>   <br></br>

    
    <input type="text"  id="paddress" name="paddress" onChange={(e)=>{setPaddress(e.target.value)}} placeholder="Present Address"/>

    <input type="text"  id="peraddress" name="peraddress" onChange={(e)=>{setPeraddress(e.target.value)}} placeholder="Permanent Address"/>
  
    <br></br>   <br></br>

    <select id="year"  onChange={(e) => setYear(e.target.value)}>
      {allYears.map((item) => (
        <option value={item}>{item}</option>
      ))}
    </select>
   
    <br></br>   <br></br>


    <input type="number"  id="mobile" name="mobile" onChange={(e)=>{setMobile(e.target.value)}} placeholder ="mobile"/>
    <br></br>   <br></br>
<input type="password" id="password" name="password" onChange={(e)=>{setPassword(e.target.value)}}  placeholder="Password" required/>
<br></br>   <br></br>
  




<input id="file" type="file" onChange={(e)=>{setFiledata(e.target.files[0]); console.log(e.target.files[0])}} required/>

<br></br>   <br></br>
<button className="btn-primary" onClick={submit} type="submit">Submit</button>
            
       </div>     
            </>



    )
}

export default Register