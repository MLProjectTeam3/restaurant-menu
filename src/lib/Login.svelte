<script>
    import user from '../user';
    let username ='';
    let password ='';
    let currentError = null;

    const login = () =>{
        fetch('http://127.0.0.1:3030/login',{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username:username, password:password})
        })
        .then((res) =>{
            if(res.status<299) return res.json()
            if(res.status > 299) currentError = "Something not quite right with server response";
        })
        .then((data) =>{
            if(data) user.update(val => val = {...data})
        })
    .catch((error)=>{
        currentError = error; 
        console.log("Error logging in: ",error)
    })
    }
</script>
<form on:submit|preventDefault={login}>
    <br>
    <div>
        <label for="username">Username</label>
        <input type="text" id="username" placeholder="Enter your username" bind:value={username} class="max-w-xs border-black border-2"/>
    </div>
    <br>
    <div>
        <label for="password">Password</label>
        <input type="password" id="password" bind:value={password}/>
    </div><br>
    <button type="submit">Submit</button>
</form>