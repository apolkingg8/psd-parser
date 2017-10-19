/**
 * Created by Gqb on 14/11/9.
 */

var fs = require('fs');
var WritableStream = require('stream').Writable;

/**
 * 异步读取文件并解析 PSD
 * 
 * @param {String|Stream} path 文件路径或者流
 * @returns {Promise}
 */
function init (path) {
    if (typeof path === 'string') {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) return reject(err)
                resolve(require('./file')(data))
            })
        })
    }
    // assume it's stream
    else if (path.on) {
        let stream = path
        return new Promise((resolve, reject) => {
            let totalLength = 0;
            let bufs = [];
            stream.on('data', function (d) {
                bufs.push(d);
                totalLength += d.length;
            });
            stream.on('error', reject);
            stream.on('end', function () {
                resolve(require('./file')(Buffer.concat(bufs, totalLength)))
            });
        })
    }
    else {
        return Promise.reject(new Error('unknown params for PSD.js: ', String(path)))
    }
};

module.exports = init