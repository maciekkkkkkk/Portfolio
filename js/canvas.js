const { clientWidth, clientHeight } = document.documentElement;
const canvas = document.querySelector('.background');
const context = canvas.getContext('2d');

const RAIN_DROP_SPEED = 10;

const raindrops = [];
const splashes = [];

class Raindrop {
    constructor() {
        this.width = 0;
        this.height = random(10, 30);

        this.x = random(10, canvas.width - 10);
        this.y = -this.height - random(10, canvas.height + 400);
    }
}

class Splash {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0.1;
    }
}

const setup = () => {
    resize();

    for (let i = 0; i < 100; i++) {
        raindrops.push(new Raindrop());
    }
    
    window.requestAnimationFrame(update);
}

const resize = () => {
    canvas.width = clientWidth;
    canvas.height = clientHeight;
}

const drawSplash = (splash) => {
    context.beginPath();
    const alpha = 1 - splash.radius / 10;

    context.strokeStyle = `rgba(255,255,255,${alpha})`;
    if (alpha < 0.1) {
        splashes.splice(splashes.indexOf(splash), 1);
    }
    context.ellipse(splash.x, splash.y, splash.radius, 1.5, 0, 0, Math.PI);
    context.stroke();
    splash.radius += 0.2;
}

const drawRaindrop = (raindrop) => {
    context.beginPath();
    context.moveTo(raindrop.x, raindrop.y);
    context.lineTo(raindrop.x + raindrop.width, raindrop.y + raindrop.height);
    context.stroke();
    context.strokeStyle = 'rgba(255,255,255,0.1)';

    raindrop.y += RAIN_DROP_SPEED;

    const rand = random(canvas.height - 200, canvas.height);
    if (raindrop.y > rand) {
        splashes.push(new Splash(raindrop.x, raindrop.y));

        raindrop.y = -raindrop.height - random(10, canvas.height + 400);
        raindrop.x = random(10, canvas.width - 10);
        raindrop.height = random(10, 30);
    }
}

const update = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (const raindrop of raindrops) {
        drawRaindrop(raindrop);
    }

    for (const splash of splashes) {
        drawSplash(splash);
    }

    window.requestAnimationFrame(update);
}

const random = (min, max) => {
    return Math.floor(Math.random() * (1 + max - min)) + min;
}

window.addEventListener('load', setup);
window.addEventListener('resize', resize);