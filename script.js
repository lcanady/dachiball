document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('ballCanvas');
    const ctx = canvas.getContext('2d');
    let animationFrameId; // Store the animation frame ID

    let ballRadius = canvas.width * 0.25; // Ball radius as a percentage of canvas width
    let x = canvas.width / 2; // Start the ball in the middle of the canvas
    let dx = canvas.width * 0.002; // Initial speed as a percentage of canvas width
    let rotation = 0; // Ball rotation in radians

    const ballImage = new Image();
    ballImage.src = 'imgs/dachiball.svg'; // Update with the path to your ball image
    ballImage.onload = () => {
        drawBall();
    };

    const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ballRadius = canvas.width * 0.25; // Update ball radius based on new canvas size

        // Check if the ball is out of bounds, if so, reset its position
        if (x - ballRadius < 0 || x + ballRadius > canvas.width) {
            x = canvas.width / 2; // Reset ball to the center
            rotation = 0; // Reset rotation
        }
        dx = canvas.width * 0.002; // Update speed proportionally to the new canvas width

        cancelAnimationFrame(animationFrameId); // Stop the current animation
        drawBall(); // Start the animation again
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function drawBall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        // Update ball position and rotation
        x += dx;
        rotation += dx / ballRadius;
    
        // Ensure the ball and its shadow don't go out of bounds
        if (x + ballRadius > canvas.width || x - ballRadius < 0) {
            dx = -dx;
        }
    
        // Calculate shadow position to ensure it's always directly below the ball
        // The shadow should not exceed the bottom of the canvas
        let shadowOffsetY = ballRadius; // The vertical offset of the shadow from the ball's center
        let shadowPosY = canvas.height / 2 + shadowOffsetY; // Y position of the shadow
        let maxShadowPosY = canvas.height - ballRadius * 0.1; // Maximum Y position to keep shadow within canvas
        if (shadowPosY > maxShadowPosY) {
            shadowPosY = maxShadowPosY;
        }
    
        // Draw shadow
        ctx.save();
        let shadowRadiusX = ballRadius * 0.65;
        let shadowRadiusY = ballRadius * 0.1;
        ctx.fillStyle = 'rgba(64, 24, 14, 0.3)';
        ctx.beginPath();
        ctx.ellipse(x, shadowPosY, shadowRadiusX, shadowRadiusY, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    
        // Draw the ball
        ctx.save();
        ctx.translate(x, canvas.height / 2);
        ctx.rotate(rotation);
        ctx.drawImage(ballImage, -ballRadius, -ballRadius, ballRadius * 2, ballRadius * 2);
        ctx.restore();
    
    
    
        // Request the next frame of the animation
        animationFrameId = requestAnimationFrame(drawBall);
    }
    
    
});
