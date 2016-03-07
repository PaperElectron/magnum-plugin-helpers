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

module.exports = function fileListDeep(searchPath, options){
  options = options || {}
  _.defaults(options, {hidden: false, ext: false});
  return fs.readdirAsync(searchPath)
    .filter(function(filename){
      if(options.hidden){
        return true
      }
      var h = /^\..*/;
      return !h.test(filename)
    })
    .map(function(filename){
      var p = path.join(searchPath, filename)
      return fs.statAsync(p)
        .then(function(stat){
          if(stat.isDirectory()){
            return fileListDeep(p, options)
          }
          if(options.ext){
            return path.parse(p).ext === options.ext ? p : false;
          }

          return p
        })

    })
    .filter(Boolean)
    .reduce(function(a, b) {
      return a.concat(b)
    }, [])
}