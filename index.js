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

////////// THE SKE ////////////
placeOrder("APQ-3504275S10A0")
///////////////////////////////

async function placeOrder(SKU){
    // The payload for the request
    var payLoad = {"id":3504275,"number":1,"name":"#1","order_number":1,"line_items":[{"id":"3504275","title":"beanie","quantity":1,"price":"45.50","grams":0,"sku":SKU,"name":"beanie"}],"billing_address":{"first_name":"john","address1":"1158 bath ave","phone":"3448523355","city":"brooklyn","zip":"11214","province":"New york","country":"United States","last_name":"smith","address2":"unit 142","name":"john smith","country_code":"US","province_code":"NY"},"shipping_address":{"first_name":"john","address1":"1158 bath ave","phone":"3448523355","city":"brooklyn","zip":"11214","province":"New york","country":"United States","last_name":"smith","address2":"unit 142","name":"john smith","country_code":"US","province_code":"NY"}}
    // Stringify and converting into base64 string.
    let string = JSON.stringify(payLoad).toString('base64')

    // Authentication variables
    var ran = random(12);
    // Timestamp
    var tp = Math.floor(Date.now()/1000);
    var app_id = "MzEyZDVmM2I2ZTcxNDFmYmJlYjQwZDdhODRiNTc4M2U="
    var algorithm = 'SHA256';
    var key       = 'NFuEFbSh4S860H7iFaitWepcQ3JE4iRvhBilWVDDFSY=';
    // Text to encrypt
    var hash;
    var text = `${app_id}${tp}${ran}${string}`;
    var hmac = crypto.createHmac(algorithm, key);
    // callback
    hmac.end(text, async function () {
        hash = hmac.read();
        const url = `https://api.apliiq.com/v1/Order`;
        try {
            const response = await axios.post(url,payLoad,{
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