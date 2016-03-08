/**
 * @file fileBaseName
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project magnum-plugin-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var tap = require('tap');

var fileName = require('../../lib/fileBaseName');

tap.test('Returns the name of a file from path', function(t){
  t.plan(3)
  t.equal(fileName('/some/path/file.js'), 'file', 'Returns the filename without its extension');
  t.equal(fileName('/some/path/file.js', true), 'File', 'Uppercases the filename');
  t.equal(fileName('/some/path/fIlENam$.js', true), 'Filenam$', 'Uppercases the filename, and lowercases everything else.');
})