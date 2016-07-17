'use strict';
const fs = require('fs');
const gm = require('gm');

function createMontage (images, cells, finalWidth, finalHeight) {
  const cellWidth = finalWidth / cells;
  let montage;
  images.forEach((image, index) => {
    if(index === 0) {
      montage = `gm('temp/${image}.jpg')`;
    } else {
      montage += `.append('temp/${image}.jpg', true)`;
    }

    gm(`http://proxy.topixcdn.com/ipicimg/${image}-rszh${finalHeight + 20}`)
      .resize(cellWidth, finalHeight, '^')
      .gravity('Center')
      .crop(cellWidth, finalHeight)
      .write(`temp/${image}.jpg`, (err) => {
        if (err) console.log(err);
      });
  })
  //montageHelper(images, finalWidth, finalHeight);
  montage += `
    .write('images/montage.jpg', (err) => {
      if (err) console.log(err);
    });`;
  console.log(montage);
  eval(montage);
}

function montageHelper (images, finalWidth, finalHeight) {
  gm(`temp/${images[0]}.jpg`)
    .append(`temp/${images[1]}.jpg`, true)
    .append(`temp/${images[2]}.jpg`, true)
    .write('images/montage.jpg', (err) => {
      if (err) console.log(err);
    });
}

/*
function montageHelper (images, finalWidth, finalHeight) {
  gm(`temp/${images[0]}.jpg`)
    .identify((err, data) => {
      if (!err) console.log(`Width: ${data.size.width} Height: ${data.size.height}`);
    })
    .montage(`temp/${images[1]}.jpg`)
    .geometry('+0+0')
    .montage(`temp/${images[2]}.jpg`)
    .geometry('+0+0')
    .resize(finalWidth, finalHeight)
    .write('images/montage.jpg', (err) => {
      if (err) console.log(err);
    });
}
*/

createMontage(['MEA8SRTIVA7JE6SH', '91RRSPSC0ITDHNIR', '4TEE736PM5SPCA76'], 3, 810, 415);

/*
gm('images/portrait1.jpg')
  .identify((err, data) => {
    if (!err) console.log(data) // data.size.width
  })
*/

/*
gm('images/portrait1.jpg')
  .montage('images/portrait2.jpg')
  .montage('images/portrait3.jpg')
  .write('images/montage.jpg', (err) => {
    if (err) console.log(err)
  })
*/
