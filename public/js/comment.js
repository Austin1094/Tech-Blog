const commentFormHandler = async function (event) {
    event.preventDefault();

    const body = document.querySelector('textarea[name="comment-body"]').value.trim();
    const postId = document.querySelector('input[name="post-id"]').value.trim();

    if (body) {
        await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        document.location.reload();
    }
};

document.querySelector('#new-comment-form').addEventListener('submit', commentFormHandler);