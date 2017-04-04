const colors = require('colors')

function log(msg){
    console.log(msg)
}

function info(msg){
    console.log(
        `ＳＨＯＹＵ － ${msg}`.green
    )
}

function error(msg){
    console.error(
        `ＳＨＯＹＵ[ERROR] － ${msg}`.red
    )
}

module.exports = {
    log : log,
    info : info,
    error : error
}