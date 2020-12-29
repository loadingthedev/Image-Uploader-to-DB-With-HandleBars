const mongoose = require('mongoose');
const { MONGO_URI } = require('../../config');

const connect = async () => {
  try {
    const con = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(`MANGO_DB is connected : ${con.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connect;
