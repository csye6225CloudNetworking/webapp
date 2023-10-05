export const health = async (req,res) =>{
    try {
      res.status(200).json({"message":"Successful"});
    } catch (err) {
      res.status(500).json({ error: err.message});}
  
  };

 