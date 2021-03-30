//node
//const express = require('express');
// const PORT = 3030;
// const HOSTNAME = "0.0.0.0";
// const app = express();
// const path = require('path');
// const bodyParser = require("body-parser");

// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//      const indexFile = path.resolve(__dirname, 'index.html');
//     res.sendFile(indexFile);
// });

// console.log("listening", PORT)
// app.listen({
//     port: PORT,
//     hostname: HOSTNAME
// });

//oak
// export const runDevServer = async function (port, hostname) {
//     server.use(async (ctx, next) => {
//       const { pathname } = ctx.request.url;

//       if (pathname === "/") {
//         await send(ctx, pathname, {
//           root: path.join(Deno.cwd(), "public"),
//           index: "index.html",
//         });

//       } else await next();
//     });

const Vue = require('vue')
const server = require('express')()
const template =  require('fs').readFileSync('./index.template.html', 'utf-8')
const renderer = require('vue-server-renderer').createRenderer({template})
// const cors = require('cors');
// server.use(cors());
const context= {
    title:'vue ssr',
    metas: 
   ` <meta name = "keyword" content="vue,ssr">
    <meta name="description" content="vue ssr demo">`
  }
server.get('*', (req,res)=>{
    const app = new Vue({
        data:{
            url:"jskdjflskjlf"
        },
        template:`<div>the visited URL is: {{url}} </div>`
    })

    renderer.renderToString(app, (err,html)=>{
        console.log(html,"from the console.log")
        if (err){
            console.log(err,"yooo error")
            res.status(500).end('Internal servor error from server.js')
            return
        }
        res.end(html)
    })
})

console.log("listening 8080")
server.listen(8080)