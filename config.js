/**
 * Parsing an output settings.
 *
 * @type {Object}
 * @property {string} url URL to fetch.
 * @property {Object} selectors CSS selectors to retrieve information.
 * @property {number} indentation Output indentation length
 */
module.exports = {
  url: 'https://material.io/design/color/',
  selectors: {
    colorGroup: '#tools-for-picking-colors .module-module-module > .module',
    colorDetails: '.color-tag',
    isDark: '.light',
    shadeName: '.shade',
    shadeValue: '.hex',
  },
  indentation: 2,
};
