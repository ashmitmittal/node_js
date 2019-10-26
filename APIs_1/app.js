var request = require("request");
request('http://randomblogs.herokuapp.com/api/posts',function(error,response,body){
    if(!error && response.statusCode == 200){
        var parsedData = JSON.parse(body);
        // console.log(parsedData[0]["title"]);
        parsedData.forEach(function(data) {
            console.log(data['title']);
        })
    }
});