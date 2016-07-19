'use strict';
const fs = require('fs');
const gm = require('gm');
const path = require('path');
require('gm-base64');

function collage (images, finalWidth, finalHeight) {
  const cells = images.length;
  const cellWidth = finalWidth / cells;
  images.forEach((image, index) => {
    gm(`http://proxy.topixcdn.com/ipicimg/${image}-rszh${finalHeight + 20}`)
      .resize(cellWidth, finalHeight, '^')
      .gravity('Center')
      .crop(cellWidth, finalHeight)
      .write(`temp/${image}.jpg`, (err) => {
        if (err) console.log(err);
        //if (index === cells - 1) collageHelper(images);
        if (index === cells - 1) testHelper(images);
      });
  })
}

function testHelper (images) {
  gm(`temp/${images.shift()}.jpg`)
    .append(images.map(image => `temp/${image}.jpg`), true)
    .write('collage.jpg', (err) => {
      if (err) console.log(err);
    });
}

function collage3 (images, finalWidth, finalHeight) {
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

function collage3Helper (buffers) {
  gm(buffers.shift())
    .append(buffers, true)
    .toBase64('bmp', (err, base64Image) => {
      console.log(base64Image);
    });
}

function collage2 (images, finalWidth, finalHeight) {
  const cells = images.length;
  const cellWidth = finalWidth / cells;
  const base64Images = [];

  images.forEach((image, index) => {
    gm(`http://proxy.topixcdn.com/ipicimg/${image}-rszh${finalHeight + 20}`)
      .resize(cellWidth, finalHeight, '^')
      .gravity('Center')
      .crop(cellWidth, finalHeight)
      .toBase64('bmp', (err, base64Image) => {
        base64Images.push(base64Image);
      })
  })

  const imageBuffers = base64Images.map(base64Image => new Buffer(base64Image, 'base64'));
  const firstImage = imageBuffers.shift();

  gm(firstImage)
    .append(imageBuffers, true)
    .toBase64('bmp', (err, base64Image) => {
      console.log(base64Image);
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

//collage(['MEA8SRTIVA7JE6SH', '91RRSPSC0ITDHNIR', '4TEE736PM5SPCA76'], 810, 415);

collage3(['MEA8SRTIVA7JE6SH', '91RRSPSC0ITDHNIR', '4TEE736PM5SPCA76'], 810, 415);
