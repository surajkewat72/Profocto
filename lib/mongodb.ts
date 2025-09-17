import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const options: MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 1,
  retryWrites: true
};

// In development, we want to preserve connection across reloads
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI!, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's better to not use a global variable.
  const client = new MongoClient(process.env.MONGODB_URI!, options)
  clientPromise = client.connect()
}


export default clientPromise;