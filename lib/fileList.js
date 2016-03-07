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

module.exports = function(searchPath, options) {
  options = options || {}
  _.defaults(options, {hidden: false, ext: false});
  return fs.readdirAsync(searchPath)
    .then(function(files) {

      if(!options.hidden) {
        files = _.chain(files)
          .filter(function(file) {
            var h = /^\..*/;
            return !h.test(file)
          })
          .value()
      }

      if(options.ext){
        files = _.filter(files, function(file){
          return path.parse(file).ext === options.ext;
        })
      }

      return Promise.filter(files, function(file) {
        return fs.statAsync(path.join(searchPath, file))
          .then(function(stat) {
            return stat.isFile()
          })
      })
    })
};