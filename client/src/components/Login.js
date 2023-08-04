function Login(){

   
   
    return(
        <>
            <h1>
                Login
            </h1>
            <form>
                <div>
                    <label for="username">
                        Username:
                    </label>
                    <input type="username" name="username" />
                </div>
                <div>
                    <label for="password">
                        Password:
                    </label>
                    <input type="text" name="password" />
                </div>
                <div>
                    <input type="submit" value="login" />
                </div>
            </form>
        </>
    )
}

export default Login