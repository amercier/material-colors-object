const chalk = require('chalk');
const cheerio = require('cheerio');
const chroma = require('chroma-js');
const fetch = require('node-fetch');
const { supportsColor } = require('supports-color');

/**
 * Cheerio object, similar to jQuery object.
 * @typedef {Object} Cheerio
 */

/**
 * Node.js stream
 * @typedef {Object} Stream
 */

/**
 * A logger implementation that does nothing.
 *
 * @type {Stream}
 */
const noopStream = {
  write: () => {},
};

/**
 * Find elements matching a selector, or throw an error if none is found.
 *
 * @param {Cheerio} element - An element.
 * @param {string} selector - A CSS selector.
 * @returns {Cheerio} A list of elements matching `selector`.
 * @throws An error if no elements matched `selector`.
 */
function findAtLeastOneElement(element, selector) {
  const elements = element.find(selector);
  if (elements.length === 0) {
    throw new Error(`Could not find any element matching "${selector}" in: ${element.html ? element.html() : element}`);
  }
  return elements;
}

/**
 * Find elements matching a selector, or throw an error if none or more thant 1 is found.
 *
 * @param {Cheerio} element - An element.
 * @param {string} selector - A CSS selector.
 * @returns {Cheerio} A list of 1 element matching `selector`.
 */
function findExactlyOneElement(element, selector) {
  const elements = findAtLeastOneElement(element, selector);
  if (elements.length > 1) {
    throw new Error([
      `Expected to find only 1 element matching "${selector}",`,
      `found ${elements.length} in: ${element.html()}`,
    ].join(' '));
  }
  return elements;
}

/**
 * Get the element containing the color shade name, from a color element.
 *
 * @param {Cheerio} colorElement - Color element to process.
 * @param {string} selectors - Selectors settings.
 * @returns {Cheerio} Element containing the color shade name.
 */
function getShadeNameElement(colorElement, selectors) {
  return findExactlyOneElement(colorElement, selectors.shadeName);
}

/**
 * Get the element containing the color shade value, from a color element.
 *
 * @param {Cheerio} colorElement - Color element to process.
 * @param {string} selectors - Selectors settings.
 * @returns {Cheerio} Element containing the color shade value.
 */
function getShadeValueElement(colorElement, selectors) {
  return findExactlyOneElement(colorElement, selectors.shadeValue);
}

/**
 * Get the color name from a color element.
 *
 * @param {Cheerio} colorElement - Color element to process.
 * @param {string} selectors - Selectors settings.
 * @returns {string} Color name.
 */
function getColorName(colorElement, selectors) {
  return getShadeNameElement(colorElement, selectors).text().replace(/ \d+$/, '');
}

/**
 * Get the color shade name from a color element.
 *
 * @param {Cheerio} colorElement - Color element to process.
 * @param {string} selectors - Selectors settings.
 * @returns {string} Color shade name.
 */
function getShadeName(colorElement, selectors) {
  return getShadeNameElement(colorElement, selectors).text().replace(/^.* /, '').toLowerCase();
}

/**
 * Get the color shade value from a color element.
 *
 * @param {Cheerio} colorElement - Color element to process.
 * @param {string} selectors - Selectors settings.
 * @returns {string} Color shade value.
 */
function getShadeValue(colorElement, selectors) {
  return getShadeValueElement(colorElement, selectors).text().toLowerCase();
}

/**
 * Extract data from a color element.
 *
 * @param {Cheerio} colorElement - Color element to process.
 * @param {string} selectors - Selectors settings.
 * @returns {Object} An object containing the color data.
 */
function colorElementToObject(colorElement, selectors) {
  const value = getShadeValue(colorElement, selectors);
  return {
    value,
    isDark: colorElement.is(selectors.isDark),
    lightValue: chroma(value).brighten().hex(),
    darkValue: chroma(value).darken().hex(),
  };
}

/**
 * Extract data from a color group element.
 *
 * @param {Cheerio} colorGroupElement - Color group element to process.
 * @param {string} selectors - Selectors settings.
 * @returns {Object} An object containing all color group data.
 */
function colorGroupElementToObject(colorGroupElement, selectors) {
  const colorElements = findAtLeastOneElement(colorGroupElement, selectors.colorDetails);
  return {
    name: getColorName(colorElements.first(), selectors),
    shades: colorElements
      .toArray()
      .reduce((accumulator, element) => {
        const colorElement = cheerio(element);
        const id = getShadeName(colorElement, selectors);
        accumulator[id] = colorElementToObject(colorElement, selectors);
        return accumulator;
      }, {}),
  };
}

/**
 * Whether a color group element is valid.
 * To be valid, it must contain more than 2 colors.
 *
 * @param {Cheerio} colorGroupElement - Color group element.
 * @param {Object} selectors - Set of selectors.
 * @returns {boolean} `true` if `colorGroupElement` is valid, `false` otherwise.
 */
function isColorGroupValid(colorGroupElement, selectors) {
  return colorGroupElement.find(selectors.colorDetails).length > 2; // > 2 to exclude Black/White
}

/**
 * Fetch colors from Material Design online documentation.
 *
 * @param {string} url - URL to fetch data from.
 * @param {string} selectors - CSS selectors.
 * @param {Stream} [log=noopStream] - Stream to log in.
 * @returns {Object} An object containing all color data.
 */
async function generate(url, selectors, log = noopStream) {
  const { cyan, green } = chalk.constructor({ enabled: true, level: supportsColor(log) });

  log.write(`Fetching ${cyan(url)}... `);
  const response = await fetch(url);
  const html = await response.text();
  const dom = cheerio.load(html);
  log.write(`${green('✓ done')}\n`);

  const colorGroupElements = findAtLeastOneElement(dom('html'), selectors.colorGroup)
    .toArray()
    .map(cheerio)
    .filter(element => isColorGroupValid(element, selectors));

  log.write(`Found ${cyan(colorGroupElements.length)} colors, processing...\n`);

  const colorGroups = colorGroupElements
    .reduce((accumulator, element) => {
      const color = colorGroupElementToObject(element, selectors);
      const id = color.name.toLowerCase().replace(/ /g, '-');
      accumulator[id] = color;
      log.write(`${green('  ✓')} Processed ${cyan(color.name)} color, found ${cyan(Object.values(color.shades).length)} shades\n`);
      return accumulator;
    }, {});

  log.write(`${green('✓ Done')} processing ${cyan(colorGroupElements.length)} colors!\n`);
  return colorGroups;
}

/**
 * Exports.
 *
 * @type {Object}
 */
module.exports = {
  noopStream,
  findAtLeastOneElement,
  findExactlyOneElement,
  getShadeNameElement,
  getShadeValueElement,
  getColorName,
  getShadeName,
  getShadeValue,
  colorElementToObject,
  colorGroupElementToObject,
  generate,
};
