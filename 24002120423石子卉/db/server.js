// 石子卉 2026-11-13 GLM-5.3-Flash 数据服务器：静态托管课程页面并提供 db.json 数据访问，端口 3003
const http = require("http");
const fs = require("fs");
const path = require("path");

var szhPort = 3003;
// 静态根目录取 server.js 的上一级（学生文件夹），这样页面和 db/ 里的 db.json 都能被访问
var szhRoot = path.join(__dirname, "..");

// 实现 MIME 类型映射
var szhMime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".ico": "image/x-icon"
};

// 实现根据 URL 找到对应文件路径，并拦截目录穿越
function szhResolveFile(szhUrl) {
  var szhPath = decodeURIComponent(szhUrl.split("?")[0]);
  if (szhPath === "/") {
    szhPath = "/index.html";
  }
  var szhFull = path.join(szhRoot, szhPath);
  if (!szhFull.startsWith(szhRoot)) {
    return null;
  }
  return szhFull;
}

// 实现返回 db.json 中 poems 数据的 API
function szhSendPoems(szhRes) {
  var szhFile = path.join(__dirname, "db.json");
  fs.readFile(szhFile, "utf8", function (szhErr, szhData) {
    if (szhErr) {
      szhRes.writeHead(500, { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" });
      szhRes.end('{"error": "读取 db.json 失败"}');
      return;
    }
    szhRes.writeHead(200, { "Content-Type": "application/json; charset=utf-8", "Access-Control-Allow-Origin": "*" });
    szhRes.end(szhData);
  });
}

var szhServer = http.createServer(function (szhReq, szhRes) {
  var szhUrl = szhReq.url;
  // 实现 API 路由：/api/poems 直接返回诗歌数据
  if (szhUrl.split("?")[0] === "/api/poems") {
    szhSendPoems(szhRes);
    return;
  }
  // 实现静态文件访问
  var szhFile = szhResolveFile(szhUrl);
  if (!szhFile || !fs.existsSync(szhFile) || !fs.statSync(szhFile).isFile()) {
    szhRes.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", "Access-Control-Allow-Origin": "*" });
    szhRes.end("404 Not Found: " + szhUrl);
    return;
  }
  var szhExt = path.extname(szhFile).toLowerCase();
  szhRes.writeHead(200, {
    "Content-Type": szhMime[szhExt] || "application/octet-stream",
    "Access-Control-Allow-Origin": "*"
  });
  fs.createReadStream(szhFile).pipe(szhRes);
});

szhServer.listen(szhPort, function () {
  console.log("数据服务器已启动: http://localhost:" + szhPort + "/");
  console.log("诗歌数据接口: http://localhost:" + szhPort + "/api/poems");
  console.log("诗歌页面地址: http://localhost:" + szhPort + "/poems.html");
});
