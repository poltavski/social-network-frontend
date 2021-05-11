$(document).ready(function () {
    alert("Ready")
    $('#loginModal').modal('show');
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })


});

function signUpForm() {
    alert('click');
        let formData = new FormData(document.querySelector('form'));
        alert(formData);
}
