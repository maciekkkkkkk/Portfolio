const canvas = document.querySelector('.background');
const context = canvas.getContext('2d');

const RAIN_DROP_SPEED = 3;

class Raindrop {
    constructor() {
        this.width = 0;
        this.height = 10;

        this.x = random(10, canvas.width - 10);
        this.y = -this.height - random(10, canvas.height + 400);
    }
}

const random = (min, max) => {
    return Math.floor(Math.random() * (1 + max - min)) + min;
}

const raindrops = [];

const setup = () => {
    for (let i = 0; i < 100; i++) {
        raindrops.push(new Raindrop());
    }
}

const drawSplash = async (raindrop) => {
    for(let i = 0; i < 5; i++) {
        context.arc(raindrop.x, raindrop.y, 30, 0, Math.PI);
        context.fillStyle = "rgba(255,255,255,0.1)";
        context.fill();
    }
}

const update = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();

    for (const raindrop of raindrops) {
        context.moveTo(raindrop.x, raindrop.y);
        context.lineTo(raindrop.x + raindrop.width, raindrop.y + raindrop.height);

        raindrop.y += RAIN_DROP_SPEED;

        if (raindrop.y > canvas.height) {
            //drawSplash(raindrop);

            raindrop.y = -raindrop.height - random(10, canvas.height + 400);
            raindrop.x = random(10, canvas.width - 10);
        }
    }

    context.strokeStyle = 'rgba(255,255,255,0.1)';
    context.stroke();

    window.requestAnimationFrame(update);
}

setup();

window.requestAnimationFrame(update);