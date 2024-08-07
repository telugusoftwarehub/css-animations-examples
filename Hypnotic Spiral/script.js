const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let angle = 0;

function drawSpiral() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    for (let i = 0; i < 360; i++) {
        const radius = i;
        const x = radius * Math.cos((angle + i) * Math.PI / 180);
        const y = radius * Math.sin((angle + i) * Math.PI / 180);
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2, false);
        ctx.fillStyle = `hsl(${i + angle}, 100%, 50%)`;
        ctx.fill();
        ctx.closePath();
    }

    ctx.restore();
    angle += 1;
}

function animate() {
    requestAnimationFrame(animate);
    drawSpiral();
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});