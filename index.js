const crypto = require("crypto"),
axios = require ("axios");

// Function to generate random string
function random(n){
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    // Pick characers randomly
    let str = '';
    for (let i = 0; i < n; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
}

placeOrder("APQ-3495621S8A1")
async function placeOrder(SKU){
    // The payload for the request
    var payLoad = {"id":3495621,"number":3495621,"name":"#3495621","order_number":3495621,"line_items":[{"id":"3495621","title":"gildan mens t shirt","quantity":1,"price":"45.50","grams":0,"sku":SKU,"name":"gildan mens t shirt - L"}],"billing_address":{"first_name":"john","address1":"1158 am 9.25.19","phone":"2135558976","city":"los angeles","zip":"90013","province":"California","country":"United States","last_name":"smith","address2":"unit 142","name":"john smith","country_code":"US","province_code":"CA"},"shipping_address":{"first_name":"john","address1":"1158 am 9.25.19","phone":"2135558976","city":"los angeles","zip":"90013","province":"California","country":"United States","last_name":"smith","address2":"unit 142","name":"john smith","country_code":"US","province_code":"CA"}}
    // Stringify and converting into base64 string.
    var payLoad2 = `{"id":3495621,"number":3495621,"name":"#3495621","order_number":3495621,"line_items":[{"id":"3495621","title":"gildan mens t shirt","quantity":1,"price":"45.50","grams":0,"sku":${SKU},"name":"gildan mens t shirt - L"}],"billing_address":{"first_name":"john","address1":"1158 am 9.25.19","phone":"2135558976","city":"los angeles","zip":"90013","province":"California","country":"United States","last_name":"smith","address2":"unit 142","name":"john smith","country_code":"US","province_code":"CA"},"shipping_address":{"first_name":"john","address1":"1158 am 9.25.19","phone":"2135558976","city":"los angeles","zip":"90013","province":"California","country":"United States","last_name":"smith","address2":"unit 142","name":"john smith","country_code":"US","province_code":"CA"}}`

    let string = payLoad2.toString('base64')

    // Authentication variables
    var ran = random(12);
    // Timestamp
    var tp = Math.floor(Date.now()/1000);
    var app_id = "NTJlY2QwNDI4NTM3NDYyYmJiM2Q3YzQyYjI1YjRjNTQ="
    var algorithm = 'SHA256';
    var key       = 'nkGpoB5DgbrHcBGuWPt+dzfF039Eenwy8ZJrlFQmof8=';
    // Text to encrypt
    var hash;
    var text = `${app_id}${tp}${ran}${string}`;
    var hmac = crypto.createHmac(algorithm, key);
    // callback
    hmac.end(text, async function () {
        hash = hmac.read();
        const url = `https://api.apliiq.com/api/Order`;
        try {
            const response = await axios.post(url,string,{
                headers: {
                    "Authorization": `x-apliiq-auth ${tp}:${hash.toString('base64')}:${app_id}:${ran}`, 
                    "Accept": "application/json",
                }
            });
            console.log(response)
            return;
        } catch (error) {
            console.log(error)
            return;
        }
    });
}