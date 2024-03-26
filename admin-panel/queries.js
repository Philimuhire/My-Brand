document.addEventListener("DOMContentLoaded", function() {
    function displayQueries() {
        let queries = localStorage.getItem('contactQueries');
        queries = queries ? JSON.parse(queries) : [];
        const queriesTable = document.getElementById('queries-table');
        queriesTable.innerHTML = '';
        if (queries.length > 0) {
            const tableHeader = document.createElement('tr');
            tableHeader.innerHTML = `
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
            `;
            queriesTable.appendChild(tableHeader);

            queries.forEach(function (query) {
                const queryRow = document.createElement('tr');
                queryRow.innerHTML = `
                    <td>${query.name}</td>
                    <td>${query.email}</td>
                    <td>${query.subject}</td>
                    <td>${query.message}</td>
                `;
                queriesTable.appendChild(queryRow);
            });
        } else {
            queriesTable.innerHTML = '<p>No queries found.</p>';
        }
    }
    displayQueries();
    
});
