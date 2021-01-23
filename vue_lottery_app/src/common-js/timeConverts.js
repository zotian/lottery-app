const convertTimeStamp = (timeStamp) => {
    var date = new Date(timeStamp);
    var formattedDate = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    return formattedDate
}

export {
    convertTimeStamp
}