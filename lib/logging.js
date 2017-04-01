
function info(msg){
    console.log(
        `ＳＨＯＹＵ － ${msg}`
    )
}

function err(msg){
    console.error(
        `ＳＨＯＹＵ － (err) ${msg}`
    )
}

module.exports = {
    info : info,
    err : err
}