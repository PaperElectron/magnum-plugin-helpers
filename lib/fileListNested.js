/**
 * @file fileListNested
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project magnum-plugin-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

"use strict";

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var pathParse = require('path-parse');
var _ = require('lodash');
var fileBaseName = require('./fileBaseName')

var hiddenFile = /^\..*/;

/**
 *
 * @module fileListNested
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
  _.defaults(options, {hidden: false, ext: false});
  return buildPaths(searchPath, {}, options)
};


function buildPaths(searchPath, reducer, options){
  return fs.readdirAsync(searchPath)
    .then(function(files) {

      return Promise.reduce(files, function(returnObj, file){
        var sp = path.join(searchPath, file)

        if(!options.hidden){
          var hidden = hiddenFile.test(file)
          if(hidden) {
            return returnObj
          }
        }

        return fs.statAsync(sp)
          .then(function(fileStat){

            if(fileStat.isDirectory()){

              var o = returnObj[file] = {}

              return buildPaths(sp, o, options)
                .then(function(){
                  return reducer
                })
            }

            if (fileStat.isFile()){
              if(options.ext){
                var matchesExt = pathParse(file).ext === options.ext;
                if(!matchesExt) return returnObj
              }
              returnObj[fileBaseName(file)] = sp
            }

            return returnObj
          })
      }, reducer)
    })
}