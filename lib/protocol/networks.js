/*!
 * network.js - bitcoin networks for bcoin
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License)
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * @module protocol/networks
 */

const BN = require('../crypto/bn');
const util = require('../utils/util');

const network = exports;

/**
 * Network type list.
 * @memberof module:protocol/networks
 * @const {String[]}
 * @default
 */

network.types = ['main', 'testnet', 'regtest', 'simnet'];

/**
 * Mainnet
 * @static
 * @lends module:protocol/networks
 * @type {Object}
 */

const main = {};

/**
 * Symbolic network type.
 * @const {String}
 * @default
 */

main.type = 'main';

/**
 * Default DNS seeds.
 * @const {String[]}
 * @default
 */

main.seeds = [
  'useast1.vtconline.org',
  'vtc.gertjaap.org',
  'seed.vtc.bryangoodson.org',
  'dnsseed.pknight.ca',
  'seed.orderofthetaco.org',
  'seed.alexturek.org',
  'vertcoin.mbl.cash'
];

/**
 * Packet magic number.
 * @const {Number}
 * @default
 */

main.magic = 0xdab5bffa;

/**
 * Default network port.
 * @const {Number}
 * @default
 */

main.port = 5889;

/**
 * Checkpoint block list.
 * @const {Object}
 */

main.checkpointMap = {
  0: util.revHex('4d96a915f49d40b1e5c2844d1ee2dccb90013a990ccea12c492d22110489f0c4'),
  24200: util.revHex('d7ed819858011474c8b0cae4ad0b9bdbb745becc4c386bc22d1220cc5a4d1787'),
  65000: util.revHex('9e673a69c35a423f736ab66f9a195d7c42f979847a729c0f3cef2c0b8b9d0289'),
  84065: util.revHex('a904170a5a98109b2909379d9bc03ef97a6b44d5dafbc9084b8699b0cba5aa98'),
  228023: util.revHex('15c94667a9e941359d2ee6527e2876db1b5e7510a5ded3885ca02e7e0f516b51'),
  346992: util.revHex('f1714fa4c7990f4b3d472eb22132891ccd3c7ad7208e2d1ab15bde68854fb0ee'),
  347269: util.revHex('fa1e592b7ea2aa97c5f20ccd7c40f3aaaeb31d1232c978847a79f28f83b6c22a'),
  430000: util.revHex('2f5703cf7b6f956b84fd49948cbf49dc164cfcb5a7b55903b1c4f53bc7851611'),
  516999: util.revHex('572ed47da461743bcae526542053e7bc532de299345e4f51d77786f2870b7b28'),
  627610: util.revHex('6000a787f2d8bb77d4f491a423241a4cc8439d862ca6cec6851aba4c79ccfedc')
};

/**
 * Last checkpoint height.
 * @const {Number}
 * @default
 */

main.lastCheckpoint = 627610;

/**
 * @const {Number}
 * @default
 */

main.halvingInterval = 840000;

/**
 * Genesis block header.
 * @const {NakedBlock}
 */

main.genesis = {
  version: 1,
  hash: 'c4f0890411222d492ca1ce0c993a0190cbdce21e4d84c2e5b1409df415a9964d',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot: 'e72301fc49323ee151cf1048230f032ca589753ba7086222a5c023e3a08cf34a',
  time: 1389311371,
  bits: 504365040,
  nonce: 5749262,
  height: 0
};

/**
 * The network's genesis block in a hex string.
 * @const {String}
 */
main.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '00e72301fc49323ee151cf1048230f032ca589753ba7086222a5c023e3a08cf34a8b35'
  + 'cf52f0ff0f1e0eba570001010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff460002e7034130312f30392f323031342047'
  + '65726d616e7920746f2048656c7020696e20446973706f73616c206f66205379726961'
  + '6e204368656d6963616c20576561706f6e73ffffffff0100f2052a0100000000000000'
  + '00';

/**
 * POW-related constants.
 * @enum {Number}
 * @default
 */

main.pow = {
  /**
   * Default target.
   * @const {BN}
   */

  limit: new BN(
    '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  
  preVerthashLimit: new BN(
    '00000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),

  /**
   * Compact pow limit.
   * @const {Number}
   * @default
   */

  bits: 504365055,

  /**
   * Minimum chainwork for best chain.
   * @const {BN}
   */

  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000a87058cbe368be6',
    'hex'
  ),

  /**
   * Desired retarget period in seconds.
   * @const {Number}
   * @default
   */

  targetTimespan: 3.5 * 24 * 60 * 60,

  /**
   * Average block time.
   * @const {Number}
   * @default
   */

  targetSpacing: 2.5 * 60,

  /**
   * Retarget interval in blocks.
   * @const {Number}
   * @default
   */

  retargetInterval: 2016,

  /**
   * Whether to reset target if a block
   * has not been mined recently.
   * @const {Boolean}
   * @default
   */

  targetReset: false,

  /**
   * Do not allow retargetting.
   * @const {Boolean}
   * @default
   */

  noRetargeting: false
};

/**
 * Block constants.
 * @enum {Number}
 * @default
 */

main.block = {
  /**
   * Height at which bip34 was activated.
   * Used for avoiding bip30 checks.
   */

  bip34height: 0xffffffff,

  /**
   * Hash of the block that activated bip34.
   */

  bip34hash: null,

  /**
   * Height at which bip65 was activated.
   */

  bip65height: 0xffffffff,

  /**
   * Hash of the block that activated bip65.
   */

  bip65hash: null,

  /**
   * Height at which bip66 was activated.
   */

  bip66height: 0xffffffff,

  /**
   * Hash of the block that activated bip66.
   */

  bip66hash: null,

  /**
   * Safe height to start pruning.
   */

  pruneAfterHeight: 100000,

  /**
   * Safe number of blocks to keep.
   */

  keepBlocks: 288,

  /**
   * Age used for the time delta to
   * determine whether the chain is synced.
   */

  maxTipAge: 24 * 60 * 60,

  /**
   * Height at which block processing is
   * slow enough that we can output
   * logs without spamming.
   */

  slowHeight: 900000
};

/**
 * Map of historical blocks which create duplicate transactions hashes.
 * @see https://github.com/bitcoin/bips/blob/master/bip-0030.mediawiki
 * @const {Object}
 * @default
 */

main.bip30 = {};

/**
 * For versionbits.
 * @const {Number}
 * @default
 */

main.activationThreshold = 1512; // 75% of 2016

/**
 * Confirmation window for versionbits.
 * @const {Number}
 * @default
 */

main.minerWindow = 2016; // nPowTargetTimespan / nPowTargetSpacing

/**
 * Deployments for versionbits.
 * @const {Object}
 * @default
 */

main.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1488326400, // March 1st, 2017
    timeout: 1519862400, // March 1st, 2018
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 1488326400, // March 1st, 2017.
    timeout: 1519862400, // March 1st, 2018
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  nversionbips: {
    name: 'nversionbips',
    bit: 2,
    startTime: 1488326400, // March 1st, 2017.
    timeout: 1519862400, // March 1st, 2018
    threshold: -1,
    window: -1,
    required: true,
    force: false
  }
};

/**
 * Deployments for versionbits (array form, sorted).
 * @const {Array}
 * @default
 */

main.deploys = [
  main.deployments.csv,
  main.deployments.segwit,
  main.deployments.nversionbips
];

/**
 * Key prefixes.
 * @enum {Number}
 * @default
 */

main.keyPrefix = {
  privkey: 0x80,
  xpubkey: 0x0488b21e,
  xprivkey: 0x0488ade4,
  xpubkey58: 'xpub',
  xprivkey58: 'xprv',
  coinType: 0
};

/**
 * {@link Address} prefixes.
 * @enum {Number}
 */

main.addressPrefix = {
  pubkeyhash: 0x47,
  scripthash: 0x05,
  witnesspubkeyhash: 0x06,
  witnessscripthash: 0x0a,
  bech32: 'vtc'
};

/**
 * Default value for whether the mempool
 * accepts non-standard transactions.
 * @const {Boolean}
 * @default
 */

main.requireStandard = true;

/**
 * Default http port.
 * @const {Number}
 * @default
 */

main.rpcPort = 5888;

/**
 * Default min relay rate.
 * @const {Rate}
 * @default
 */

main.minRelay = 1000;

/**
 * Default normal relay rate.
 * @const {Rate}
 * @default
 */

main.feeRate = 100000;

/**
 * Maximum normal relay rate.
 * @const {Rate}
 * @default
 */

main.maxFeeRate = 400000;

/**
 * Whether to allow self-connection.
 * @const {Boolean}
 */

main.selfConnect = false;

/**
 * Whether to request mempool on sync.
 * @const {Boolean}
 */

main.requestMempool = false;

/*
 * Testnet (v3)
 * https://en.bitcoin.it/wiki/Testnet
 */

const testnet = {};

testnet.type = 'testnet';

testnet.seeds = [
  'jlovejoy.mit.edu',
  'gertjaap.ddns.net',
  'fr1.vtconline.org',
  'tvtc.vertcoin.org'
];

testnet.magic = 0x74726576;

testnet.port = 15889;

testnet.checkpointMap = {
  0: util.revHex('cee8f24feb7a64c8f07916976aa4855decac79b6741a8ec2e32e2747497ad2c9')
};

testnet.lastCheckpoint = 0;

testnet.halvingInterval = 840000;

testnet.genesis = {
  version: 1,
  hash: 'c9d27a4947272ee3c28e1a74b679acec5d85a46a971679f0c8647aeb4ff2e8ce',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot: 'e72301fc49323ee151cf1048230f032ca589753ba7086222a5c023e3a08cf34a',
  time: 1481291250,
  bits: 504365040,
  nonce: 915027,
  height: 0
};

testnet.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '00e72301fc49323ee151cf1048230f032ca589753ba7086222a5c023e3a08cf34af2b5'
  + '4a58f0ff0f1e53f60d0001010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff460002e7034130312f30392f323031342047'
  + '65726d616e7920746f2048656c7020696e20446973706f73616c206f66205379726961'
  + '6e204368656d6963616c20576561706f6e73ffffffff0100f2052a0100000000000000'
  + '00';

testnet.pow = {
  limit: new BN(
    '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  preVerthashLimit: new BN(
    '00000fffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 504365055,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000100010',
    'hex'
  ),
  targetTimespan: 3.5 * 24 * 60 * 60,
  targetSpacing: 2.5 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: false
};

testnet.block = {
  bip34height: 0xffffffff,
  bip34hash: null,
  bip65height: 0xffffffff,
  bip65hash: null,
  bip66height: 0xffffffff,
  bip66hash: null,
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 24 * 60 * 60,
  slowHeight: 950000
};

testnet.bip30 = {};

testnet.activationThreshold = 26; // 51% of 50

testnet.minerWindow = 50; // nPowTargetTimespan / nPowTargetSpacing

testnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 1486865123,
    timeout: 1517356801,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 1486865123,
    timeout: 1517356801,
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  nversionbips: {
    name: 'nversionbips',
    bit: 2,
    startTime: 1486865123,
    timeout: 1517356801,
    threshold: -1,
    window: -1,
    required: true,
    force: false
  }
};

testnet.deploys = [
  testnet.deployments.csv,
  testnet.deployments.segwit,
  testnet.deployments.nversionbips
];

testnet.keyPrefix = {
  privkey: 0xef,
  xpubkey: 0x043587cf,
  xprivkey: 0x04358394,
  xpubkey58: 'tpub',
  xprivkey58: 'tprv',
  coinType: 1
};

testnet.addressPrefix = {
  pubkeyhash: 0x4a,
  scripthash: 0xc4,
  witnesspubkeyhash: 0x03,
  witnessscripthash: 0x28,
  bech32: 'tvtc'
};

testnet.requireStandard = false;

testnet.rpcPort = 15888;

testnet.minRelay = 1000;

testnet.feeRate = 20000;

testnet.maxFeeRate = 60000;

testnet.selfConnect = false;

testnet.requestMempool = false;

/*
 * Regtest
 */

const regtest = {};

regtest.type = 'regtest';

regtest.seeds = [
  '127.0.0.1'
];

regtest.magic = 0xdab5bffa;

regtest.port = 18444;

regtest.checkpointMap = {
  0: util.revHex('0f9188f13cb7b2c71f2a335e3a4fc328bf5beb436012afca590b1a11466e2206')
};
regtest.lastCheckpoint = 0;

regtest.halvingInterval = 150;

regtest.genesis = {
  version: 1,
  hash: 'ce854adc33e87cc16fbc32191a7b021773c9067286660d65d1bbeb47b0c09923',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot: 'e72301fc49323ee151cf1048230f032ca589753ba7086222a5c023e3a08cf34a',
  time: 1296688602,
  bits: 545259519,
  nonce: 2,
  height: 0
};

regtest.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '00e72301fc49323ee151cf1048230f032ca589753ba7086222a5c023e3a08cf34adae5'
  + '494dffff7f200200000001010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff460002e7034130312f30392f323031342047'
  + '65726d616e7920746f2048656c7020696e20446973706f73616c206f66205379726961'
  + '6e204368656d6963616c20576561706f6e73ffffffff0100f2052a0100000000000000'
  + '00';

regtest.pow = {
  limit: new BN(
    '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000000',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: true
};

regtest.block = {
  bip34height: 0xffffffff,
  bip34hash: null,
  bip65height: 0xffffffff,
  bip65hash: null,
  bip66height: 0xffffffff,
  bip66hash: null,
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

regtest.bip30 = {};

regtest.activationThreshold = 108; // 75% for testchains

regtest.minerWindow = 144; // Faster than normal for regtest

regtest.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 0,
    timeout: 0xffffffff,
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

regtest.deploys = [
  regtest.deployments.csv,
  regtest.deployments.segwit,
  regtest.deployments.testdummy
];

regtest.keyPrefix = {
  privkey: 0xef,
  xpubkey: 0xeab4fa05,
  xprivkey: 0xeab404c7,
  xpubkey58: 'rpub',
  xprivkey58: 'rprv',
  coinType: 1
};

regtest.addressPrefix = {
  pubkeyhash: 0x6f,
  scripthash: 0xc4,
  witnesspubkeyhash: 0x7a,
  witnessscripthash: 0x14,
  bech32: 'bcrt'
};

regtest.requireStandard = false;

regtest.rpcPort = 18332;

regtest.minRelay = 1000;

regtest.feeRate = 20000;

regtest.maxFeeRate = 60000;

regtest.selfConnect = true;

regtest.requestMempool = true;

/*
 * Simnet (btcd)
 */

const simnet = {};

simnet.type = 'simnet';

simnet.seeds = [
  '127.0.0.1'
];

simnet.magic = 0x12141c16;

simnet.port = 18555;

simnet.checkpointMap = {};

simnet.lastCheckpoint = 0;

simnet.halvingInterval = 210000;

simnet.genesis = {
  version: 1,
  hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  prevBlock: '0000000000000000000000000000000000000000000000000000000000000000',
  merkleRoot:
    '3ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a',
  time: 1401292357,
  bits: 545259519,
  nonce: 2,
  height: 0
};

simnet.genesisBlock =
  '0100000000000000000000000000000000000000000000000000000000000000000000'
  + '003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a4506'
  + '8653ffff7f200200000001010000000100000000000000000000000000000000000000'
  + '00000000000000000000000000ffffffff4d04ffff001d0104455468652054696d6573'
  + '2030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66'
  + '207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01'
  + '000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f'
  + '61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f'
  + 'ac00000000';

simnet.pow = {
  limit: new BN(
    // High target of 0x207fffff (545259519)
    '7fffff0000000000000000000000000000000000000000000000000000000000',
    'hex'
  ),
  bits: 545259519,
  chainwork: new BN(
    '0000000000000000000000000000000000000000000000000000000000000002',
    'hex'
  ),
  targetTimespan: 14 * 24 * 60 * 60,
  targetSpacing: 10 * 60,
  retargetInterval: 2016,
  targetReset: true,
  noRetargeting: false
};

simnet.block = {
  bip34height: 0,
  bip34hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  bip65height: 0,
  bip65hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  bip66height: 0,
  bip66hash: 'f67ad7695d9b662a72ff3d8edbbb2de0bfa67b13974bb9910d116d5cbd863e68',
  pruneAfterHeight: 1000,
  keepBlocks: 10000,
  maxTipAge: 0xffffffff,
  slowHeight: 0
};

simnet.bip30 = {};

simnet.activationThreshold = 75; // 75% for testchains

simnet.minerWindow = 100; // nPowTargetTimespan / nPowTargetSpacing

simnet.deployments = {
  csv: {
    name: 'csv',
    bit: 0,
    startTime: 0, // March 1st, 2016
    timeout: 0xffffffff, // May 1st, 2017
    threshold: -1,
    window: -1,
    required: false,
    force: true
  },
  segwit: {
    name: 'segwit',
    bit: 1,
    startTime: 0, // May 1st 2016
    timeout: 0xffffffff, // May 1st 2017
    threshold: -1,
    window: -1,
    required: true,
    force: false
  },
  segsignal: {
    name: 'segsignal',
    bit: 4,
    startTime: 0xffffffff,
    timeout: 0xffffffff,
    threshold: 269,
    window: 336,
    required: false,
    force: false
  },
  testdummy: {
    name: 'testdummy',
    bit: 28,
    startTime: 1199145601, // January 1, 2008
    timeout: 1230767999, // December 31, 2008
    threshold: -1,
    window: -1,
    required: false,
    force: true
  }
};

simnet.deploys = [
  simnet.deployments.csv,
  simnet.deployments.segwit,
  simnet.deployments.segsignal,
  simnet.deployments.testdummy
];

simnet.keyPrefix = {
  privkey: 0x64,
  xpubkey: 0x0420bd3a,
  xprivkey: 0x0420b900,
  xpubkey58: 'spub',
  xprivkey58: 'sprv',
  coinType: 115
};

simnet.addressPrefix = {
  pubkeyhash: 0x3f,
  scripthash: 0x7b,
  witnesspubkeyhash: 0x19,
  witnessscripthash: 0x28,
  bech32: 'sc'
};

simnet.requireStandard = false;

simnet.rpcPort = 18556;

simnet.minRelay = 1000;

simnet.feeRate = 20000;

simnet.maxFeeRate = 60000;

simnet.selfConnect = false;

simnet.requestMempool = false;

/*
 * Expose
 */

network.main = main;
network.testnet = testnet;
network.regtest = regtest;
network.simnet = simnet;
