/*!
 * vertcoin.js - proof of work functions for vertcoin
 */
const vertcoinhash = require('vertcoinhash/build/Release/vertcoinhash');
const scrypt = require('./scrypt').derive;

/**
 * Calculates a Lyra2REv2 hash using the vertcoinhash module.
 * @alias module:crypto/vertcoinpow.lyra2rev2
 * @param {Buffer} data
 * @returns {Buffer}
 */
function lyra2rev2(data) {
  return vertcoinhash.SumLyra2REv2(data);
}

/**
 * Calculates a Lyra2REv3 hash using the vertcoinhash module.
 * @alias module:crypto/vertcoinpow.lyra2rev3
 * @param {Buffer} data
 * @returns {Buffer}
 */
function lyra2rev3(data) {
  return vertcoinhash.SumLyra2REv3(data);
}

/**
 * Calculates a Verthash hash using the vertcoinhash module.
 * @alias module:crypto/vertcoinpow.verthash
 * @param {Buffer} data
 * @returns {Buffer}
 */
function verthash(data) {
  return vertcoinhash.SumVerthash(data);
}

/**
 * Calculates a Lyra2RE hash using the vertcoinhash module.
 * @alias module:crypto/vertcoinpow.lyra2re
 * @param {Buffer} data
 * @returns {Buffer}
 */
function lyra2re(data) {
  return vertcoinhash.SumLyra2RE(data);
}

/**
 * Calculates a ScryptN hash using the vertcoinhash module.
 * @alias module:crypto/vertcoinpow.scryptn
 * @param {Buffer} data
 * @returns {Buffer}
 */
function scryptn(data) {
  return vertcoinhash.SumScryptN(data);
}

/**
 * Calculates proof-of-work using the correct algorithm based on a timestamp.
 * @alias module:crypto/vertcoinpow.pow
 * @param {Buffer} data
 * @param {Number} time
 * @param {Number} height
 * @param {Network} network
 * @returns {Buffer}
 */
function pow(data, time, height, network) {
  // todo: @Cubey2019 testnet always lyra2rev

  if(network.type === 'testnet') {
    if(height >= 231000) {
      return verthash(data);
    } else if (height > 158220) {
      return lyra2rev3(data);
    } else {
      return lyra2rev2(data);
    }
  }

  // vertcoin uses a different pow algorithm based on the block height

  //  >1080000   lyra2rev3   
  //  347000+    lyra2rev2   (ts = 1439191139)
  //  208301+    lyra2re     (ts = 1418454333)
  //       0+    scryptn

  if (height > 1080000) {
    return lyra2rev3(data);
  } else if (height >= 347000) {
    return lyra2rev2(data);
  } else if (height >= 208301) {
    return lyra2re(data);
  }
  return scrypt(data, data, getNFactor(time), 1, 1, 32);
}

/**
 * Calculates the N-Factor to use in scrypt, based on a timestamp.
 * @param {Number} time
 * @returns {Number}
 */
function getNFactor(time) {
  // min, max and start time from Vertcoin chain params
  const min = 10;
  const max = 30;
  const start = 1389306217;

  let n = min;
  if (time > start) {
    let l = 0;
    let s = time - start;
    while ((s >> 1) > 3) {
      l++;
      s >>= 1;
    }
    s &= 3;

    n = (l * 158 + s * 28 - 2670) / 100;
    n = Math.min(Math.max(n, min), max);
  }

  return 1 << (n + 1);
}

exports.lyra2re = lyra2re;
exports.lyra2rev2 = lyra2rev2;
exports.scryptn = scryptn;
exports.pow = pow;
