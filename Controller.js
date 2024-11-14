// Robot Car Controller Module

// Helper function to send commands
function sendCommand(ipAddress, state) {
    const url = `http://${ipAddress}/?State=${state}`;
    return fetch(url)
        .then(response => response.ok ? response.text() : Promise.reject("Failed to send command"))
        .catch(error => console.error("Error:", error));
}

// Movement Commands
function moveForward(ipAddress) { return sendCommand(ipAddress, "F"); }
function moveBackward(ipAddress) { return sendCommand(ipAddress, "B"); }
function moveLeft(ipAddress) { return sendCommand(ipAddress, "L"); }
function moveRight(ipAddress) { return sendCommand(ipAddress, "R"); }
function moveDiagonalForwardRight(ipAddress) { return sendCommand(ipAddress, "I"); }
function moveDiagonalForwardLeft(ipAddress) { return sendCommand(ipAddress, "G"); }
function moveDiagonalBackwardRight(ipAddress) { return sendCommand(ipAddress, "J"); }
function moveDiagonalBackwardLeft(ipAddress) { return sendCommand(ipAddress, "H"); }
function stop(ipAddress) { return sendCommand(ipAddress, "S"); }

// Speed Control
function setSpeed(ipAddress, level) {
    if ((level >= 0 && level <= 9) || level === "q") {
        return sendCommand(ipAddress, level);
    } else {
        console.error("Invalid speed level. Use 0-9 or 'q'.");
    }
}

// Lamp Control
function turnLampOn(ipAddress) { return sendCommand(ipAddress, "W"); }
function turnLampOff(ipAddress) { return sendCommand(ipAddress, "w"); }

// Exporting the module
export {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    moveDiagonalForwardRight,
    moveDiagonalForwardLeft,
    moveDiagonalBackwardRight,
    moveDiagonalBackwardLeft,
    stop,
    setSpeed,
    turnLampOn,
    turnLampOff
};

// Example usage:
// moveForward("192.168.4.1");
// setSpeed("192.168.4.1", 5);
// turnLampOn("192.168.4.1");
