<script>
    let username = "";
    let password = "";
    let errorMessage = "";
    const handleSubmit = async () => {
      // Simulate sending data (replace with actual login logic)
    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

      // Handle successful or failed login (placeholder for now)
    if (response.ok) {
        console.log("Login successful!");
        // Redirect or handle successful login
    } else {
        errorMessage = "Invalid username or password";
    }
    };
</script>

<form on:submit={handleSubmit}>
    <h1>Login</h1>
    <label for="username">Username:</label>
    <input type="text" id="username" bind:value={username} required>

    <label for="password">Password:</label>
    <input type="password" id="password" bind:value={password} required>

    <button type="submit">Login</button>

    {#if errorMessage}
    <p style="color: red">{errorMessage}</p>
    {/if}
</form>