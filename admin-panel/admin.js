document.addEventListener("DOMContentLoaded", function() {
    function displayBlogs(blogs) {
        const blogsContainer = document.getElementById("all-blogs");
        blogsContainer.innerHTML = ""; 
        
        if (blogs && blogs.length > 0) {
            blogs.forEach(function(blog) {
                const blogDiv = document.createElement("div");
                const blogTitle = document.createElement("h3");
                const blogContent = document.createElement("p");
                const blogImage = document.createElement("img");
                const updateButton = document.createElement("button");
                const deleteButton = document.createElement("button");
                
                blogTitle.textContent = blog.title;
                blogContent.textContent = blog.content;
                blogImage.src = blog.imageUrl;
                blogImage.alt = blog.imageAlt;
                updateButton.textContent = "Update";
                deleteButton.textContent = "Delete";

                updateButton.classList.add("update-btn"); 
                deleteButton.classList.add("delete-btn"); 
                
                updateButton.dataset.blogId = blog.id; 
                deleteButton.dataset.blogId = blog.id; 
                
                updateButton.addEventListener("click", function() {
                    openUpdateModal(blog);
                });
                
                deleteButton.addEventListener("click", function() {
                    const confirmed = confirm("Are you sure you want to delete this blog?");
                    if (confirmed) {
                        const index = blogs.findIndex(b => b.id === blog.id);
                        if (index !== -1) {
                            blogs.splice(index, 1); 
                            saveBlogsToLocalStorage(blogs);
                            displayBlogs(blogs); 
                        }
                    }
                });
                
                blogDiv.appendChild(blogTitle);
                blogDiv.appendChild(blogContent);
                blogDiv.appendChild(blogImage);
                blogDiv.appendChild(updateButton);
                blogDiv.appendChild(deleteButton);
                
                blogsContainer.appendChild(blogDiv);
            });
        } else {
            blogsContainer.textContent = "No blogs found.";
        }

        document.getElementById("add-blog-btn").addEventListener("click", function() {
            openAddBlogModal();
        });
    }
    
    function openAddBlogModal() {
        const modal = document.getElementById("add-blog-modal");
        modal.style.display = "block";
    }
    
    function closeAddBlogModal() {
        const modal = document.getElementById("add-blog-modal");
        modal.style.display = "none";
    }

    document.querySelectorAll(".close").forEach(function(button) {
        button.addEventListener("click", function() {
            closeAddBlogModal();
            closeUpdateModal();
        });
    });

    document.getElementById("add-blog-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("add-title").value;
        const content = document.getElementById("add-content").value;
        const file = document.getElementById("add-image").files[0];

        if (!file) {
            alert("Please select an image.");
            return;
        }

        const reader = new FileReader();

        reader.onload = function() {
            const imageUrl = reader.result;
            const comments = [];
            const newBlog = {
                id: Date.now(), 
                title: title,
                content: content,
                imageUrl: imageUrl,
                imageAlt: title, 
                comments: comments
            };

            let blogs = getBlogsFromLocalStorage();
            blogs.push(newBlog);
            saveBlogsToLocalStorage(blogs);
            displayBlogs(blogs);
            closeAddBlogModal();
        };
        reader.readAsDataURL(file);

    });

    function saveBlogsToLocalStorage(blogs) {
        localStorage.setItem("blogs", JSON.stringify(blogs));
    }

    function getBlogsFromLocalStorage() {
        const storedBlogs = localStorage.getItem("blogs");
        return storedBlogs ? JSON.parse(storedBlogs) : [];
    }

    function openUpdateModal(blog) {
        const modal = document.getElementById("update-blog-modal");
        const titleInput = document.getElementById("update-title");
        const contentInput = document.getElementById("update-content");
        const imageInput = document.getElementById("update-image");

        titleInput.value = blog.title; 
        contentInput.value = blog.content;
        imageInput.value = blog.imageUrl;

        modal.style.display = "block"; 
    }

    function closeUpdateModal() {
        const modal = document.getElementById("update-blog-modal");
        modal.style.display = "none"; 
    }

    document.getElementById("update-blog-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("update-title").value;
        const content = document.getElementById("update-content").value;
        const imageUrl = document.getElementById("update-image").value;

        const updatedBlogId = document.querySelector(".update-btn").dataset.blogId; 
        const index = blogs.findIndex(blog => blog.id == updatedBlogId); 

        if (index !== -1) {
            blogs[index].title = title;
            blogs[index].content = content;
            blogs[index].imageUrl = imageUrl;

            saveBlogsToLocalStorage(blogs); 
            displayBlogs(blogs); 
            closeUpdateModal();
        }
    });

    let blogs = getBlogsFromLocalStorage();
    displayBlogs(blogs);

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
