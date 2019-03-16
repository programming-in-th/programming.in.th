const app = require('express').express(),
      MongoClient = require("mongodb").MongoClient,
      admin = require("firebase-admin");

const port = parseInt(process.env.PORT, 10) || 3000,
      dev = process.env.NODE_ENV !== 'production',
      connectionURI = "mongodb+srv://sukusuku:hakutaku@node-01-6yvh3.mongodb.net/test?retryWrites=true",
      sukuClient = `${__dirname}/store/suku-firebase.json`;

app.post('/registeration',(req,res,next) => {
    if(!admin.apps.length){
        admin.initializeApp({
        credential: admin.credential.cert(sukuClient),
        databaseURL: "https://myth-grader.firebaseio.com"
        })
    }
});

app.get('*', (req, res) => {
    return res.send(`${__dirname}/public/index.html`);
});

app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port} desu.`)
});