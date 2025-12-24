export default class WaterEffect {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.drops = [];
        this.maxDrops = 60;
        this.lastDropTime = 0;
        this.dropInterval = 200;

        this.init();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createDrop() {
        return {
            x: Math.random() * this.canvas.width,
            y: -10,
            radius: Math.random() * 2 + 1.5,
            speed: Math.random() * 1.5 + 0.8,
            opacity: Math.random() * 0.4 + 0.2,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.04 + 0.01,
            hue: Math.random() * 30 + 190
        };
    }

    updateDrops() {
        this.drops.forEach((drop, index) => {
            drop.y += drop.speed;
            drop.wobble += drop.wobbleSpeed;
            drop.x += Math.sin(drop.wobble) * 0.3;

            if (drop.y > this.canvas.height + 10) {
                this.drops.splice(index, 1);
            }
        });
    }

    drawDrops() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drops.forEach(drop => {
            const gradient = this.ctx.createRadialGradient(
                drop.x, drop.y, 0,
                drop.x, drop.y, drop.radius * 2
            );
            
            gradient.addColorStop(0, `hsla(${drop.hue}, 70%, 70%, ${drop.opacity})`);
            gradient.addColorStop(0.5, `hsla(${drop.hue}, 60%, 60%, ${drop.opacity * 0.6})`);
            gradient.addColorStop(1, `hsla(${drop.hue}, 50%, 50%, 0)`);

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(drop.x, drop.y, drop.radius * 2, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity * 0.8})`;
            this.ctx.beginPath();
            this.ctx.arc(
                drop.x - drop.radius * 0.4,
                drop.y - drop.radius * 0.4,
                drop.radius * 0.6,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        });
    }

    animate(currentTime = 0) {
        if (currentTime - this.lastDropTime > this.dropInterval) {
            if (this.drops.length < this.maxDrops) {
                this.drops.push(this.createDrop());
            }
            this.lastDropTime = currentTime;
        }

        this.updateDrops();
        this.drawDrops();

        requestAnimationFrame((time) => this.animate(time));
    }
}
