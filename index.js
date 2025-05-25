const { Socket } = require("dgram");
const express=require("express");
const app=express();
const http=require("http");
const port=4003;
const server=http.createServer(app);//server
const path=require("path");
const { disconnect } = require("process");
const {Server}=require("socket.io");
//socket.io
const io=new Server(server);
io.on("connection",(socket)=>{
              socket.on("user_message",(message)=>{
                            io.emit("message",message);
              })
              socket.on("disconnect",()=>{
                            io.emit("disconnectUserMessage",socket.id);
              })

              
});
app.use(express.static(path.join(__dirname,"./public")));
app.get("/",async(req,res)=>{
              res.sendFile( __dirname + "/index.html");
})
server.listen(port,()=>console.log(`server started at http://localhost:${port}`));