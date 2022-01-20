const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
let hue = 0;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

    const particleCount = 100;
    const angleIncrement = (Math.PI * 2) / particleCount;

    for (let i = 0; i < particleCount; i++) {
        hue = Math.random() * 360;
        particles.push(new Particle({
            x: Math.cos(angleIncrement * i) * Math.random(),
            y: Math.sin(angleIncrement * i) * Math.random(),
        }));
    }
})


const gravity = 0.005;
const friction = 0.99;

class Particle {
    constructor(velocity) {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = 1;
        this.color = 'hsl(' + hue + ', 100%, 50%)'; 
        this.speedX = velocity.x;
        this.speedY = velocity.y;
    }
    update() {
        // this.speedX *= friction;
        this.speedY += gravity;
        this.x += this.speedX;
        this.y += this.speedY;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }
}

function handleParticle() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
}

function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue++;
    requestAnimationFrame(animate);
}
animate();
