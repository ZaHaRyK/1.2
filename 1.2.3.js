
let contents = 
`GET /sum?nums=1,2,2 HTTP/1.1
Host: student.shpp.me
`



function parseTcpStringAsHttpRequest(string) {
  let uri = string.match(/ ([a-zA-Z0-9?=,./]+) /gi)[0]
  uri = uri.replace(/ /gi,"")
  let body=string.split('\n\n')[1] || ""
  let method = string.match(/[A-Z]+ /gi)[0]
  method = method.replace(/ /gi,"")
  return { 
    method: method, 
    uri : uri, 
    headers:  "...", 
    body : body, 
  }; 
}

function processHttpRequest(method, uri, headers, body) {
  let statusCode = ""
  let statusMessage = ""
  if(method === "GET" && uri.includes("/sum?nums") === true){
    statusCode = "OK 200"
    statusMessage = uri.match(/\d/gi)
    statusMessage = statusMessage.reduce((a,b) => Number(a) + Number(b))
  }else{
    if (method === "GET" && uri.includes("/sum") === false){
      statusCode = "404 Not Found"
      statusMessage = "not found"
    }else{
      statusCode = "400 Bad Request"
      statusMessage = "not found"
    }
  }
  outputHttpResponse(statusCode,statusMessage,headers, body)
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
