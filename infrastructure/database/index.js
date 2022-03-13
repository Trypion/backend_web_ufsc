import MongoClient from "./mongodb";

const factory = async config => {
  const mongodbConnection = await MongoClient.connect(config.mongodb);

  return { mongodbConnection };
};

export default { factory };
