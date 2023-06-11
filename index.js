const express = require('express');
const cors = require('cors');
const port = 5000
require("dotenv").config();

// the mighty comment
// the mighty comment
// the mighty comment
// the mighty comment
// the mighty comment
// the mighty comment
// the mighty comment

const app = express();

app.use(cors())

app.get('/', (req, res) => {
  res.send('server is doing sit up');
})

// mongo code goes here
// console.log(process.env.USER);
// console.log(process.env.PASS);

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ta7i6kc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const classCollection = client.db("getFit").collection('class')
    const trainerCollection = client.db("getFit").collection('trainer')

    // get all classes
    app.get('/class', async (req, res) => {
      const cursor = classCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // get all trainer
    app.get('/trainer', async (req, res) => {
      const cursor = trainerCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })
    
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// mongo code goes here

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})