/**
 * @file fileListNested
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project magnum-plugin-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

"use strict";
var tap = require('tap');
var path = require('path')

var fileListNested = require('../../lib/fileListNested');

tap.test('Returns files.', function(t){

  fileListNested('./test/mocks/fileListNested/noHidden')
    .then(function(result){
      t.type(result.adir, 'object', 'Deeply nested file structure creates objects.')
      t.type(result.adir.aseconddir, 'object', 'Deeply nested file structure creates objects.')
      t.type(result.adir.aseconddir.athirddir, 'object', 'Deeply nested file structure creates objects.')
      t.type(result.adir.aseconddir.athirddir.okthatsenough, 'string', 'Finally returns strings keyed to the filename.')

      var enough = require(path.join(__dirname, '../../', result.adir.aseconddir.athirddir.okthatsenough))
      t.equals(enough, 'Thats enough!', 'Correctly resolves files given the correct pathing.')

      t.end()
    })
})

tap.test('Returns non hidden files.', function(t){

  fileListNested('./test/mocks/fileListNested/someHidden')
    .then(function(result){
      t.type(result.nothidden, 'object', 'Returns an object for non-hidden directory.')
      t.type(result.nothidden.nothiddenfile, 'string', 'Returns a string for non-hidden file.')
      t.end()
    })
})

tap.test('Returns hidden files.', function(t){

  fileListNested('./test/mocks/fileListNested/someHidden', {hidden: true})
    .then(function(result){
      t.type(result['.hiddendir'], 'object', 'Returns an object for a hidden dir.')
      t.type(result['.hiddendir'].nothiddenfile, 'string', 'Finds file in hidden dir')
      t.type(result.nothidden, 'object', 'Returns an object for a hidden dir.')
      t.type(result.nothidden['.hiddenfile'], 'string', 'Finds hidden file in non-hidden dir')
      t.end()
    })
})

tap.test('Returns files filtered by extension.', function(t){

  fileListNested('./test/mocks/fileListNested/filterFileExt', {ext: '.js'})
    .then(function(result){
      t.notOk(result.text, 'Does not find text.txt')
      t.ok(result.afile, 'Finds afile.js')
      t.notOk(result.hasfiles.somemarkdown, 'Does not find somemarkdown.md')
      t.ok(result.hasfiles.somefile, 'finds somefile.js')
      t.end()
    })
})