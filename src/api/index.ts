import { testCatchPayload } from "./sample";
import { createCatchPayload } from "./catch";
import { eosVault } from "../_data"

const origin = {
  capture: {
    uri: 'https://cors-anywhere.herokuapp.com/'+ ('http://www.freepcis.com/server/nemo/capture'),
    auth: {
      username: 'nemo',
      password: 'test001'
    }
  }
}

export const sendCatchEvent = async (catchData : any) => {

  const headers = new Headers()

  const {uri, auth} = origin.capture;
  
  headers.set('Authorization', 'Basic ' + btoa(auth.username + ":" + auth.password));
  headers.set('Content-Type', 'text/xml');
  
  const body = await createCatchPayload(catchData)
  const response = await fetch(uri,{
    method: 'POST',
    headers,
    body
  })

  console.log(response)
};
