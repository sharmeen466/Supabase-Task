const supabaseUrl = "https://lpofpupsdzenmczkocqb.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb2ZwdXBzZHplbm1jemtvY3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NzMxMDQsImV4cCI6MjA2NzQ0OTEwNH0.MONqwRrQ3wRokVFr2zkyWnCpt-ZMFlFM1q4LB30Fu-8"

const { createClient } = supabase
const client = createClient(supabaseUrl, supabaseKey)

const title = document.getElementById("website-admin")
const description = document.getElementById("message")
const image = document.getElementById("file_input")
const postBtn = document.getElementById("postBtn")
const postContainer = document.getElementById("postContainer")

postBtn.addEventListener("click", () => {
    if (title.value && description.value) {
        const postDiv = document.createElement("div")
        postDiv.classList.add("poststyling")

        // file reader to handle img, converted into base64:
        const reader = new FileReader();
        reader.onload = function () {
            const imageData = reader.result;

            // set title & description:
            postDiv.innerHTML =
                `<h2> ${title.value} </h2>
                <p> ${description.value} </p>`

            const image = document.createElement("img")
            image.src = imageData
            postDiv.appendChild(image)

            // append postDiv to Container:
            postContainer.appendChild(postDiv);

            // save to local storage:
            const postObject = {
                title: title.value,
                description: description.value,
                image: imageData // base64 img data
            };

            let existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
            existingPosts.push(postObject);
            localStorage.setItem("posts", JSON.stringify(existingPosts));
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Post Created Successfully",
                showConfirmButton: false,
                timer: 1500
            });
        };

        // check if image is selected::
        if (image.files.length > 0) {
            reader.readAsDataURL(image.files[0])
        }
        else if (!image.files[0]) {
            Swal.fire({
                icon: "error",
                title: "",
                text: "Please upload an IMAGE",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }
    else {
        Swal.fire({
            icon: "error",
            title: "",
            text: "Please Enter All Fields",
        });
    }
})

// Log Out

const logOutBtn = document.getElementById("logOutBtn")
console.log(logOutBtn);
logOutBtn.addEventListener("click", async () => {
    await client.auth.signOut();
    window.location.href = "index.html"
})
