const backendBaseURL = "http://127.0.0.1:8000"
const frontendBaseURL = "http://127.0.0.1:8050"

$(document).ready(function () {
    alert("Ready")
    $('#loginModal').modal('show');
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateSignUpForm() {
    function isCorrectField(element, condition) {
        if (!condition) {
            element.addClass("wrongValue");
            return false;
        }
        else if (element.is('.wrongValue'))
            element.removeClass('wrongValue')

        return true;
    }

    const username = $("input[name=username]")
    const email = $("input[name=email]");
    const last_name = $("input[name=last_name]");
    const password = $("input[name=password]");

    return (
        isCorrectField(username, username.val().length > 0)
        && isCorrectField(email, validateEmail(email.val()))
        && isCorrectField(last_name, last_name.val().length > 0)
        && isCorrectField(password, password.val().length > 5)
    )
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    console.log(data);
    console.log(url);

    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'access-control-expose-headers': 'Set-Cookie'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'unsafe-url', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log(response.status);
    console.log(response);
    return await response.json(); // parses JSON response into native JavaScript objects
}

function signUpForm() {
    console.log(validateSignUpForm())
    if (!validateSignUpForm())
        return null

    const signUpBody = {
        "username":$("input[name=username]").val(),
        "email":$("input[name=email]").val(),
        "first_name":$("input[name=first_name]").val(),
        "last_name": $("input[name=last_name]").val(),
        "description": $("input[name=description]").val(),
        "password": $("input[name=password]").val(),
    };

    console.log(signUpBody);
    const url = backendBaseURL + "/user/create-user";

    postData(url, signUpBody)
        .then((data) => {
            console.log("Got data", data); // JSON data parsed by `response.json()` call
        })
        .catch((e) => console.log(e));
}

function getCookie(name) {
          let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
          ));
          return matches ? decodeURIComponent(matches[1]) : undefined;
}

function logInForm() {
    alert("Login")
    const logInBody = {
        "username":$("input[name=username]").val(),
        "password": $("input[name=password]").val(),
    };
    console.log(logInBody);
    const url = backendBaseURL + "/login";
    const response_1 = fetch( frontendBaseURL+"/cookie-and-object", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'access-control-expose-headers': 'Set-Cookie'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'unsafe-url', // no-referrer, *client
            });
    console.log(response_1)

    postData(url, logInBody)
        .then((data) => {
            // alert(getCookie("csrf_refresh_token"))
            console.log("Got data", data); // JSON data parsed by `response.json()` call
            // const response_1 = fetch(backendBaseURL + "/refresh", {
            //     method: 'Post', // *GET, POST, PUT, DELETE, etc.
            //     credentials: 'include', // include, *same-origin, omit
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'X-CSRF-TOKEN': getCookie("csrf_refresh_token")
            //     },
            // });
            // console.log(response_1);
            //
            // const response_2 = fetch(backendBaseURL + "/protected", {
            //     method: 'GET',
            //     credentials: 'include',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            // });
            // console.log(response_2);
        })
        .catch((e) => console.log(e));
}
