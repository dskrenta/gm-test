'use strict';
const fs = require('fs');
const gm = require('gm');
const path = require('path');
require('gm-base64');

function collage (images, finalWidth, finalHeight) {
  const cells = images.length;
  const cellWidth = finalWidth / cells;
  const buffers = [];

  images.forEach((image, index) => {
    gm(`http://proxy.topixcdn.com/ipicimg/${image}-rszh${finalHeight + 20}`)
      .resize(cellWidth, finalHeight, '^')
      .gravity('Center')
      .crop(cellWidth, finalHeight)
      .toBuffer('PNG', (err, buffer) => {
        if (err) console.log(err);
        buffers.push(buffer);
        if (index === cells - 1) collage3Helper(buffers)
      });
  })
}

function collageHelper (buffers) {
  gm(buffers.shift())
    .append(buffers, true)
    .toBase64('bmp', (err, base64Image) => {
      console.log(base64Image);
    });
}

collage(['MEA8SRTIVA7JE6SH', '91RRSPSC0ITDHNIR', '4TEE736PM5SPCA76'], 810, 415);
