const cheerio = require('cheerio');
const fs = require('fs');
const commonCss = require('./commonCss');

const selectors = [];

fs.readFile('./page.html', 'utf8', function (err, page) {
  const $ = cheerio.load(page);
  const allNodes = $('*');
  Object.values(allNodes).forEach((node) => {
    const nodeType = node.tagName;
    const $node = $(node);
    const classNames = $node.attr('class');
    const id = $node.attr('id');
    if (classNames) {
      classNames.split(' ').forEach((className) => {
        if (className && selectors.indexOf('.' + className) < 0) selectors.push('.' + className);
      });
    }
    if (id && selectors.indexOf('#' + id) < 0) {
      selectors.push('#' + id);
    }
  });
  const unusedSelectors = [];
  Object.entries(commonCss).forEach(([key, value]) => {
    let hasMatchingSelector = false;
    if (/\@media/.test(key)) {
      Object.entries(value).forEach(([mediaSelector, styles]) => {
        selectors.forEach((selector) => {
          const regEx = new RegExp(selector, 'g');
          if (regEx.test(mediaSelector)) {
            hasMatchingSelector = true;
          }
        });
      });
    } else if (/keyframes/.test(key) || /\@import/.test(key)) {
      hasMatchingSelector = true;
    } else {
      // Test css selector against selectors on page
      selectors.forEach((selector) => {
        const regEx = new RegExp(selector, 'g');
        if (regEx.test(key)) {
          hasMatchingSelector = true;
        }
      });
    }
    if (!hasMatchingSelector) {
      unusedSelectors.push(key);
    }
  });
  console.log(unusedSelectors);
});
