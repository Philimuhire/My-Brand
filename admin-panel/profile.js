document.addEventListener("DOMContentLoaded", function() {
    const updateProfileForm = document.getElementById("update-profile-form");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    updateProfileForm.addEventListener("submit", function(event) {
        event.preventDefault(); 

        if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
            alert("Please enter a valid email address.");
            emailInput.focus();
            return;
        }

        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]\\\|:;"'<,>.?/]).{8,}$/;
        if (!passwordPattern.test(passwordInput.value)) {
            alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one symbol.");
            passwordInput.focus();
            return;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            alert("Passwords do not match.");
            confirmPasswordInput.focus();
            return;
        }
        alert("Profile updated successfully!");
    });
});
