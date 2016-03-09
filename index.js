/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project magnum-plugin-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';

/**
 *
 * @module index
 */

exports.fileList = require('./lib/fileList');
exports.fileListDeep = require('./lib/fileListDeep');
exports.fileBaseName = require('./lib/fileBaseName');

exports.lodash = require('lodash');
exports.bluebird = require('bluebird');