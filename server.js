import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { urlShort, getOrignalURL } from './controllers/url.js';
const app = express();

dotenv.config();
const port = process.env.PORT || 4300

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "url_shortener"
        });
        console.log("Database connected")
    }
    catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

await connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", async (req, resp) => {
    resp.render("index.ejs", { shortUrl: null })
})

app.post('/shorten', urlShort)

// redirect to origanal URL
app.get('/:shortCode', getOrignalURL);

app.listen(port, () => console.log(`server is running on port ${port}`))
