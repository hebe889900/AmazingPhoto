var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  cats = [
    'https://founded.media/hiring/photos/cats/14157413946_fea785b4d6_k.jpg',
    'https://founded.media/hiring/photos/cats/16175483119_bd7374d8a8_h.jpg',
    'https://founded.media/hiring/photos/cats/13901304865_a444cf4d34_k.jpg',
    'https://founded.media/hiring/photos/cats/8311701653_49ed80202c_k.jpg',
    'https://founded.media/hiring/photos/cats/13336301695_3c06dd41cc_k.jpg',
    'https://founded.media/hiring/photos/cats/38679744435_66279af67c_k.jpg',
    'https://founded.media/hiring/photos/cats/6393395037_9cda69da1a_b.jpg',
    'https://founded.media/hiring/photos/cats/6977309082_44102ddf51_b.jpg',
    'https://founded.media/hiring/photos/cats/11477923503_bbdf86387d_b.jpg',
    'https://founded.media/hiring/photos/cats/4481336172_7f464f180d_b.jpg'
  ];
  res.json(cats);
});

module.exports = router;