import express from 'express';
import router from './app/routes/api.js';
import { PORT, DATABASE, WEB_CACHE, MAX_JSON_SIZE, URL_ENCODE, REQUEST_TIME, REQUEST_NUMBER } from './app/config/config.js';
const app = express();

import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import mongoose from 'mongoose';
import path from 'path';


mongoose.connect(DATABASE, { 
    // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
 })
.then(() => console.log('Database connected successfully'))
.catch(err => console.log(err));


app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: MAX_JSON_SIZE }));
app.use(bodyParser.urlencoded({ extended: URL_ENCODE }));
app.use(cookieParser());
app.use(xss());
app.use(mongoSanitize());
app.use(hpp());

const limiter = rateLimit({
    windowMs: REQUEST_TIME,
    max: REQUEST_NUMBER
});
app.use(limiter);


app.use('/api/', router);

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', (req, res) => {
//     res.sendFile (path.join(__dirname, 'public/index.html'));   
// }
// );

export default app;
