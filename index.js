const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const path = require("path");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");


//middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.twfgrrk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
  try {
    await client.connect();
    const usersCollection = client.db("niloydeyce").collection("users");
    const newUsersCollection = client.db("niloydeyce").collection("newLoggedUser");
    const housesCollection = client.db("niloydeyce").collection("houses");

    
    
    // const ordersCollection = client.db("taja-jinis").collection("orderDetails");
    // const reviewCollection = client.db("taja-jinis").collection("review");
    // const userCollection = client.db("taja-jinis").collection("users");
   

   
    /* post method for adding new product */
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await usersCollection.insertOne(newUser);
      res.send(result);
    });

    app.post("/loggedUser", async  (req, res) => {
      const newUser = req.body;
      const result = await newUsersCollection.insertOne(newUser);
      res.send(result);
    });

      app.get("/users", async (req, res) => {
      const query = {};
      const cursor = usersCollection.find(query);

      const allUser = await cursor.toArray();
      res.send(allUser);
    });

    app.get("/houses", async (req, res) => {
      const query = {};
      const cursor = housesCollection.find(query);

      const allHouse = await cursor.toArray();
      res.send(allHouse);
    });
    app.get('/houses', (req, res) => {
      const { city, bedrooms, bathrooms, size } = req.query;
      let filteredHouses = houses;
      if (city) {
        filteredHouses = filteredHouses.filter(house => house.city === city);
      }
      if (bedrooms) {
        filteredHouses = filteredHouses.filter(house => house.bedrooms.toString() === bedrooms);
      }
      if (bathrooms) {
        filteredHouses = filteredHouses.filter(house => house.bathrooms.toString() === bathrooms);
      }
      if (size) {
        filteredHouses = filteredHouses.filter(house => house.size === size);
      }
      res.json(filteredHouses);
    });

    // //  single data finding for showing
    // app.get("/product/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const product = await productCollection.findOne(query);
    //   res.send(product);
    // });

    // /* post method for orders details */
    // app.post("/orderDetails", async (req, res) => {
    //   const orders = req.body;
    //   // console.log(orders);
    //   const newOrder = await ordersCollection.insertOne(orders);
    //   console.log(newOrder);
    //   res.send(newOrder);

    // });

    // app.get("/orderDetails", async (req, res) => {
    //   const query = {};
    //   const cursor = ordersCollection.find(query);
    //   const allOrder = await cursor.toArray();
    //   res.send(allOrder);
    // });

    // // Deleting  product  data from admin and farmer
    // app.delete("/products/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const deletedData = await productCollection.deleteOne(query);
    //   res.send(deletedData);
    // });

    // // Deleting  ordered product data from dashboard
    // app.delete("/orderDetails/:id", async (req, res) => {
    //   const id = req.params.id;
    //   // console.log(id);
    //   const query = { _id: ObjectId(id) };
    //   // console.log(query)
    //   const deletedData = await ordersCollection.deleteOne(query);
    //   // console.log(deletedData);
    //   res.send(deletedData);
    // });

    // /* post method for add review in database */
    // app.post("/review", async (req, res) => {
    //   const review = req.body;
    //   const result = await reviewCollection.insertOne(review);
    //   res.send(result);
    // });

    // /* Get method for review showing ui */
    // app.get("/review", async (req, res) => {
    //   const query = {};
    //   const cursor = reviewCollection.find(query);
    //   const review = await cursor.toArray();
    //   res.send(review);
    // });

    // // delete review from admin dashboard
    // app.delete("/review/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const deletedData = await reviewCollection.deleteOne(query);
    //   res.send(deletedData);
    // });



    // // ========================================================
    // /* Get method for all user data load and  showing ui */
    // app.get("/user", async (req, res) => {
    //   const query = {};
    //   const cursor = userCollection.find(query);
    //   const users = await cursor.toArray();
    //   res.send(users);
    // });
    // app.post("/user", async (req, res) => {
    //   const requests = req.body;
    //   const result = await userCollection.insertOne(requests);
    //   res.json(result);
    // });
    // /* ==================================================================================== */
    // /* Get order details for dashboard  */

    // // Farmer Requests for Dashboard
    // app.get("/farmerRequest", async (req, res) => {
    //   const cursor = farmerCollection.find({});
    //   const farmerRequests = await cursor.toArray();
    //   res.send(farmerRequests);
    // });

    // app.post("/farmerRequest", async (req, res) => {
    //   const requests = req.body;
    //   const result = await farmerCollection.insertOne(requests);
    //   res.json(result);
    // });

    // app.put("/farmerRequest/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const updatedRequest = req.body;
    //   const filter = { _id: ObjectId(id) };
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: {
    //       status: updatedRequest.status,
    //     },
    //   };
    //   const result = await farmerCollection.updateOne(
    //     filter,
    //     updateDoc,
    //     options
    //   );
    //   res.json(result);
    // });


    // // farmer delete request from admin dashboard 
    // app.delete("/farmerRequest/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await farmerCollection.deleteOne(query);
    //   res.json(result);
    // });

    // /* user information put process (update data) */


    // /////Adding All People/////////
    // app.post("/allPeople", async (req, res) => {
    //   const requests = req.body;
    //   const result = await peopleCollection.insertOne(requests);
    //   res.json(result);
    // });
    // app.post("/user", async (req, res) => {
    //   const requests = req.body;
    //   const result = await userCollection.insertOne(requests);
    //   res.json(result);
    // });


    // app.put("/user/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const user = req.body;
    //   const filter = { email: email };
    //   const options = { upsert: true };
    //   const updateDoc = { $set: user };
    //   const result = await userCollection.updateOne(filter, updateDoc, options);
    //   res.send(result);
    // });

    // /* Make a admin from user  */
    // app.put("/user/admin/:email", async (req, res) => {
    //   const email = req.params.email;
    //   // const requester = req.decoded.email;
    //   // const requesterAccount = await userCollection.findOne({ email: requester });
    //   // if (requesterAccount.role === 'admin') {
    //   const filter = { email: email };
    //   const updateDoc = { $set: { role: "admin" } };
    //   const result = await userCollection.updateOne(filter, updateDoc);
    //   res.send(result);
    // });

    // /* get method for admin call */
    // app.get("/admin/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const user = await userCollection.findOne({ email: email });
    //   const isAdmin = user.role === "admin";
    //   res.send({ admin: isAdmin });
    // });




  } 
  finally {
    
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(port, () => {
  console.log(`website listening on port ${port}`);
});

module.exports = app;