let contents = 
`POST /aaaa/file.txt HTTP/1.1
Host: shpp.me
Accept: image/gif, image/jpeg, */*
Accept-Language: en-us
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0
Content-Length: 35

bookId=12345&author=Tan+Ah+Teck`

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
  let statusCode = ""
  let statusMessage = ""
  let res = ""
  try {
    require("fs").readFileSync('file.txt')
  }catch {
    statusCode="404"
  }
  if(uri == "/aaaa/file.txt"){
    statusCode="200 OK"
  }else{
    statusCode="404"
  }
  if(uri== '/'){
    uri='/index.html'
  }
  if(headers.includes( "Host: student.shpp.me")){
    res = require("fs").readFileSync('student')
  }
  if(headers.includes("Host: another.shpp.me")){
    res = require("fs").readFileSync('another')
  }
  try{
    res= require("fs").readFileSync('else')
  }catch{
    resultat='404'
  }
  
  outputHttpResponse(statusCode, statusMessage, headers, body)
  
}

function outputHttpResponse(statusCode,statusMessage,headers, body) {
  console.log(`HTTP/1.1 ${statusCode}
  Date: ${new Date().toUTCString()}
  Server: Apache/2.2.14 (Win32)
  Content-Length: ${body.length}
  Connection: Closed
  Content-Type: text/html; charset=utf-8`)
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body)
