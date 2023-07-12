const commentFormHandler = async function (event) {
    event.preventDefault();

    const body = document.querySelector('textarea[name="comment-body"]').value.trim();
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (body) {
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                comment_text,
                post_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#new-comment-form').addEventListener('submit', commentFormHandler);