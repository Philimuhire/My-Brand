document.addEventListener("DOMContentLoaded", function() {
    // Function to display blogs
    function displayBlogs(blogs) {
        const blogsContainer = document.getElementById("all-blogs");
        blogsContainer.innerHTML = ""; // Clear previous content
        
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

                updateButton.classList.add("update-btn"); // Add update-btn class to update button
                deleteButton.classList.add("delete-btn"); // Add delete-btn class to delete button
                
                updateButton.dataset.blogId = blog.id; // Set data attribute for blog ID
                deleteButton.dataset.blogId = blog.id; // Set data attribute for blog ID
                
                updateButton.addEventListener("click", function() {
                    // Handle update blog action here
                    // You can open a modal or redirect to a new page for updating the blog
                    openUpdateModal(blog);
                });
                
                deleteButton.addEventListener("click", function() {
                    // Handle delete blog action here
                    // You can show a confirmation dialog before deleting the blog
                    const confirmed = confirm("Are you sure you want to delete this blog?");
                    if (confirmed) {
                        const index = blogs.findIndex(b => b.id === blog.id);
                        if (index !== -1) {
                            blogs.splice(index, 1); // Remove the blog from the array
                            saveBlogsToLocalStorage(blogs); // Save the updated array to local storage
                            displayBlogs(blogs); // Re-display blogs after removing the blog
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

        // Event listener for add blog button click
        document.getElementById("add-blog-btn").addEventListener("click", function() {
            openAddBlogModal();
        });
    }
    
    // Function to open the add blog modal
    function openAddBlogModal() {
        const modal = document.getElementById("add-blog-modal");
        modal.style.display = "block";
    }
    
    // Function to close the add blog modal
    function closeAddBlogModal() {
        const modal = document.getElementById("add-blog-modal");
        modal.style.display = "none";
    }

    // Event listener for close buttons in modals
    document.querySelectorAll(".close").forEach(function(button) {
        button.addEventListener("click", function() {
            closeAddBlogModal();
            closeUpdateModal();
        });
    });

    // Event listener for add blog form submission
    document.getElementById("add-blog-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("add-title").value;
        const content = document.getElementById("add-content").value;
        const imageUrl = document.getElementById("add-image").value;
        const comments = [];

        const newBlog = {
            id: Date.now(), // Generate unique ID for the new blog
            title: title,
            content: content,
            imageUrl: imageUrl,
            imageAlt: title, // Set image alt to blog title
            comments: comments
        };

        // Add the new blog to the blogs array
        blogs.push(newBlog);
        saveBlogsToLocalStorage(blogs); // Save the updated array to local storage
        displayBlogs(blogs); // Re-display blogs after adding the new blog
        closeAddBlogModal(); // Close the add blog modal
    });

    // Function to save blogs to local storage
    function saveBlogsToLocalStorage(blogs) {
        localStorage.setItem("blogs", JSON.stringify(blogs));
    }

    // Function to retrieve blogs from local storage
    function getBlogsFromLocalStorage() {
        const storedBlogs = localStorage.getItem("blogs");
        return storedBlogs ? JSON.parse(storedBlogs) : [];
    }

    // Function to open the update blog modal
    function openUpdateModal(blog) {
        const modal = document.getElementById("update-blog-modal");
        const titleInput = document.getElementById("update-title");
        const contentInput = document.getElementById("update-content");
        const imageInput = document.getElementById("update-image");

        titleInput.value = blog.title; // Set input values to current blog values
        contentInput.value = blog.content;
        imageInput.value = blog.imageUrl;

        modal.style.display = "block"; // Show the modal
    }

    // Function to close the update blog modal
    function closeUpdateModal() {
        const modal = document.getElementById("update-blog-modal");
        modal.style.display = "none"; // Hide the modal
    }

    // Event listener for update blog form submission
    document.getElementById("update-blog-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const title = document.getElementById("update-title").value;
        const content = document.getElementById("update-content").value;
        const imageUrl = document.getElementById("update-image").value;

        const updatedBlogId = document.querySelector(".update-btn").dataset.blogId; // Get the ID of the blog to update
        const index = blogs.findIndex(blog => blog.id == updatedBlogId); // Find the index of the blog in the array

        if (index !== -1) {
            // Update the blog object in the array
            blogs[index].title = title;
            blogs[index].content = content;
            blogs[index].imageUrl = imageUrl;

            saveBlogsToLocalStorage(blogs); // Save the updated array to local storage
            displayBlogs(blogs); // Re-display blogs after updating the blog
            closeUpdateModal(); // Close the update blog modal
        }
    });

    // Retrieve blogs from local storage and display them
    let blogs = getBlogsFromLocalStorage();
    displayBlogs(blogs);
});
