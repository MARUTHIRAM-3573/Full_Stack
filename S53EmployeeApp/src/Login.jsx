import { useState } from "react";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        fetch("http://localhost:8081/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.text())
        .then(data=>{
            if(data === "Login Success"){
                localStorage.setItem("user", username);
                alert("Login successful!");
        }
        else{
            alert("Invalid Credentials");
        }

    });
    };
    return (
        <div>
            <h2>Login Page</h2> 
            <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}  
                />

            <br></br> 
         </div>
    );
}
export default Login;