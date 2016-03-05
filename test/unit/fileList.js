/**
 * @file fileList
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project magnum-plugin-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var tap = require('tap');

var fileList = require('../../lib/fileList');

tap.test('Returns non hidden files.', function(t){
  t.plan(2)

  fileList('./test/mocks/fileList')
    .then(function(files){
      t.equal(files.length, 1,  'Has one non hidden file');
      t.equal(files[0], 'notHidden');
    });
})

tap.test('Returns hidden files with correct option.', function(t){
  t.plan(3)

  fileList('./test/mocks/fileList', true)
    .then(function(files){
      t.equal(files.length, 2,  'Has one non hidden file, and one hidden file');
      t.equal(files[0], '.hidden');
      t.equal(files[1], 'notHidden');
    });
})

tap.test('Throws with bad path', function(t){
  t.plan(1)

  fileList('./nope/not/gonna/work', true)
    .catch(function(err){
      t.ok(err, 'Has Error');
    })
})