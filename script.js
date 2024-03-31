document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('ballCanvas');
    const ctx = canvas.getContext('2d');

    const logoImage = new Image();
    logoImage.src = "imgs/logo.png"; // Use the SVG data URL here
    logoImage.onload = () => {
        drawLogo();
    };

    function drawLogo() {
        // Make the logo width a percentage of the canvas width, e.g., 30%
        const logoWidthPercentage = 0.50; // Adjust this value as needed
        const logoWidth = canvas.width * logoWidthPercentage;
        // Assume the logo's original width-to-height ratio is 5:1 (adjust as per your actual logo)
        const aspectRatio = 5;
        const logoHeight = logoWidth / aspectRatio;
    
        // Center the logo horizontally
        const logoX = (canvas.width - logoWidth) / 2;
        // Position the logo above the bottom of the canvas, with a margin
        // Let's say we want the bottom of the logo to be 5% of the canvas height from the bottom
        const bottomMarginPercentage = 0.05; // Adjust this value as needed
        const logoY = canvas.height - (canvas.height * bottomMarginPercentage) - logoHeight;
    
        ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);
    }



    // Initial ball radius as a percentage of the canvas width
    let ballRadius = canvas.width * 0.22; // Example: ball is 5% of the canvas width

    const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ballRadius = canvas.width * 0.22; // Update ball radius based on new canvas size
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let x = ballRadius;
    let dx = 50; // Change in position per frame might need adjustment for scaling
    let rotation = 0; // Ball rotation in radians

    const ballImage = new Image();
    ballImage.src = 'imgs/dachiball.png'; // Update with the path to your image
    ballImage.onload = () => {
        // Adjust dx based on canvas size for consistent movement speed
        dx = canvas.width * 0.002; // Example: dx is 0.2% of the canvas width
        drawBall();
    };

    function drawBall() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        
         // Draw shadow first
    ctx.save(); // Save the context's current state
    let shadowOffsetY = ballRadius * 0.99; // Increase offset to ensure visibility
    let shadowRadiusX = ballRadius * 0.65; // Adjust based on visual preference
    let shadowRadiusY = ballRadius * 0.1; // Make the shadow flatter
    ctx.fillStyle = 'rgba(64, 24, 14, 0.3)'; // Shadow color and opacity
    ctx.beginPath();
    ctx.ellipse(x, canvas.height / 2 + shadowOffsetY, shadowRadiusX, shadowRadiusY, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore(); // Restore the context's state
    
        // Then draw the ball
        ctx.translate(x, canvas.height / 2);
        ctx.rotate(rotation);
        ctx.drawImage(ballImage, -ballRadius, -ballRadius, ballRadius * 2, ballRadius * 2);
    
        ctx.restore();
    
        x += dx;
        rotation += dx / ballRadius;
    
        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx; // Reverse direction at the edges
        }
    
        drawLogo();
        requestAnimationFrame(drawBall);
    }
});
