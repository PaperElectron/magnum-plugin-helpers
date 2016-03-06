/**
 * @file fileList
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project magnum-plugin-utils
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var tap = require('tap');

var fileListDeep = require('../../lib/fileListDeep');
tap.test('Returns non hidden files recursively.', function(t){
  t.plan(2)

  fileListDeep('./test/mocks/fileListDeep')
    .then(function(files){
      t.equal(files.length, 3,  'Has 3 non hidden files');
      t.equal(files[0], 'test/mocks/fileListDeep/notHidden');
    }).catch(function(err) {
      console.log(err);
    });
})

tap.test('Returns hidden files recursively with correct option set.', function(t){
  t.plan(1)

  fileListDeep('./test/mocks/fileListDeep', true)
    .then(function(files){
      t.equal(files.length, 5,  'Has 3 non hidden file, one hidden dir, and one hidden file');
    });
})

tap.test('Throws with bad path', function(t){
  t.plan(1)

  fileListDeep('./nope/not/gonna/work', true)
    .catch(function(err){
      t.ok(err, 'Has Error');
    })
})