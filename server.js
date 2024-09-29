  /*
  Note -> all express routes are written in the routes directory. This file only serves the right route for the given HTTP request
  */
  //import routes

  import PurchaseItem from "./mongoose/purchases/schema.js";
  import exampleRoute from "./routes/exampleRoute.js";
  import addPurchase from "./routes/addPurchase.js";
  import deletePurchase from "./routes/deletePurchase.js";
  import getResults from "./routes/getResults.js";
  import updatePurchase from "./routes/updatePurchase.js";
  import deleteAll from "./routes/deleteAll.js";
  import cors from 'cors';
  import './utils/auth.js';
  import session from 'express-session';

  import user from "./mongoose/user/schema.js";




  //start dotenv
  import dotenv from 'dotenv';
  dotenv.config();
  //start mongoose
  import  mongoose  from 'mongoose';
  mongoose.connect(process.env.ATLAS_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));//start express
  import express from 'express';
  import passport from "passport";
  import {isInBudget} from "./utils/isInBudget.js";
  import router from "./routes/addPurchase.js";
  import * as path from "node:path";
  import {dirname} from "path";

  const __dirname = dirname(__filename)
  let username = '';
  const app = express();
  app.use(express.urlencoded({extended:true}));
  app.use(express.json());
  app.use(cors({origin:`${process.env.VITE_FE_PORT}`, credentials: true}));
  app.use(session({secret:'webware', resave:false, saveUninitialized:false}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname,  'dist', 'index.html' ))
  })
  app.get('/auth/github',passport.authenticate('github', {scope:['user:email']}));
  const isLoggedIn = (req, res, next) => {
    console.log('user is', req.user);
    if(req.isAuthenticated()){
      console.log("authenticated");
      next();
    }
    else{
      res.status(401).send();
    }
    // req.isAuthenticated()? next(): res.status(401).send();

  }
  app.get('/', (req, res) => {
    res.redirect('/auth/github');
  });
  app.get('/git/callback',
    passport.authenticate('github', {
      successRedirect:'/protected',
      failureRedirect: '/failed'
    })
  );

  app.get('/failed',(req, res) => {
    res.send('something went wrong!');

  });
  app.get('/protected', isLoggedIn, async (req, res) => {
    username = req.user['username'];
    res.redirect(`${process.env.VITE_FE_PORT}/home`);


  });




  // app.get('/home.html', (req, res, next) => {
  //   if(!req.user){
  //     res.redirect('/auth/github');
  //   }
  //   else{
  //     next();
  //   }
  //
  // });
  app.get('/auth/logout', (req, res) => {
    const html = `
       <!DOCTYPE html>
       <html>
           <head>
               <title>Logged out</title>
           </head>
          <body>
                <a href = "/auth/github">Log Back in </a>
           </body>
      </html>
      
      
      `
    req.logout(() => res.send(html));

  })





  //middleware for post requests so that requests have a body with the incoming data
  const postMiddleware = (req, res, next) => {
    const dataArr = [];
    let dataString = '';
    req.on('data', (data) =>{
      dataString += data;

    });
    req.on('end', () => {
      if(dataString){
        const json = JSON.parse(dataString);
        req.body = JSON.stringify(json);

      }
      next();

    })
  }

  //basic route used to test API and MongoDB atlas health
  app.get('/', async (req, res) =>{
    res.send('Hello');
    const test = await PurchaseItem.countDocuments({});
  });
  //attach routes

  //gets first




  // app.get('/home', (req, res) => {
  //     res.sendFile(__dirname + '/index.html');
  // });

  app.get('/user', (req, res) => {
    console.log(req.user);
  });
  app.use(exampleRoute);
  app.get('/getResults', async (req, res) =>{
    try{
      const data = await PurchaseItem.find({userName: username});
      console.log("the data is", data);

      res.json({"data": data});
    }
    catch (err){

      res.sendStatus(400);
    }



  });
  app.use(deleteAll);

  app.use(postMiddleware);

  // app.use(addPurchase);
  app.post('/addPurchase', async (req, res) =>{
    console.log("inside add purchase", req.user);
    const body = JSON.parse(req.body);
    body.affordable = isInBudget(body);
    body.userName = req.user['username'];
    // body.userName = 'vivekjag1';
    console.log("I hate life", body);


    await PurchaseItem.create(body);
    const toSend = await PurchaseItem.find({});
    res.json({"data": toSend});

  });
  app.use(deletePurchase);
  app.post('/updatePurchase', async (req, res) =>{
    const body = JSON.parse(req.body);
    let newPurchase = {
      "title": body.title,
      "category": body.category,
      "store": body.store,
      "price": body.price,
      "cashOnHand": body.cashOnHand,



    };

    const affordable =   isInBudget(newPurchase);
    newPurchase.userName = body.userName;
    newPurchase.affordable = affordable


    const data = await PurchaseItem.findOneAndDelete({title: body.oldTitle, userName:newPurchase.userName});
    const newData = await PurchaseItem.create(newPurchase);
    const allResults = await PurchaseItem.find();



    res.json({"data": allResults});
  });
  export default router;app.listen(process.env.PORT || 3001);
  console.log("app ready on port 3000!")