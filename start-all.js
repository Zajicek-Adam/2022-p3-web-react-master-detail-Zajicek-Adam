const { exec } = require('child_process');

// Function to run npm start in a directory
const runNpmStart = (directory) => {
  exec('npm start', { cwd: directory }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error in ${directory}:`, error);
      return;
    }
    console.log(`Output of ${directory}:`, stdout);
    console.error(`Error output of ${directory}:`, stderr);
  });
};

// Run npm start in project directory
runNpmStart('./skillgap');

// Run npm start in server directory
runNpmStart('./server');