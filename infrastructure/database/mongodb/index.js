import mongoose from "mongoose";

/**
 * @type {Object} MongoClient default settings.
 */
const defaults = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/**
 * @param  {String}                               arg.url     MongoDB connection URL.
 * @param  {String}                               arg.dbname  DB name.
 * @param  {Object}                               arg.options MongoClient options.
 * @returns {Promise.<Object.<String, Function>>}             Methods.
 */
const connect = async ({ url, dbname, options = {} }) => {
  const client = await mongoose.connect(url, { ...defaults, ...options, dbName: dbname });

  return client;
};

export default { connect };
