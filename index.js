const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");



app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('server is doing sit up');
})

// mongo code goes here


const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.ta7i6kc.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://prodipkrishna01:C0dhtgOsm5WfWYBc@cluster0.ta7i6kc.mongodb.net/?retryWrites=true&w=majority`;

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
    await client.connect();

    const classCollection = client.db("getFit").collection('class')
    const trainerCollection = client.db("getFit").collection('trainer')
    const cartsCollection = client.db("getFit").collection('carts')
    const userCollection = client.db("getFit").collection('users')

    // users
    app.post('/users', async(req, res) => {
      // const user = req.body;
      // const result = await userCollection.insertOne(user)
      // res.send(result)
      try {
        const user = req.body;
        const result = await userCollection.insertOne(user);
      } catch (error) {
        console.error("Failed to insert user data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    })

    // add carts items
    app.post('/carts', async(req, res) => {
      const item = req.body
      console.log(item)
      const result = await cartsCollection.insertOne(item)
      res.send(result)
    })
    

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