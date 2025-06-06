class Spark {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.lifespan = Math.random() * 100 + 100;
        this.age = 0;
        this.color = `rgba(255, ${180 + Math.random() * 75}, 0,`;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.age++;

        // Wrap around screen
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;

        // Fade based on age
        const opacity = Math.max(0, (this.lifespan - this.age) / this.lifespan);
        return opacity > 0;
    }

    draw(ctx) {
        const opacity = (this.lifespan - this.age) / this.lifespan;
        ctx.fillStyle = this.color + opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('sparkCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const sparks = [];
    const maxSparks = 50; // Adjust this number to control the number of sparks

    function createSpark() {
        if (sparks.length < maxSparks) {
            sparks.push(new Spark(canvas));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Create new sparks
        if (Math.random() < 0.1) createSpark();

        // Update and draw sparks
        for (let i = sparks.length - 1; i >= 0; i--) {
            const spark = sparks[i];
            const alive = spark.update();
            
            if (alive) {
                spark.draw(ctx);
            } else {
                sparks.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}); 