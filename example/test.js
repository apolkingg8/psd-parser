/**
 * Created by Gqb on 14/12/8.
 */

var PSD = require('../index');
var psd = PSD.parse('./test.psd');
var sharp = require('sharp')

psd.then((res)=> {
    let buffer = res.toPNGBuffer()
    sharp(buffer).webp().toFile('test.webp')
})
