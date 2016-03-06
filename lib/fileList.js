/**
 * @file fileList
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project magnum-plugin-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var _ = require('lodash');

/**
 *
 * @module fileList
 */

module.exports = function(searchPath, hidden) {
  hidden = hidden || false;
  return fs.readdirAsync(searchPath)
    .then(function(files) {

      if(!hidden) {
        files = _.chain(files)
          .filter(function(file) {
            var h = /^\..*/;
            return !h.test(file)
          })
          .value()
      }

      return Promise.filter(files, function(file) {
        return fs.statAsync(path.join(searchPath, file))
          .then(function(stat) {
            return stat.isFile()
          })
      })
    })
};