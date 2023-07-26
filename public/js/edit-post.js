const editFormHandler = async function (event) {
    event.preventDefault();

    const titleEl = document.getElementById('post-title').value.trim();
    const bodyEl = document.getElementById('post-body').value.trim();
    const postId = document.getElementById('post-id').value.trim();

    fetch('/api/posts/' + postId.value, {
        method: 'PUT',
        body: JSON.stringify({
            title: titleEl.value,
            body: bodyEl.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function () {
            document.location.replace('/dashboard');
        })
        .catch(err => console.error(err));
}

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);