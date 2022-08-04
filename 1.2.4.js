let contents = 
`POST /api/checkLoginAndPassword HTTP/1.1
Accept: */*
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/4.0
Content-Length: 35

login=student&password=12345`



function parseTcpStringAsHttpRequest(string) {
  let uri = string.match(/ ([a-zA-Z0-9?=,./]+) /gi)[0]
  uri = uri.replace(/ /gi,"")
  let body=string.split('\n\n')[1] || ""
  let method = string.match(/[A-Z]+ /gi)[0]
  method = method.replace(/ /gi,"")
  let headers=string.split(/\n/)
    headers.shift()
  return { 
    method: method, 
    uri : uri, 
    headers:  headers, 
    body : body, 
  }; 
}

function processHttpRequest(method, uri, headers, body) {
    let statusCode=''
    let statusMessage=''
    let body1=body
     .split("&") 
     .map((v) => v.split("=")) 
    let review= body1[0][0] + ":" + body1[0][1] + " " + body1[1][0] + ":" + body1[1][1]
    let logpass= require("fs").readFileSync("passwords.txt").toString()
    if(logpass === ""){
        return console.log(`          !ERROR!
cause : unable to verify
possible reason : no data for this account`)
    }
    if(uri=="/api/checkLoginAndPassword" && headers.includes("Content-Type: application/x-www-form-urlencoded") && logpass.includes(review)){
         statusCode='200 OK'
         body='<h1 style="color:green">FOUND</h1>'
         statusMessage=body
    }else{
         statusCode='500 - Internal Server Error'
         statusMessage='not found'
    }

    return outputHttpResponse(statusCode, statusMessage, headers, body);
 }

function outputHttpResponse(statusCode,statusMessage,headers, body) {
  console.log(`HTTP/1.1 ${statusCode}
  Date: ${new Date().toUTCString()}
  Server: Apache/2.2.14 (Win32)
  Content-Length: ${body.length}
  Connection: Closed
  Content-Type: text/html; charset=utf-8
  
  ${statusMessage}`)
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body)
