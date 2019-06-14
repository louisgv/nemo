export const freepcisVault = {
  capture: {
    uri: 'https://cors-anywhere.herokuapp.com/'+ ('http://www.freepcis.com/server/nemo/capture'),
    auth: {
      username: 'nemo',
      password: 'test001'
    }
  }
}

export const sendCatchEvent = async (body : any) => {

  const headers = new Headers()

  const {uri, auth} = freepcisVault.capture;
  
  headers.set('Authorization', 'Basic ' + btoa(auth.username + ":" + auth.password));
  headers.set('Content-Type', 'text/xml');
  
  const response = await fetch(uri,{
    method: 'POST',
    headers,
    body
  })

  console.log(response)
};
