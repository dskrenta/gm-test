'use strict';
const fs = require('fs');
const gm = require('gm');
require('base64');

function overlay (images, x, y) {
  gm(`http://proxy.topixcdn.com/ipicimg/${images[0].id}-rszh${images[0].height}`)
    .composite(`http://proxy.topixcdn.com/ipicimg/${images[1].id}-rszh${images[1].height}`)
    .geometry(`+${x}+${y}`)
    .write('images/overlay.jpg', (err) => {
      if (err) console.log(err);
    });
}

overlay([
  {
    id: 'MEA8SRTIVA7JE6SH',
    height: 415
  },
  {
    id: '4TEE736PM5SPCA76',
    height: 75
  }
], 56, 34);
