/**
 * @file fileBaseName
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project magnum-plugin-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

'use strict';
var pathParse = require('path-parse');
/**
 *
 * @module fileBaseName
 */

module.exports = function(path, uppercase) {
  uppercase = uppercase | false;
  var fbn = pathParse(path).name
  return uppercase ?  fbn.charAt(0).toUpperCase() + fbn.slice(1).toLowerCase() : fbn
}