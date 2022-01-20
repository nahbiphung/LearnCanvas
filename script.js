const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
let hue = 0;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
};

canvas.addEventListener("click", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;

    const particleCount = 100;
    const angleIncrement = (Math.PI * 2) / particleCount;
    const power = Math.random() * 5 + 1;

    for (let i = 0; i < particleCount; i++) {
        hue = Math.random() * 360;
        particles.push(
            new Particle({
                x: Math.cos(angleIncrement * i) * Math.random() * power,
                y: Math.sin(angleIncrement * i) * Math.random() * power,
            })
        );
    }
});

const gravity = 0.005;
const friction = 0.99;

class Particle {
    constructor(velocity) {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = 1;
        this.color = "hsl(" + hue + ", 100%, 50%)";
        this.speedX = velocity.x;
        this.speedY = velocity.y;
        this.alpha = 1;
    }
    update() {
        this.speedX *= friction;
        this.speedY *= friction;
        this.speedY += gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.005;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}

function handleParticle() {
    particles.forEach((particle, i) => {
        if (particle.alpha > 0) {
            particle.update();
            particle.draw();
        } else {
            particles.splice(i, 1);
        }
    });
}

function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue++;
    requestAnimationFrame(animate);
}
animate();
