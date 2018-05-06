const countDown = function(durationObj){
    durationObj.sec = durationObj.sec - 1

    if(durationObj.sec < 0){
        durationObj.min = durationObj.min - 1
        durationObj.sec = 59
    }
}

module.exports = countDown