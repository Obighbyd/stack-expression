var assert = require('assert')
var json = require('../examples/json')
var getError = require('../').getError
// --------------------

console.log(
  json(JSON.stringify({okay: [1,2,3], empty: {}}), 0).groups[0]
)

var fs = require('fs')
var path = require('path')
var pkg = JSON.stringify(require('../package.json'))//fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
var pkg = fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
//console.log(pkg)
var start = Date.now()
var N = 1000, custom, builtin
for(var i = 0; i < N; i++)
  var parsed = json(pkg, 0).groups[0]

console.log('json.parse', custom = (Date.now() - start)/N)

var start = Date.now()
for(var i = 0; i < N; i++)
  var parsed = JSON.parse(pkg)
console.log('JSON.parse', builtin = (Date.now() - start)/N)

console.log('ratio:', custom/builtin)

console.log(
  JSON.stringify(parsed, null, 2)
)

assert.deepEqual(parsed, require('../package.json'))

/*

for(var i = 0; i < 10; i++) {
  var partial = pkg.substring(0, ~~(Math.random()*pkg.length))
  assert.equal(json(partial, 0), null)
  console.log(getError())
  console.log(partial)
  console.log('------')
}

  var partial = pkg.substring(0, pkg.length-2)
  assert.equal(json(partial, 0), null)
  console.log(getError())
  console.log(partial)
  console.log('------')
*/