const Upload = require('../models/schema');
const fs = require('fs');

exports.home = async (req, res) => {
  const all_images = await Upload.find();
  console.log(all_images);
  res.render('main', { images: all_images });
};
exports.uploads = (req, res, next) => {
  const files = req.files;

  if (!files) {
    const err = new Error('Please Select file');
    return next(err);
  }

  //converting images in Base 64 encoding
  let imgArray = files.map((file) => {
    const img = fs.readFileSync(file.path);
    let encode_img = img.toString('base64');
    fs.unlink(file.path, (err) => {
      console.log('File removed');
    });
    return encode_img;
  });

  //saving in db
  let result = imgArray.map((src, index) => {
    let finalimg = {
      filename: files[index].originalname,
      contentType: files[index].mimetype,
      imageBase64: src,
    };

    let newUpload = new Upload(finalimg);
    return newUpload
      .save()
      .then(() => {
        return { msg: `${files[index].originalname} is save in DB` };
      })
      .catch((err) => {
        if (err.code === 11000)
          return Promise.reject({
            error: `${files[index].originalname} is already exist`,
          });
        return Promise.reject({ error: err.message || `Cannot save In DB` });
      });
  });

  Promise.all(result)
    .then((msg) => {
      // res.json(msg);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};
