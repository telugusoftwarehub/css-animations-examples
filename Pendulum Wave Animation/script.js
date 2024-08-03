const container = document.getElementById('pendulumContainer');
const numberOfPendulums = 15;

for (let i = 0; i < numberOfPendulums; i++) {
    const pendulum = document.createElement('div');
    pendulum.classList.add('pendulum');
    pendulum.style.left = `${(i / numberOfPendulums) * 100}%`;
    pendulum.style.animation = `swing ${2 + i * 0.1}s infinite ease-in-out alternate`;

    const ball = document.createElement('div');
    ball.classList.add('ball');

    pendulum.appendChild(ball);
    container.appendChild(pendulum);
}

const style = document.createElement('style');
style.innerHTML = `
    @keyframes swing {
        from { transform: rotate(-30deg); }
        to { transform: rotate(30deg); }
    }
`;
document.head.appendChild(style);