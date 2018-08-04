material-colors-object
======================

> A plain Javascript object containing [Material Design Color Palette](https://material.io/design/color/the-color-system.html#tools-for-picking-colors) data. Supports minimum contrast and light & dark variants.

[![Latest Stable Version](https://img.shields.io/npm/v/material-colors-object.svg)](https://www.npmjs.com/package/material-colors-object)
[![dependencies Status](https://david-dm.org/amercier/material-colors-object/status.svg)](https://david-dm.org/amercier/material-colors-object)
[![Build Status](https://img.shields.io/travis/amercier/material-colors-object/master.svg)](https://travis-ci.org/amercier/material-colors-object)
[![Test Coverage](https://img.shields.io/codecov/c/github/amercier/material-colors-object/master.svg)](https://codecov.io/github/amercier/material-colors-object?branch=master)

Installation
------------

Prerequisites: [Node.js](https://nodejs.org/) (any version), **npm** (any version).

    npm install --save material-colors-object

Usage
-----

```js
const materialColors = require('material-colors-object');
console.log(materialColors);
```

```js
{
  red: {
    name: 'Red',
    shades: {
      '50': {
        value: '#ede7f6',      // Regular color (no variant)
        isDark: false,         // Legible with dark foreground color
        lightValue: '#ffffff', // Light variant
        darkValue: '#bbb5c3'   // Dark variant
      },
      // ...
      '500': {
        value: '#f44336',
        isDark: true,          // Light foreground color recommended
        lightValue: '#ff7961',
        darkValue: '#ba000d'
      },
      // ...
      '900': { /* ... */ },
      a100: { /* ... */ },
      a200: { /* ... */ },
      a400: { /* ... */ },
      a700: { /* ... */ }
    }
  },
  pink: {
    name: 'Pink',
    shades: { /* ... */ }
  },
  purple: {
    name: 'Purple',
    shades: { /* ... */ }
  },
  deep-purple: {
    name: 'Deep purple',
    shades: { /* ... */ }
  },
  // ...
  black: {
    name: 'Black',
    value: '#000000'
  },
  white: {
    name: 'White',
    value: '#ffffff'
  }
}
```

Notes
-----

### Parsing

Data is generated at build time by parsing HTML code from <https://material.io/design/color/the-color-system.html> and stored in a json file, which is then published. No HTTP requests is made either during installation or runtime.

### Dark & light variants

[chroma.js](http://gka.github.io/chroma.js/) library is used to generate light and dark variant. This is the same library that is used by the [Official Material Color Tool](https://material.io/tools/color/#!/).

References
----------

- [Official Material Color Documentation](https://material.io/design/color/the-color-system.html)
- [Official Material Color Tool](https://material.io/tools/color/#!/)

Contributing
------------

Please refer to the [guidelines for contributing](./CONTRIBUTING.md).

[![devDependencies Status](https://david-dm.org/amercier/material-colors-object/dev-status.svg)](https://david-dm.org/amercier/material-colors-object?type=dev)

License
-------

[![License](https://img.shields.io/npm/l/material-colors-object.svg)](LICENSE.md)

---
<sup>_Created with [npm-package-skeleton](https://github.com/amercier/npm-package-skeleton)._</sup>
