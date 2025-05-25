const { Socket } = require("dgram");
const express=require("express");
const app=express();
const http=require("http");
const port=4003;
const server=http.createServer(app);//you have to give routes here.
const path=require("path");
const { disconnect } = require("process");
const {Server}=require("socket.io");
//socket.io
const io=new Server(server);//hepl in handle socket.io
io.on("connection",(socket)=>{//socket means user
              socket.on("user_message",(message)=>{//whenever user_message event come from backend.
                            io.emit("message",message);
              })
              socket.on("disconnect",()=>{
                            io.emit("disconnectUserMessage",socket.id);
              })

              
});
app.use(express.static(path.join(__dirname,"./public")));//tell express to apload same file of public folder without any change
app.get("/",async(req,res)=>{
              res.sendFile( __dirname + "/index.html");
})
server.listen(port,()=>console.log(`server started at http://localhost:${port}`));