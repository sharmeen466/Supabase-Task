const supabaseUrl = "https://lpofpupsdzenmczkocqb.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb2ZwdXBzZHplbm1jemtvY3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NzMxMDQsImV4cCI6MjA2NzQ0OTEwNH0.MONqwRrQ3wRokVFr2zkyWnCpt-ZMFlFM1q4LB30Fu-8"

const { createClient } = supabase
const client = createClient(supabaseUrl, supabaseKey)
console.log(client);

// Sign Up 

const signUpBtn = document.getElementById("signupBtn")
const signUpEmail = document.getElementById("email")
const signUpPassword = document.getElementById("password")
const firstName = document.getElementById("fName")
const lastName = document.getElementById("lName")
const terms = document.getElementById("terms")
const profilePic = document.getElementById("profile-pic")

const passVisible = () => {
    const closeEye = document.getElementById("closeEye")
    closeEye && closeEye.addEventListener("click", () => {
        if (signUpPassword.type === "password") {
            signUpPassword.type = "text";
            closeEye.classList.remove("fa-eye-slash");
            closeEye.classList.add("fa-eye");
        } else {
            signUpPassword.type = "password";
            closeEye.classList.remove("fa-eye");
            closeEye.classList.add("fa-eye-slash");
        }
    })
}
passVisible()

signUpBtn && signUpBtn.addEventListener("click", async function () {

   const {
			data: {user},
		} = await client.auth.getUser();
		console.log(user);
		const fileEx = profilePic.files[0].name.split('.')[1];

		console.log(fileEx);
    
    if (!signUpEmail.value && !signUpPassword.value && !firstName.value || !lastName.value && !terms.checked && ! profilePic.files[0]) {
        Swal.fire({
            position: "top",
            icon: "error",
            text: "Please fill all the Fields",
        });
        return;
    }
    else {
        if (!signUpEmail.value.includes("@gmail.com")) {
            signUpEmail.classList.add("error")
            Swal.fire({
                position: "top",
                text: "'@gmail.com' is missing",
            });
            return;
        }

        else {
            signUpEmail.classList.remove("error")

        }
        if (!signUpPassword.value) {
            signUpPassword.classList.add("error")
            return;
        }
        else {
            signUpPassword.classList.remove("error")

        }
        if (!firstName.value) {
            firstName.classList.add("error")
            return;
        }
        else {
            firstName.classList.remove("error")
        }
        if (!lastName.value) {
            lastName.classList.add("error")
            return;
        }
        else {
            lastName.classList.remove("error")
            
        }
        if (!profilePic.files[0]) {
            profilePic.classList.add("error")
            return;
        }
        else {
            profilePic.classList.remove("error")
        }
        if (!terms.checked) {
            Swal.fire({
                position: "top",
                text: "Please Accept our T&C",
            });
            return;
        }
    }
    if (signUpEmail && signUpPassword) {
        try{
            const { data: {user} , error } = await client.auth.signUp({
                email: signUpEmail.value,
                password: signUpPassword.value
            })
            console.log(data)
            if(user){
                console.log(user);
                const {data: profileURL, error} = await client.storage.from("users").upload(`avators/users-${user.id}`, profilePic.files[0], {
                    upsert: true
                })
                if(error){
                    console.log(error);
                }
                else{
                    console.log("upload data:", profileURL);
                    
                }
            }
        }
        catch(error){
            console.error(error);
            
        }
    }
        // Swal.fire({
        //     position: "top-end",
        //     icon: "success",
        //     title: "Successfully created your account",
        //     showConfirmButton: false,
        //     timer: 1500
        // });
        //  navigate to login page
                // setTimeout(() => {
                    // window.location.href = "login.html"
                // }, 2000);
    else{
        console.log(error);
        
    }
})


// Log in

const loginBtn = document.getElementById("loginBtn")
const loginEmail = document.getElementById("loginEmail")
const loginPass = document.getElementById("loginPass")

loginBtn && loginBtn.addEventListener("click", async function () {
    if (loginEmail.value && loginPass.value) {

        try {
            const { data, error } = await client.auth.signInWithPassword({
                email: loginEmail.value,
                password: loginPass.value
            })


            if (error) {
                console.log(error.message)
                Swal.fire({
                    icon: "error",
                    // title: "Oops...",
                    text: "Invalid Login Credentials",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
            else {
                console.log(data)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Succesfully Login",
                    showConfirmButton: false,
                    timer: 1500
                });
                // navigate to home page
                setTimeout(() => {
                    window.location.href = "home.html"
                }, 2000);
            }
        }
        catch (error) {
            console.log(error.message);
        }
    }
})


// Login with Google

const loginWithGoogle = document.getElementById("signupWithGoogle")
loginWithGoogle &&
    loginWithGoogle.addEventListener("click", async () => {
        const { error } = await client.auth.signInWithOAuth({
            provider: 'google',
            options: {
               redirectTo: window.location.href + '/Supabase-Task/index.html',


                queryParams: { access_type: 'offline', prompt: 'consent' },
            },
        })
        console.log(error)
    })


// navigate to Login Page

const directLogin = document.getElementById("directLogin")
directLogin &&
    directLogin.addEventListener("click", () => {
        window.location.href = "login.html"
    })

// Log Out

const logOutBtn = document.getElementById("logOutBtn")
logOutBtn && logOutBtn.addEventListener("click", async () => {
    await client.auth.signOut();
    window.location.href = "index.html"
})


// create user in navbar

// async function displayUserProfile() {
//     try {
//         const {
//             data: { user },
//             error,
//         } = await client.auth.getUser();

//         if (error) throw error;

//         console.log(user);

//         if (user) {
//             // 👇 get DOM elements first
//             const profileAvatar = document.getElementById('profile-avatar');
//             const fullName = document.getElementById('profile-name');
//             const emailElement = document.getElementById('profile-email');
//             // 👇 update values if elements exist
//             if (profileAvatar) {
//                 profileAvatar.src =
//                     user.user_metadata?.avatar_url || 'blank-profile-picture-973460_960_720.webp';
//             }

//             if (fullName) {
//                 fullName.textContent = user.user_metadata?.full_name;
//             }

//             if (emailElement) {
//                 emailElement.textContent = user.email || '';
//             }

            // 👇 Redirect to post.html if logged in and on index.html
//             if (window.location.pathname.includes('index.html')) {
//                 window.location.href = 'home.html';
//             }
//         } else if (!window.location.pathname.includes('index.html') && !window.location.pathname.includes('login.html')) {
//             window.location.href = 'index.html';
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         if (
//             !window.location.pathname.includes('index.html') &&
//             !window.location.pathname.includes('login.html')
//         ) {
//             window.location.href = 'index.html';
//         }
//     }
// }
// displayUserProfile()

//Add a post

const uplaodImage = document.getElementById("file_input")
const postBtn = document.getElementById("postBtn")

postBtn && postBtn.addEventListener("click", async () => {
    const { data: { user } } = await client.auth.getUser()
    const userTitle = document.getElementById("website-admin").value.trim()
    const userDescription = document.getElementById("message").value.trim()
    console.log(userTitle);
    console.log(userDescription);


    if (!userTitle || !userDescription) {
        Swal.fire({
            icon: "error",
            title: "",
            text: "Please enter title & description",
        });
        return;
    }
    else if (!userTitle) {
        Swal.fire({
            icon: "error",
            title: "",
            text: "Title is required — please fill it in.",
        });
        return;
    }
    else if (!userDescription) {
        Swal.fire({
            icon: "error",
            title: "",
            text: "Please enter a description before posting.",
        });
        return;
    }
    // else if(uplaodImage){
    //         const img = document.createElement("img");
    //         img.src = uplaodImage.image;
    //     }


    else {

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Post Created Successfully",
            showConfirmButton: false,
            timer: 1500
        });
        const postContainer = document.getElementById("postContainer")
        postContainer.innerHTML += `<div class="poststyling margin">
                   <h2>${userTitle}</h2>
                   <p>${userDescription}</p>
                   </div>`
        document.getElementById("website-admin").value = ""
        document.getElementById("message").value = ""
    }
    console.log(user.id);
    const { data, error } = await client.from("posts").insert([
        {
            userId: user.id,
            title: userTitle,
            description: userDescription,
        },
    ])
    if (data) {
        console.log(data);

    }
    else {
        console.log(error);

    }
})

// Read all posts

if (window.location.pathname == "/allPosts.html") {
    const readAllPosts = async () => {
        try {
            const { data, error } = await client.from("posts").select()
            console.log("Data from SupaBase: ", data);

            if (error) {
                console.log("Supabase fetch error:", error);
                return;
            }

            if (data) {
                const postBox = document.getElementById("postBox");
                postBox.innerHTML = data.map(
                    ({ id, title, description }) => `
                    <div id='${id}' class='flex flex-col items-center'>
                        <div class="max-w-sm rounded overflow-hidden shadow-lg poststyling removeDiv">
                            
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">${title}</div>
                                <p class="text-gray-700 text-base">${description}</p>
                            </div>
                            <div class="px-6 pt-4 pb-2">
                                <img class="w-full" src="" alt="">
                            </div>
                        </div>
                    </div>
                    `
                ).join('');
            }

        } catch (error) {
            console.error("Something went wrong in readAllPosts:", error);
        }
    };

    readAllPosts();
}


// Read My posts
if (window.location.pathname == "/myposts.html") {


    const readMyPosts = async () => {
        const {
            data: { user },
        } = await client.auth.getUser();
        const { data, error } = await client.from("posts").select().eq('userId', user.id)
        console.log(data);
        console.log(data[0]);

        if (data) {
            const myBox = document.getElementById("container")
            console.log(myBox);
            myBox.innerHTML = data.map(
                ({ id, title, description }) => `<div id = '${id}' class = 'flex flex-col items-center'> 
                <div class="max-w-sm rounded overflow-hidden shadow-lg poststyling removeDiv">
                
                 <div class="relative inline-block text-left">
               <button type="button" class="menuButton p-2 rounded-full hover:bg-gray-200 focus:outline-none">
               <svg class="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0 3.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm0 3.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
               </button>

              <div class="menuDropdown hidden relative right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div class="py-1 text-sm text-gray-700 menu">
              <button class="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
             <button class=" dlteBtn block w-full text-left px-4 py-2 hover:bg-gray-100" data-id="${id}">Delete</button>
    </div>
  </div>
  </div>
                <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">${title}</div>
                <p class="text-gray-700 text-base">${description}
                </p>
                </div>
                <div class="px-6 pt-4 pb-2">
                <img class="w-full" src="" alt="">
                </div>
</div>`

            ).join('')

            const menuButton = document.querySelectorAll(".menuButton")
            console.log(menuButton);

            menuButton.forEach((btn) => {
                btn.addEventListener("click", () => {
                    const dropDown = btn.closest(".relative").querySelector(".menuDropdown")
                    dropDown.classList.toggle("hidden")
                })
            })
            const dlteBtn = document.querySelectorAll(".dlteBtn")
            dlteBtn.forEach((btn) => {
                btn.addEventListener("click", async () => {
                    const postId = btn.getAttribute("data-id")
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You want to Delete this post!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const { error: deleteError } = await client.from('posts').delete().eq('id', postId);
                            if (!deleteError) {
                                Swal.fire("Deleted!", "Your Post has been deleted.", "success");
                                btn.closest(".removeDiv").remove();
                            } else {
                                console.error("Delete failed:", deleteError);
                                Swal.fire("Error!", "Failed to delete post.", "error");
                            }
                        }
                    });
                })
            })
        } else {
            console.log(error);
        }
    }
    try {
        readMyPosts();
    } catch (error) {
        console.log(error);
    }

}