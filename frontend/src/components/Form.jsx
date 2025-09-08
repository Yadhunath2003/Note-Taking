import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";


// Form component handles both login and registration forms
function Form({ route, method }) {
    // State for username input
    const [username, setUsername] = useState("");
    // State for password input
    const [password, setPassword] = useState("");
    // State to show loading indicator during API call
    const [loading, setLoading] = useState(false);
    // Hook to programmatically navigate between routes
    const navigate = useNavigate();

    // Set form title based on method prop
    const name = method === "login" ? "Login" : "Register";

    // Handles form submission for login/register
    const handleSubmit = async (e) => {
        setLoading(true); // Show loading indicator
        e.preventDefault(); // Prevent default form submission

        try {
            // Send POST request to API with username and password
            const res = await api.post(route, { username, password })
            if (method === "login") {
                // On login, store tokens in localStorage and redirect to home
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                // On register, redirect to login page
                navigate("/login")
            }
        } catch (error) {
            // Show error alert if request fails
            alert(error)
        } 
        finally {
            setLoading(false) // Hide loading indicator
        }
    };

    // Render the form UI
    return (
        <form onSubmit={handleSubmit} className="form-container">
            {/* Form title */}
            <h1>{name}</h1>
            {/* Username input field */}
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            {/* Password input field */}
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            {/* Show loading indicator when loading */}
            {loading && <LoadingIndicator />}
            {/* Submit button */}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

// Export the Form component as default
export default Form