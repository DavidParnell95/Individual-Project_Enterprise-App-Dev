//login
var loginForm = document.querySelector('#login-form');

if(loginForm)
{
    loginForm.addEventListener('submit', (e) =>{
        e.preventDefault();

        //Get user info
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;

        //log in the user
        firebase.auth().signInWithEmailAndPassword(email, password).then((cred) =>{
        
            //close model and reset form
            const modal = document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close;//close modal
            loginForm.close();
        })
    })
}

//register
$("#btn-reg").click(function(){
    var email = $("#reg-email").val();
    var password = $("#reg-password").val();
    
    if(email != "" && password != "")
    {
        var result = firebase.auth().createUserWithEmailAndPassword(email,password);

        result.catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("message: " +errorMessage);
        });
    }

    else{
        
    }
})

//logout
//Get log in button from page
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) =>{
    e.preventDefault();//Prevent page from reloading when pressed

    //Async, waits for sign out to complete
    firebase.auth().signOut()
});

//Register 
const signupForm = document.querySelector('#register-form');

if(signupForm)
{
    signupForm.addEventListener('submit', (e) =>{
        e.preventDefault();

        const email = signupForm['reg-email'].value;
        const password = signupForm['reg-email'].value;
        const conf = signupForm['reg-conf'].value;

        if(password == conf)
        {
            firebase.auth().createUserWithEmailAndPassword(
                email, password
                ).then(cred => {
                    console.log(cred);

                    const modal = document.querySelector('#modal-register');
                    M.Modal.getInstance(modal).close();
                    signupForm.reset();
                })
        }

    })
}