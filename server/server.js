import express from 'express';
const app = express();
import cors from 'cors';
import sequelize from './db/sequelize.js';
import userRouter from './router/UserRouter.js';
import profileRouter from './router/ProfileRouter.js';
import preferenceRouter from './router/PreferenceRouter.js';
import subscriptionRouter from "./router/subscriptionRouter.js";
import interestRouter from "./router/interestRouter.js";
import profileInterestRouter from "./router/profileInterestRouter.js";

const corsOptions = {
    origin: "http://localhost:5173"
} 

app.use(cors(corsOptions));
app.use(express.json());

//db-connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

// create db Tables
sequelize.sync().then(() => {
    console.log('Table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

app.use('/users', userRouter);
app.use('/profiles', profileRouter);
app.use('/preferences', preferenceRouter);
app.use('/subscriptions',subscriptionRouter);
app.use('/interests',interestRouter)
app.use('/profile-interests',profileInterestRouter)

app.get('/api',(req, res)=>{
    res.json({1:['apple','ball','cat']})
})

app.listen(8080, ()=>{
    console.log('Server started on Port 8080')
})

