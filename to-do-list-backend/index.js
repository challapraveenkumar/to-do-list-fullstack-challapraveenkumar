let express = require('express')
let app = express()
app.use(express.json())
let cors = require('cors')
app.use(cors())
let mongoose = require('mongoose')
let dotenv = require('dotenv')
dotenv.config()

/* ========= SCHEMA ========= */

const itemSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  },
  {
    timestamps: true
  }
)

// MODEL 
const Item = mongoose.model("Item", itemSchema);


/* =============================
   ✅ CREATE (POST)
============================= */

app.post("/add-item", async (req, res) => {
  try {
    const { item, quantity } = req.body

    const newItem = new Item({ item, quantity })
    await newItem.save()

    res.status(201).json({
      message: "Item Created Successfully",
      data: newItem
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


/* =============================
   ✅ READ (GET ALL)
============================= */

app.get("/items", async (req, res) => {
  try {
    const items = await Item.find()
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


/* =============================
   ✅ READ (GET BY ID)
============================= */

app.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)

    if (!item) {
      return res.status(404).json({ message: "Item Not Found" })
    }

    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


/* =============================
   ✅ UPDATE (PUT)
============================= */

app.put("/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }   // return updated document
    )

    if (!updatedItem) {
      return res.status(404).json({ message: "Item Not Found" })
    }

    res.status(200).json({
      message: "Item Updated Successfully",
      data: updatedItem
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


/* =============================
   ✅ DELETE
============================= */

app.delete("/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id)

    if (!deletedItem) {
      return res.status(404).json({ message: "Item Not Found" })
    }

    res.status(200).json({
      message: "Item Deleted Successfully"
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


/* =============================
   ✅ DATABASE CONNECTION
============================= */

mongoose.connect(process.env.URL)
.then(() => {
    console.log("DATA CONNECTION WAS SUCCESSFULL ✅")
})
.catch(err => {
    console.log("DATA BASE NOT CONNECTED ❌")
    console.log(err)
})


/* =============================
   ✅ SERVER
============================= */

app.listen(8000 , () => {
    console.log("SERVER WAS CONNECTED ✅")
})