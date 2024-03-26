document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });

    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        const query = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        storeQuery(query);

        alert('Your query has been submitted successfully!');
    });

    function storeQuery(query) {
        let queries = localStorage.getItem('contactQueries');
        console.log('Existing queries:', queries);
        
        queries = queries ? JSON.parse(queries) : [];
    
        queries.push(query);
    
        localStorage.setItem('contactQueries', JSON.stringify(queries));
        console.log('Updated queries:', queries); 
    }
});