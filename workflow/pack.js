const fs = require('fs')
const targz = require('node-tar.gz')
// const moment = require('moment')

// const timesrting = moment().format('YYYY-MM-DD HH:mm:ss').toString().replace(/-|\s|:/g, '')

const {version} = require('./getVersion');

// Create all streams that we need
let read = targz().createReadStream('./dist/')
// let write = fs.createWriteStream(`./dist-zip/dist-${timesrting}.tar.gz`)
let write = fs.createWriteStream(`./dist-zip/dist-${version}.tar.gz`)
// Let the magic happen
read.pipe(write)
console.log('pack succ')
