var client = require('./rpc_client');

client.add(1,2, function(response){
console.log("1+2=" + response);
}
);

client.searchArea("12345", function(response){
console.log("12345"+ response);
}
);
