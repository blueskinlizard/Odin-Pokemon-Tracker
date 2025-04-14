//This page is meant for adding a new pokemon to a user's database

export default function SignUp(){

    const addToDatabase = (async (profileForm) =>{
        profileForm.preventDefault();
        
        //This function is meant to add a new pokemon to the user's database
        try{
            const form = profileForm.target;
            const profileName  = form.name.value;
            const profilePassword = form.password.value; 
            const response = await fetch("http://localhost:8080/api/signUp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: profileName, password: profilePassword}),
            })
            const result = await response.json();
            if(response.ok){
                console.log("Profile Successfully added, more specifically: ", result.message);
            }
            else{
                console.log("Error occured in adding profile, response !=ok, error: ", result.message)
            }
        }
        catch(err){
            console.log("Error in adding profile, caught error: ", err);
        }
        
    })
    return(
        <div>
            <h1> Sign up, or login </h1>
            <form className="CreateProfileForm" onSubmit={addToDatabase}>
                <label> Name: </label>
                <input type="text" name="name" placeholder="Enter your username"/>
                <label> Password: </label>
                <input type="text" name="password" placeholder="Enter your password(not secure)"></input>
                <button type="submit" className="CreateProfileButton">Create</button>
            </form>
        </div>
    )
}