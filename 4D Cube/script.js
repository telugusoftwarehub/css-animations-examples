const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const size = 200;
const speed = 0.01;
let angleXY = 0, angleXZ = 0, angleYZ = 0, angleZW = 0;

// Initialize 16 vertices of a tesseract
const points = [
    [-1, -1, -1, -1], [1, -1, -1, -1], [-1, 1, -1, -1], [1, 1, -1, -1],
    [-1, -1, 1, -1], [1, -1, 1, -1], [-1, 1, 1, -1], [1, 1, 1, -1],
    [-1, -1, -1, 1], [1, -1, -1, 1], [-1, 1, -1, 1], [1, 1, -1, 1],
    [-1, -1, 1, 1], [1, -1, 1, 1], [-1, 1, 1, 1], [1, 1, 1, 1]
];

function rotate4D(point, angleXY, angleXZ, angleYZ, angleZW) {
    let [x, y, z, w] = point;

    // Rotate in XY plane
    let xyX = x * Math.cos(angleXY) - y * Math.sin(angleXY);
    let xyY = x * Math.sin(angleXY) + y * Math.cos(angleXY);
    x = xyX; y = xyY;

    // Rotate in XZ plane
    let xzX = x * Math.cos(angleXZ) - z * Math.sin(angleXZ);
    let xzZ = x * Math.sin(angleXZ) + z * Math.cos(angleXZ);
    x = xzX; z = xzZ;

    // Rotate in YZ plane
    let yzY = y * Math.cos(angleYZ) - z * Math.sin(angleYZ);
    let yzZ = y * Math.sin(angleYZ) + z * Math.cos(angleYZ);
    y = yzY; z = yzZ;

    // Rotate in ZW plane
    let zwZ = z * Math.cos(angleZW) - w * Math.sin(angleZW);
    let zwW = z * Math.sin(angleZW) + w * Math.cos(angleZW);
    z = zwZ; w = zwW;

    return [x, y, z, w];
}

function project(point) {
    let [x, y, z, w] = point;

    // Perspective projection (higher dimensions to 2D)
    const perspective = 3 / (3 - w);
    const xProj = x * perspective * size;
    const yProj = y * perspective * size;

    return [xProj + canvas.width / 2, yProj + canvas.height / 2];
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const projectedPoints = points.map(p => project(rotate4D(p, angleXY, angleXZ, angleYZ, angleZW)));

    // Draw edges between connected vertices of the tesseract
    for (let i = 0; i < 16; i++) {
        for (let j = i + 1; j < 16; j++) {
            // Vertices are connected if they differ by exactly one dimension
            const diff = points[i].reduce((acc, val, idx) => acc + (val !== points[j][idx] ? 1 : 0), 0);
            if (diff === 1) {
                ctx.beginPath();
                ctx.moveTo(...projectedPoints[i]);
                ctx.lineTo(...projectedPoints[j]);
                ctx.strokeStyle = 'white';
                ctx.stroke();
            }
        }
    }

    angleXY += speed;
    angleXZ += speed * 0.7;
    angleYZ += speed * 0.5;
    angleZW += speed * 0.9;

    requestAnimationFrame(draw);
}

draw();