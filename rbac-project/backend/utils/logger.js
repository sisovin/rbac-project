const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'access.log');

const logUnauthorizedAccess = (message) => {
  const logMessage = `${new Date().toISOString()} - UNAUTHORIZED ACCESS: ${message}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error logging unauthorized access:', err);
    }
  });
};

const logError = (message) => {
  const logMessage = `${new Date().toISOString()} - ERROR: ${message}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error logging error:', err);
    }
  });
};

const logWarning = (message) => {
  const logMessage = `${new Date().toISOString()} - WARNING: ${message}\n`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error logging warning:', err);
    }
  });
};

module.exports = {
  logUnauthorizedAccess,
  logError,
  logWarning,
};
