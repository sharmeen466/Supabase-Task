//  Log In
const supabaseUrl = "https://lpofpupsdzenmczkocqb.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxwb2ZwdXBzZHplbm1jemtvY3FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4NzMxMDQsImV4cCI6MjA2NzQ0OTEwNH0.MONqwRrQ3wRokVFr2zkyWnCpt-ZMFlFM1q4LB30Fu-8"

const { createClient } = supabase
const client = createClient(supabaseUrl, supabaseKey)


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
            console.log(data);

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
