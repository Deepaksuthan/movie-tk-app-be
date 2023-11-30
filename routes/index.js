var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(
    `<h1>movie ticket app</h1>`
  )
});
router.post('/postmovie',async(req,res)=>{
  
  let data = await Movie.create(req.body);
  if(data){
    res.status(201).json({
      message:'Movie Created Successfully',
      data
  })
  }
})

router.post('/postticket',async(req,res)=>{
  let data = await Ticket.create(req.body);
  if(data){
    res.status(201).json({
      message:'Ticket Booked Successfully',
      data,
  })
}
})

router.get('/tickets',async(req,res)=>{
  let data = await Ticket.find()
  res.send(data);
})


router.get('/movies',async(req,res)=>{
  let data = await Movie.find()
  res.send(data)
})





module.exports = router;
