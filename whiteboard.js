const canvas = document.createElement('canvas');
canvas.width = document.getElementById('whiteboard').clientWidth;
canvas.height = document.getElementById('whiteboard').clientHeight;
document.getElementById('whiteboard').appendChild(canvas);
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function uploadVideo() {
    const fileInput = document.getElementById('uploadVideo');
    if (fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const videoURL = URL.createObjectURL(file);
    const videoSection = document.getElementById('videoSection');
    
    const videoContainer = document.createElement('div');
    const video = document.createElement('video');
    video.controls = true;
    video.src = videoURL;
    
    const likeButton = document.createElement('button');
    likeButton.innerText = 'Like';
    let likes = 0;
    likeButton.onclick = () => {
        likes += 1;
        likeButton.innerText = `Like (${likes})`;
    };
    
    const commentSection = document.createElement('div');
    commentSection.classList.add('comment-section');
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Add a comment...';
    const commentButton = document.createElement('button');
    commentButton.innerText = 'Comment';
    commentButton.onclick = () => {
        const comment = document.createElement('p');
        comment.innerText = commentInput.value;
        commentSection.appendChild(comment);
        commentInput.value = '';
    };
    
    videoContainer.appendChild(video);
    videoContainer.appendChild(likeButton);
    videoContainer.appendChild(commentInput);
    videoContainer.appendChild(commentButton);
    videoContainer.appendChild(commentSection);
    videoSection.appendChild(videoContainer);
}
