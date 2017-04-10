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
var pathParse = require('path-parse');
var _ = require('lodash');

/**
 *
 * @module fileList
 */

/**
 * fileList - returns a flat list of files in a directory.
 * @param {string} searchPath absolute or relative directory to search.
 * @param {Object} [options]
 * @param {boolean} options.hidden=false Return hidden files.
 * @param {boolean|string} options.ext=false Only return files with the specified extension.
 */
module.exports = function fileList(searchPath, options) {
  options = options || {}
  _.defaults(options, {hidden: false, ext: false, directories: false});
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
          return pathParse(file).ext === options.ext;
        })
      }

      return Promise.filter(files, function(file) {
        return fs.statAsync(path.join(searchPath, file))
          .then(function(stat) {
            if(options.directories) return stat.isDirectory()
            return stat.isFile()
          })
      })
    })
};