$(document).ready(function(){
        $('#registerForm').submit(function(e){
        e.preventDefault();
        let name = $('#name').val().trim();
        let email = $('#email').val().trim();
        let password = $('#password').val().trim();
        let confirmPassword = $('#confirmPassword').val().trim();
        let errors = [];

        if(name === "") errors.push("Name is required.");
        if(email === "") errors.push("Email is required.");
        else if(!/^\S+@\S+\.\S+$/.test(email)) errors.push("Invalid email format.");
        if(password === "") errors.push("Password is required.");
        if(confirmPassword === "") errors.push("Confirm password is required.");
        if(password && confirmPassword && password !== confirmPassword) errors.push("Passwords do not match.");

        if(errors.length > 0){ alert(errors.join("\n")); return; }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        if(users.some(u => u.email === email)){ alert("Email already registered!"); return; }

        users.push({name,email,password});
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful!"); $('#registerForm')[0].reset(); window.location.href="login.html";
    });

   
    $('#loginForm').submit(function(e){
        e.preventDefault();
        let email = $('#loginEmail').val().trim();
        let password = $('#loginPassword').val().trim();
        let errors = [];

        if(email === "") errors.push("Email is required.");
        else if(!/^\S+@\S+\.\S+$/.test(email)) errors.push("Invalid email format.");
        if(password === "") errors.push("Password is required.");
        if(errors.length > 0){ alert(errors.join("\n")); return; }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = users.find(u => u.email === email && u.password === password);
        if(user){ 
            alert("Login successful! Welcome, " + user.name); 
            $('#loginForm')[0].reset(); 
            localStorage.setItem('currentUser', JSON.stringify(user)); 
            window.location.href="index.html"; 
        }
        else alert("Invalid email or password!");
    });

        $('#contactForm').submit(function(e){
        e.preventDefault();
        let name = $('#contactName').val().trim();
        let email = $('#contactEmail').val().trim();
        let message = $('#contactMessage').val().trim();
        let errors = [];

        if(name === "") errors.push("Name is required.");
        if(email === "") errors.push("Email is required.");
        else if(!/^\S+@\S+\.\S+$/.test(email)) errors.push("Invalid email format.");
        if(message === "") errors.push("Message cannot be empty.");
        if(errors.length > 0){ alert(errors.join("\n")); return; }

        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push({name,email,message});
        localStorage.setItem("messages", JSON.stringify(messages));
        alert("Message sent successfully!"); $('#contactForm')[0].reset();
    });

});