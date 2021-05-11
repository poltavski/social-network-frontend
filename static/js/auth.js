const backendBaseURL = "http://127.0.0.1:8000"

$(document).ready(function () {
    alert("Ready")
    $('#loginModal').modal('show');
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
});

async function postData(url = '', data = {}) {
          // Default options are marked with *
          const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
        return await response.json(); // parses JSON response into native JavaScript objects
    }

function signUpForm() {
    alert("Sign up")
    const form = document.forms.signUp;
    console.log(form.elements);

    const signUpBody = {
        "username":form.elements.username.value,
        "email":form.elements.email.value,
        "first_name":form.elements.name.value,
        "last_name": form.elements.surname.value,
        "description": form.elements.description.value,
        "password": form.elements.password.value,
    };
    // TODO: Validate form!

    console.log(signUpBody);
    const url = backendBaseURL + "/create-user";

    postData(url, signUpBody)
        .then((data) => {
            console.log(data); // JSON data parsed by `response.json()` call
        });
}

function logInForm() {
    alert("Login")
    const form = document.forms.signIn;
    console.log(form.elements)
}