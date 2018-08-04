const { generate } = require('./lib');
const { url, selectors } = require('./config');

describe('generate', () => {
  it('returns an object containing all color data', async () => {
    const colors = await generate(url, selectors);
    expect(colors).toMatchSnapshot();
  });
});
