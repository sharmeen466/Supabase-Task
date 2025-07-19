// My Post Page code – to show saved posts only

// const postContainer = document.getElementById("postContainer");
// const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

// // make div for each post
// // forEach: JS ka method jo array k hr element pr chlta he..
// savedPosts.forEach((post, index) => {
//     if (post.title && post.description) {
//         const postDiv = document.createElement("div");
//         postDiv.classList.add("poststyling");

//         //add title & description
//         postDiv.innerHTML = `
//             <h2 class="post-title">${post.title}</h2>
//             <p class="post-description">${post.description}</p>
//             `;
        // if (post.image) {
        //     const img = document.createElement("img");
        //     img.src = post.image;
        //     img.classList.add("post-image");
        //     postDiv.appendChild(img);
        // }

//         // Delete btn
//         const dlteBtn = document.createElement("button")
//         console.log(dlteBtn);

//         dlteBtn.textContent = `Delete`
//         dlteBtn.classList.add("deleteBtn")
//         dlteBtn.addEventListener("click", () => {
    //         Swal.fire({
    //             title: "Are you sure?",
    //             text: "You want to Delete this post!",
    //             icon: "warning",
    //             showCancelButton: true,
    //             confirmButtonColor: "#3085d6",
    //             cancelButtonColor: "#d33",
    //             confirmButtonText: "Yes, delete it!"
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 Swal.fire({
    //                     title: "Deleted!",
    //                     text: "Your Post has been deleted.",
    //                     icon: "success"
    //                 });
    //                 savedPosts.splice(index, 1)

    //                 // update local storage
    //                 localStorage.setItem("posts", JSON.stringify(savedPosts))

    //                 // Remove from DOM:
    //                 postDiv.remove()
    //             }
    //         });
    //     })
    //     postDiv.appendChild(dlteBtn)
    //     postContainer.appendChild(postDiv).style.marginTop = "50px";
    // }
// });