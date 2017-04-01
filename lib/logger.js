function log(msg){
    console.log(msg)
}

function info(msg){
    console.log(
        `ＳＨＯＹＵ － ${msg}`
    )
}

function error(msg){
    console.error(
        `ＳＨＯＹＵ － (err) ${msg}`
    )
}

module.exports = {
    log : log,
    info : info,
    error : error
}