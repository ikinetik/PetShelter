// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static( __dirname + '/public/dist/public' ));
// Setting our Views Folder Directory
mongoose.connect('mongodb://localhost/PetShelterDB', { useNewUrlParser: true });

const PetSchema = new mongoose.Schema({
    name: {type:String, unique: true, required:[true, "Name cannot be blank"], minlength: [3, "Pet name must be at least 3 characters long!"]},
    type: { type: String, required: [true, "Type cannot be blank."], minlength: [3, "Pet type must be at least 3 characters long"]},
    description: {type: String, required: [true, "Description cannot be blank."], minlength: [3, "Pet description must be at least 3 characters long"]},
    skills: [] //{type: String, type: String, type: String}
})

const Pet = mongoose.model('Pet', PetSchema);
var mySort = {type: 1}; //1 : ascending, -1 : descending

//ROUTES -----------------------------------------------------------

app.get('/getPets', (req, res)=>{ //this route is for the DASHBOARD
    Pet.find({}, (err, allPets)=>{
        if(err){
            let errors = [];
            for (var key in err.errors) {
                errors.push(err.errors[key].message)
            }
            return res.status(400).json(errors);
        }else{
            return res.json(allPets); //allPets is the QUERY RESULT!
        }
    }).sort(mySort)
})

app.post('/addPet', (req, res)=>{ //CREATE A PET
    let p = new Pet(req.body);
    p.save( (err, data)=>{
        if(err){
            let errors = [];
            for(var key in err.errors){
                errors.push(err.errors[key].message)
            }
            return res.status(400).json(errors);
        }else{
            return res.json(data);
        }
    })
})

app.get('/getPet/:id', function(req,res){ //GET PET TO SHOW
    // RUN QUERY HERE: This query gets a task so we can populate our FORM!
        Pet.findOne({_id: req.params.id}, function(err, query_result) {
            if(err){
                let errors = [];
                for(var key in err.errors){
                    errors.push(err.errors[key].message)
                }
                return res.status(400).json(errors);
            }else{
                return res.json(query_result);
            }
      })    
      
      
}) //END GET

app.put('/updatePet/:id', function(req,res){
    Pet.findOneAndUpdate({_id: req.params.id },req.body, function(err, query_result) {
         
        if(err){
            let errors = [];
            for(var key in err.errors){
                errors.push(err.errors[key].message)
            }
            return res.status(400).json(errors);
        }else{
            return res.json(query_result);
        }
       })
 
 }) //END GET

 app.get('/deletePet/:id', function(req,res){
    Pet.remove({_id: req.params.id }, function(err, query_result) {
        if(err){
            let errors = [];
            for(var key in err.errors){
                errors.push(err.errors[key].message)
            }
            return res.status(400).json(errors);
        }else{
            return res.json(query_result);
        }
  })

}) //END GET



app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})