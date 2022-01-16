# Photoary

This is photo sharing platform made using react.js and sanity as the backend. I have used google api for authentication purpose.

## Getting Started

To get the code clone or fork the repository locally. 
Then use <b> npm install</b> in both <i><b> photoary_frontend</b> </i> and <i><b> photoary_backend</b> </i> to download the necesarry depenedency. Then use <b> npm start </b> in <i><b> photoary_frontend</b> </i> to start the development server. 

### Sanity
Check  <i>https://www.sanity.io/docs/getting-started </i> for getting started info and set up sanity.
<br/>
<br/>
Now open a new console and cd to <i><b> photoary_backend</b> </i> and use <b> npx sanity start </b> to start the sanity locally. Also, <b> npx sanity manage </b> to open the mangment terminal. Here we have to add the proper cross origin in the Api section. Then create a token with editor permission. Copy the projectId and replace the token and projectId  in <i><b> .env</b> </i> in <i><b> photoary_frontend</b> </i>.
### Google Api
Then Need to open <i> https://console.cloud.google.com </i> and create a project for authentication purpose. We have to compelte the OAuth consent screen (don't use logo it will need further verification). After that we have to create the credential and add the cross origin address. After creating the credential we will get the <b> Google Api Token </b> and scret token. Copy  <b> Google Api Token </b> and replace the token in <i><b> .env</b> </i> in <i><b> photoary_frontend</b> </i>.

### Deployment

I used netlify to deploy the application. Creat a new account or login. Then
use <b> npm run build</b> to create production build of <i><b> photoary_frontend</b> </i>. then drag the build folder to netlify and can chage the domain app name. Also have to updated new address in cross origin both in sanity manager and google api certificate.


## Example

https://photoary.netlify.app/
