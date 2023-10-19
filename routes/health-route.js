import express from "express";
import healthController from '../controller/health-controller.js';
import mysql from 'mysql2';
//const app = express();


const router = express.Router();

router.route('/get')
  //.post(userController.createUser)
  .get(healthController.health);

  export default router;

//app.use(express.json());

/* app.get('/healthz' , async (req,res) => {
    res.json({message:'Route Protected!'})
    let isHealthy =false
    var connection = mysql.createConnection({
    host:"localhost",
    port: '3306',
    user:"root",
    password:"Rutuja6367",
    database: "sys"
    
  });  
  
  if (Object.keys(req.body).length !== 0) {
    
    res.status(400).json();
    return;
  }
  
  if (Object.keys(req.query).length !== 0) {
    
    res.status(400).json();
  return;
  }
  
      connection.connect(function(err) {
          if (err) {
              isHealthy = false
          }else{
              isHealthy = true
          }
         console.log("Connected!");
        
          if(isHealthy){  
            
            res.setHeader('Cache-Control', 'no-cache','no-store','must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('X-Content-Type-Options', 'nosniff');
  
            res.status(200).json();
            
          }
          else{  
            console.log("Connection Interrupted!")  
              
            res.status(503).json({"asd":"as"});
            
          }
        });
  });

  export default app; */