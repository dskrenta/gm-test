'use strict';
const fs = require('fs');
const gm = require('gm');

function collage (images, cells, finalWidth, finalHeight) {
  const cellWidth = finalWidth / cells;
  images.forEach((image, index) => {
    gm(`http://proxy.topixcdn.com/ipicimg/${image}-rszh${finalHeight + 20}`)
      .resize(cellWidth, finalHeight, '^')
      .gravity('Center')
      .crop(cellWidth, finalHeight)
      .write(`temp/${image}.jpg`, (err) => {
        if (err) console.log(err);
        if (index === cells - 1) collageHelper(images);
      });
  })
}

function collageHelper (images) {
  let montage;
  images.forEach((image, index) => {
    if (index === 0) {
      montage = `gm('temp/${image}.jpg')`;
    } else {
      montage += `.append('temp/${image}.jpg', true)`;
    }
  })
  montage += `.write('images/montage.jpg', (err) => {
    if (err) { console.log(err); }
  });`;
  eval(montage);
}

collage(['MEA8SRTIVA7JE6SH', '91RRSPSC0ITDHNIR', '4TEE736PM5SPCA76'], 3, 810, 415);
