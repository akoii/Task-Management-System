import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // Import mongoose
import cors from 'cors';
import userRoute from './Routes/user.route.js'; // Import user routes
import taskRoute from './Routes/task.route.js'

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000
const URI = process.env.MongoDBURI

try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("Connected to MongoDB")
} catch (error) {

    console.log("Error: " + error)
}
app.use('/user', userRoute); // Use the user routes
app.use('/task', taskRoute)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});