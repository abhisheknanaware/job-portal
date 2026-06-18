import mongoose from 'mongoose';

//function to connect to mongodb database
const connectDb = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }
    await mongoose.connect(MONGO_URI, {});
    console.log('mongodb connected')
}

export default connectDb;