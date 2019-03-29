
const os=require('os');//import system module to file.

console.log('Hello World');

//Get the details about System architecture,platform and number of CPUs
//from the OS module.
//02)
console.log('Architecture' + os.arch());
console.log('CPUs' + os.cpus().length);
console.log('OS' + os.platform());

//03) Read file
const fs=require('fs');

const  fileName = __dirname+"/test.txt";

fs.readFile(fileName,(err,data)=>{
    if(err){
        console.error(err);
    }
   // console.log(data);//print the buffer
    console.log(data.toString());
});

//read file synchronously

const data=fs.readFileSync(fileName);
console.log(data.toString());


//04.
//Use streams to copy content of a file

//const fileName = __dirname + '/test.txt';
const outFileName=__dirname + '/test-copy.txt';


const readStream = fs.createReadStream(fileName);
const writeStream = fs.createWriteStream(outFileName);

readStream.pipe(writeStream);

readStream.on('data',data => {
    console.log(data.toString());
});


//05)
//Http Server

const http = require('http');

// a) GET request
/*http.createServer((req,res) =>{
    res.setHeader('Content-Type','text/html');
    res.write('<h1>Hello World</h1>');
    res.end();

}).listen(3000);*/

//b)
http.createServer((req,res) =>
{
    res.setHeader('Content-Type','text/html');

    switch(req.method){
        case 'GET':
            res.write('<h1>Hello World</h1>');
            res.end();
            break;

        case 'POST':
            req.on('data',data =>{
                res.write('<h1>Hello World'+data+'</h1>');
                res.end();
            });

            break;
    }
}).listen(3000,(err) =>{
    console.log('server is listning to port 3000')
});

