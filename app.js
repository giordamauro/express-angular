var express = require('express'); 
var bodyParser = require('body-parser');

//--------------------------------------------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
});

userSchema.methods.getFullName = function () {
  return this.lastName + ", " + this.firstName;
}

var User = mongoose.model('users', userSchema);

//--------------------------------------------------------
var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index.html');
});

var router = express.Router();

router.route('/users')

    .post(function(req, res) {
        
        var newUser = new User(req.body);

        newUser.save(function(err) {
            if (err) {
                res.status(400).json(err);
            }

            res.status(201).json(newUser);
        });
    })

    .get(function(req, res) {
        User.find(function(err, users) {
            if (err) {
                res.status(500).json(err);
            }

            res.json(users);
        });
    });

router.route('/users/:userId')

    .get(function(req, res) {
        User.findById(req.params.userId, function(err, user) {
            
            if (err) {
              res.status(500).json(err);
            }

            if (!user) {
              res.status(404).json({ message: 'Not found' });
            }
            else {
             res.json(user);
            }
        });
    })
    
    .put(function(req, res) {

        User.findById(req.params.userId, function(err, user) {

            if (err) {
              res.status(500).json(err);
            }

            if (!user) {
              res.status(404).json({ message: 'Not found' });
            }
            else {
              user.firstName = req.body.firstName;
              user.lastName = req.body.lastName;
              user.age = req.body.age;
              user.gender = req.body.gender;
              
              user.save(function(err) {
                  if (err) {
                      res.status(500).json(err);
                  }

                  res.json(user);
              });
            }
        });
    })

  .delete(function(req, res) {

        User.findById(req.params.userId, function(err, user) {

            if (err) {
              res.status(500).json(err);
            }

            if (!user) {
              res.status(404).json({ message: 'Not found' });
            }
            else {
              user.remove(function (err) {
                if (err) {
                      res.status(500).json(err);
                  }
              });
        
              res.status(204).send();
            }
        });
  });  

app.use('/api', router);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
