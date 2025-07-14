const supabaseUrl = "https://lpofpupsdzenmczkocqb.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb2ZwdXBzZHplbm1jemtvY3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NzMxMDQsImV4cCI6MjA2NzQ0OTEwNH0.MONqwRrQ3wRokVFr2zkyWnCpt-ZMFlFM1q4LB30Fu-8"

const { createClient } = supabase
const client = createClient(supabaseUrl, supabaseKey)

// Sign Up 

const signUpBtn = document.getElementById("signupBtn")
const signUpEmail = document.getElementById("email")
const signUpPassword = document.getElementById("password")
const firstName = document.getElementById("fName")
const lastName = document.getElementById("lName")
const terms = document.getElementById("terms")


signUpBtn && signUpBtn.addEventListener("click", async function () {
    if (!signUpEmail.value && !signUpPassword.value && !firstName.value && !lastName.value && !terms.checked) {
        Swal.fire({
            position: "top",
            icon: "error",
            text: "Please fill all the Fields",
        });
    }
    else {
        if (!signUpEmail.value.includes("@gmail.com")) {
            signUpEmail.classList.add("error")
            Swal.fire({
                position: "top",
                text: "'@gmail.com' is missing",
            });
        }

        else {
            signUpEmail.classList.remove("error")

        }
        if (!signUpPassword.value) {
            signUpPassword.classList.add("error")
        }
        else {
            signUpPassword.classList.remove("error")

        }
        if (!firstName.value) {
            firstName.classList.add("error")
        }
        else {
            firstName.classList.remove("error")
        }
        if (!lastName.value) {
            lastName.classList.add("error")
        }
        else {
            lastName.classList.remove("error")
        }
        if (!terms.checked) {
            Swal.fire({
                position: "top",
                text: "Please Accept our T&C",
            });
        }

    }

    if (signUpEmail.value && signUpPassword.value && firstName.value && lastName.value && terms.checked) {

        try {
            const { data, error } = await client.auth.signUp({
                email: signUpEmail.value,
                password: signUpPassword.value
            })
            if (error) {
                console.log(error.message)
            }
            else {
                console.log(data)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully created your account",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            // navigate to login page
            setTimeout(() => {
                window.location.href = "login.html"
            }, 2000);
        }

        catch (error) {
            console.log(error.message);
        }
    }
})


const closeEye = document.getElementById("closeEye")
closeEye.addEventListener("click", () => {
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


// Login with Google

const loginWithGoogle = document.getElementById("signupWithGoogle")

loginWithGoogle.addEventListener("click", async () => {
    const { error } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: window.location.origin + '/post.html',
            queryParams: { access_type: 'offline', prompt: 'consent' },
        },
    })
    console.log(error)
})


// navigate to Login Page

const directLogin = document.getElementById("directLogin")
console.log(directLogin);
directLogin.addEventListener("click", () => {
    window.location.href = "login.html"
})
