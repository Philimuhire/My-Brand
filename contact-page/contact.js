document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });

    // Handle form submission
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Create query object
        const query = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        // Store query in local storage
        storeQuery(query);

        // Optionally, display a success message
        alert('Your query has been submitted successfully!');
    });

    function storeQuery(query) {
        // Retrieve existing queries from local storage
        let queries = localStorage.getItem('contactQueries');
        console.log('Existing queries:', queries); // Log existing queries to console for debugging
        
        // Parse existing queries as JSON or initialize as an empty array if null
        queries = queries ? JSON.parse(queries) : [];
    
        // Append new query to the array
        queries.push(query);
    
        // Save updated queries back to local storage
        localStorage.setItem('contactQueries', JSON.stringify(queries));
        console.log('Updated queries:', queries); // Log updated queries to console for debugging
    }
});

