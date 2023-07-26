const signupFormHandler = async function (event) {
    event.preventDefault();

    const usernameEl = document.querySelector('#username-input-signup').value.trim();
    const passwordEl = document.querySelector('#password-input-signup').value.trim();

    fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value
        }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(function () {
            document.location.replace('/dashboard');
        })
        .catch(err => console.log(err));
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);