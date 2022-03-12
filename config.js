export default {
  database: {
    mongodb: {
      url: process.env.MONGODB_URL || "mongodb://localhost:27017/",
      dbname: process.env.MONGODB_DBNAME || "test",
    },
  },
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  },
  morgan: {
    format: ":method :url :status :: :response-time ms :: :res[content-length]",
  },
};
