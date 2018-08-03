Contributing Guidelines
=======================

Issues
------

Feel free to [open an issue](https://github.com/amercier/material-colors-object/issues/new),
or propose a [pull request](https://github.com/amercier/material-colors-object/pulls).
To prevent duplication, please look at [existing issues](https://github.com/amercier/material-colors-object/issues?q=is%3Aissue) before posting a new one.

TL;DR
-----

| Command         | Description |
|-----------------|-------------|
| `npm run build` | Generates . |
| `npm run lint`  | Runs [ESLint](https://eslint.org/) linter. |


Coding standards
----------------

This project follows [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript). It is enforced at build time by [ESLint](http://eslint.org/).

Getting started
---------------

#### Step 1. Checkout repository

```bash
git clone https://github.com/amercier/material-colors-object.git
cd material-colors-object
```

_(or your clone's Git URL)_

#### Step 2. Install NPM dependencies

Prerequisites: [Node.js](https://nodejs.org/) (latest), **npm** (latet).

```bash
npm install
```

#### Step 3. Build `index.json`

```bash
npm run build
```

```log
Fetching https://material.io/design/color/... ✓ done
Found 19 colors, processing...
  ✓ Processed Red color, found 14 shades
  ✓ Processed Pink color, found 14 shades
  ✓ Processed Purple color, found 14 shades
  ✓ Processed Deep purple color, found 14 shades
  ✓ Processed Indigo color, found 14 shades
  ✓ Processed Blue color, found 14 shades
  ✓ Processed Light Blue color, found 14 shades
  ✓ Processed Cyan color, found 14 shades
  ✓ Processed Teal color, found 14 shades
  ✓ Processed Green color, found 14 shades
  ✓ Processed Light Green color, found 14 shades
  ✓ Processed Lime color, found 14 shades
  ✓ Processed Yellow color, found 14 shades
  ✓ Processed Amber color, found 14 shades
  ✓ Processed Orange color, found 14 shades
  ✓ Processed Deep Orange color, found 14 shades
  ✓ Processed Brown color, found 10 shades
  ✓ Processed Gray color, found 10 shades
  ✓ Processed Blue Gray color, found 10 shades
✓ Done processing 19 colors!
```
