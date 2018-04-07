var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  sharks = [
    'https://founded.media/hiring/photos/sharks/11261840124_dc9ac72bbe_b.jpg',
    'https://founded.media/hiring/photos/sharks/513197047_2f861d56cb_b.jpg',
    'https://founded.media/hiring/photos/sharks/2989909952_b59500107e_o.jpg',
    'https://founded.media/hiring/photos/sharks/4107884442_3baf8985f2_b.jpg',
    'https://founded.media/hiring/photos/sharks/3822452418_ffa66da89d_o.jpg',
    'https://founded.media/hiring/photos/sharks/3800013954_20fea3a9c9_b.jpg',
    'https://founded.media/hiring/photos/sharks/7109693941_250fc6b246_k.jpg',
    'https://founded.media/hiring/photos/sharks/8592704407_75c3c7ff53_h.jpg',
    'https://founded.media/hiring/photos/sharks/14730744390_cebc28aa86_k.jpg',
    'https://founded.media/hiring/photos/sharks/4936728723_91da549b05_b.jpg',
  ];
  res.json(sharks);
});

module.exports = router;