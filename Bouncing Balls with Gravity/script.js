const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const balls = [];
const numBalls = 50;

class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.dx = (Math.random() - 0.5) * 10;
        this.dy = (Math.random() - 0.5) * 10;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        for (let i = 0; i < balls.length; i++) {
            if (this === balls[i]) continue;
            const dx = this.x - balls[i].x;
            const dy = this.y - balls[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.radius + balls[i].radius) {
                this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                balls[i].color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                this.dx = -this.dx;
                this.dy = -this.dy;
                balls[i].dx = -balls[i].dx;
                balls[i].dy = -balls[i].dy;
            }
        }

        this.dy += 0.5; // Gravity effect
        this.draw();
    }
}

function init() {
    for (let i = 0; i < numBalls; i++) {
        const radius = 15;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        balls.push(new Ball(x, y, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => ball.update());
}

init();
animate();
