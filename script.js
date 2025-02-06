const character = document.getElementById("character");
const canvas = document.getElementById("canvas");
const welcomeButton = document.getElementById("welcomeButton");
const penguinButton = document.getElementById("penguinButton");
const walkingPenguin = document.getElementById("walkingPenguin");
const backgroundMusic = document.getElementById("backgroundMusic");


let isDragging = false;
let offsetX, offsetY;
let isPenguinWalking = false; 


//When welcome button is clicked, plays music
welcomeButton.addEventListener("click", () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    } else {
        backgroundMusic.pause();
    }
});

// When mouse is pressed down
character.addEventListener("mousedown", (e) => {
    isDragging = true;

    // Get the initial cursor position relative to the character
    offsetX = e.clientX - character.getBoundingClientRect().left;
    offsetY = e.clientY - character.getBoundingClientRect().top;

    character.style.cursor = "grabbing";
});

// When mouse is moved
document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    // Calculate new position within canvas
    let x = e.clientX - offsetX - canvas.getBoundingClientRect().left;
    let y = e.clientY - offsetY - canvas.getBoundingClientRect().top;

    // Prevent character from leaving canvas
    x = Math.max(0, Math.min(x, canvas.clientWidth - character.clientWidth));
    y = Math.max(0, Math.min(y, canvas.clientHeight - character.clientHeight));

    character.style.left = `${x}px`;
    character.style.top = `${y}px`;
});

// When mouse is released
document.addEventListener("mouseup", () => {
    isDragging = false;
    character.style.cursor = "grab";
});

// Penguin waddle animation

// Penguin animation logic
penguinButton.addEventListener("click", () => {
    if (isPenguinWalking) return; // Prevent multiple penguins

    isPenguinWalking = true;
    let position = -60; // Start off-screen left
    let frame = 0;
    walkingPenguin.style.display = "block";
    walkingPenguin.style.left = `${position}px`;


    const halfwayPoint = canvas.clientWidth / 2

    const walkInterval = setInterval(() => {
        // Alternate between penguin-2.png and penguin-3.png for waddling effect
        walkingPenguin.src = frame % 2 === 0 ? "media/penguin-2.png" : "media/penguin-3.png";
        frame++;

        position += 20; // Move the penguin right
        walkingPenguin.style.left = `${position}px`;

        if (position >= halfwayPoint && character.style.display !== "none") {
            character.style.display = "none"; // Hide the character
        }

        // Stop when the penguin moves off-screen right
        if (position > canvas.clientWidth) {
            clearInterval(walkInterval);
            walkingPenguin.style.display = "none"; // Hide the penguin
            character.style.display = "block"; // Show the main character again
            isPenguinWalking = false; // Allow a new penguin to start
        }
    }
    , 100); // Change images every 150ms for waddling effect
;});
