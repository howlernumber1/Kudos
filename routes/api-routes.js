const User = require('../models/User');
const Kudo = require('../models/Kudo');

module.exports = function(app) {

  // A GET route that retrieves all Kudos from the database.

  app.get('/api/kudo', function(req, res) {
    Kudo.find(req.body)
      .populate('to')
      .populate('from')
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // A GET route that retrieves all Users from the database.

  app.get('/api/user', function(req, res) {
    User.find(req.body)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.json(err);
      });
  });


  // A POST route to handle creating new Kudos.

  app.post('/api/kudo', function(req, res) {


    const newEntry = {
      from: req.body.from,
      to: req.body.to,
      title: req.body.title,
      body: req.body.body
    }

    Kudo.create(newEntry)
      .then(function(kudoData) {
        console.log(kudoData);
        return Kudo.findOneAndUpdate({
          _id: kudoData._id
        }, {
          $push: newEntry
        }, {
          new: true
        });
      })
      .catch(function(err) {
        res.json(err);
      });

  });


}
