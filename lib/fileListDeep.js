/**
 * @file fileListDeep
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
 * @module fileListDeep
 */

module.exports = function fileListDeep(searchPath, hidden){
  hidden = hidden || false;
  return fs.readdirAsync(searchPath)
    .filter(function(filename){
      if(hidden){
        return true
      }
      var h = /^\..*/;
      return !h.test(filename)
    })
    .map(function(filename){
      var p = path.join(searchPath, filename)
      return fs.statAsync(p)
        .then(function(stat){
          return stat.isDirectory() ? fileListDeep(p, hidden) : p
        })
    })
    .reduce(function(a, b) {
      return a.concat(b)
    }, [])
}