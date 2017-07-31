/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
//Promise.promisifyAll(fs);
var getGitHubProfile = require('./promisification.js').getGitHubProfileAsync;

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise(function(resolve, reject) {
    fs.readFile(readFilePath, 'utf8', function(err, file) {
      if (err) {
        reject(err);
      } else {
        var userName = file.split('\n')[0];
        resolve(userName);
      }
    });
  }).then(function(userName) {
    //console.log(userName);
    getGitHubProfile(userName).then(function(profile) {
      return new Promise(function(resolve, reject) {
        fs.writeFile(writeFilePath, JSON.stringify(profile), 'utf8', function(err, file) {
          if (err) {
            reject(err);
          } else {
            resolve('file written');
          }
        });
      });
    });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
