// Will be using AXIOS library for making calls to API from react...
// Documentation for:: https://www.npmjs.com/package/axios
import axios from 'axios';

axios.defaults.timeout =  300000; //300 seconds timeout

/**
 * [request description]
 * @param  {[string]} url       URL of the API which needs to be consumed by client
 * @param  {[string]} method    Method type of the API call currently GET,POST,PUT,DELETE is supported in order suport to more methods add method name to the array -> allowedMethodTypes
 * @param  {[JSON]} payload     Payload to be provided to server for sending data
 * @param  {[string]} headers   Request Headers required by the server side to process the API call
 * @return {[JSON]}             Response provided by the server side code
 */
function request(url:any, method:any, headers:any, payload:any) {
  // var str = `Hello, ${name}!`;
  // console.log("URL=> " + url + " \nMETHOD=> " + method + " \nHEADERS=> " + JSON.stringify(headers) + " \nPAYLOAD=> " + JSON.stringify(payload));
  // console.log(`URL=> ${url} \n METHOD=>${method} \nHEADERS=> ${JSON.stringify(headers)} \nPAYLOAD=> ${JSON.stringify(payload)}`);
  return new Promise((resolve, reject) => {
    // Check for allowed method types for making a REST API call if not valid then throw an error...
    const allowedMethodTypes = ['get', 'post', 'put', 'delete'];
    if (allowedMethodTypes.indexOf(method.toLowerCase()) < 0) {
      throw new Error(`Invalid method type please provide one of these methods... \n ${allowedMethodTypes}`);
    } else {
      axios({
          method,
          url,
          data: payload,
          headers,
        })
        .then(response => {
          // console.log(`RESPONSE FROM API FETCHED SUCCESSFULLY...`);
          resolve(response);
        })
        .catch(error => {
          // console.log(`ERROR OCCURRED DURING API CALL=> ${error}`);
          reject(error);
        });
    }
  });
}


// module.exports = {
//   request
// };

export default request