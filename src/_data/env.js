module.exports = function() {
  return {
    production: process.env.ELEVENTY_RUN_MODE === 'build'
  }
}