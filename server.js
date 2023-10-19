import app from './app.js'

const port = 8080;
 
app.listen(port,() =>{
    console.log(`health check app listening on port ${port}`);

});