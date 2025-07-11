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


// signupWithGoogle.addEventListener("click", function(){

// })

signUpBtn && signUpBtn.addEventListener("click", async function () {
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

//  Log In

const loginBtn = document.getElementById("loginBtn")
const loginEmail = document.getElementById("loginEmail")
const loginPass = document.getElementById("loginPass")

console.log(loginBtn);
console.log(loginEmail);
console.log(loginPass);


loginBtn && loginBtn.addEventListener("click", async function () {
    if (loginEmail.value && loginPass.value) {

        try {
            const { data, error } = await client.auth.signInWithPassword({
                email: loginEmail.value,
                password: loginPass.value
            })
            if (error) {
                console.log(error.message)
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
            }
            // navigate to home page
            setTimeout(() => {
                window.location.href = "home.html"
            }, 2000);
        }

        catch (error) {
            console.log(error.message);
        }
    }
})

const loginWithGoogle = document.getElementById("signupWithGoogle")
loginWithGoogle.addEventListener("click", async () => {
    const { data, error }= await client.auth.signInWithOAuth({
        provider: 'google',
    })
    console.log(data)
})