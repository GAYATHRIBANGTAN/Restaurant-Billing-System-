// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadsDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// // Mongoose schema and model
// const itemSchema = new mongoose.Schema({
//   itemName: String,
//   startTime: String,
//   endTime: String,
//   amount: Number,
//   quantity: Number,
//   category: String,
//   itemImage: String
// });

// const Item = mongoose.model('Item', itemSchema);

// // Connect to MongoDB
// async function connectToDb() {
//   try {
//     await mongoose.connect('mongodb+srv://Gayathri:82209@cluster0.t3icp1c.mongodb.net/billing?retryWrites=true&w=majority&appName=Cluster0', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('DB Connection established');
//     const port = process.env.PORT || 8000;
//     app.listen(port, () => {
//       console.log(`Listening on port ${port}`);
//     });
//   } catch (error) {
//     console.error("Couldn't establish connection", error);
//   }
// }

// connectToDb();

// // Add item endpoint
// app.post('/items', upload.single('itemImage'), async (req, res) => {
//   try {
//     const { itemName, startTime, endTime, amount, quantity, category } = req.body;
//     const itemImage = req.file.path;
//     const newItem = await Item.create({ itemName, startTime, endTime, amount, quantity, category, itemImage });
//     res.status(201).json({
//       status: 'success',
//       message: 'Item added successfully',
//       item: newItem
//     });
//   } catch (error) {
//     console.error('Error adding item:', error);
//     res.status(500).json({
//       status: 'failure',
//       message: 'Failed to add item',
//       error: error.message
//     });
//   }
// });

// // Get items endpoint
// app.get('/items', async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.status(200).json({ status: 'success', items });
//   } catch (error) {
//     console.error('Error fetching items:', error);
//     res.status(500).json({
//       status: 'failure',
//       message: 'Failed to fetch items',
//       error: error.message
//     });
//   }
// });




// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadsDir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// // Mongoose schema and model
// const itemSchema = new mongoose.Schema({
//   itemName: String,
//   startTime: String,
//   endTime: String,
//   amount: Number,
//   quantity: Number,
//   category: String,
//   itemImage: String
// });

// const Item = mongoose.model('Item', itemSchema);

// // Connect to MongoDB
// async function connectToDb() {
//   try {
//     await mongoose.connect('mongodb+srv://Gayathri:82209@cluster0.t3icp1c.mongodb.net/billing?retryWrites=true&w=majority&appName=Cluster0', {
//       // Remove deprecated options
//     });
//     console.log('DB Connection established');
//     const port = process.env.PORT || 8001; // Changed port number
//     app.listen(port, () => {
//       console.log(`Listening on port ${port}`);
//     });
//   } catch (error) {
//     console.error("Couldn't establish connection", error);
//   }
// }

// connectToDb();

// // Add item endpoint
// app.post('/items', upload.single('itemImage'), async (req, res) => {
//   try {
//     const { itemName, startTime, endTime, amount, quantity, category } = req.body;
//     const itemImage = req.file.path;
//     console.log('File uploaded to:', itemImage);  // Log the file path
//     const newItem = await Item.create({ itemName, startTime, endTime, amount, quantity, category, itemImage });
//     res.status(201).json({
//       status: 'success',
//       message: 'Item added successfully',
//       item: newItem
//     });
//   } catch (error) {
//     console.error('Error adding item:', error);
//     res.status(500).json({
//       status: 'failure',
//       message: 'Failed to add item',
//       error: error.message
//     });
//   }
// });


// // Get items endpoint
// app.get('/items', async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.status(200).json({ status: 'success', items });
//   } catch (error) {
//     console.error('Error fetching items:', error);
//     res.status(500).json({
//       status: 'failure',
//       message: 'Failed to fetch items',
//       error: error.message
//     });
//   }
// });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Mongoose schema and model
const itemSchema = new mongoose.Schema({
  itemName: String,
  startTime: String,
  endTime: String,

  
  amount: Number,
  quantity: Number,
  category: String,
  itemImage: {
    url: String // Store image URL instead of path
  }
});

const Item = mongoose.model('Item', itemSchema);

// Connect to MongoDB and start the server
async function connectToDb() {
  let port = process.env.PORT || 8001;
  let serverStarted = false;

  while (!serverStarted) {
    try {
      await mongoose.connect('mongodb+srv://Gayathri:82209@cluster0.t3icp1c.mongodb.net/billing?retryWrites=true&w=majority&appName=Cluster0', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('DB Connection established');
      app.listen(port, () => {
        console.log(`Listening on port ${port}`);
      });
      serverStarted = true; // Server started successfully
    } catch (error) {
      console.error(`Couldn't start server on port ${port}:`, error);
      port++; // Increment port and retry
    }
  }
}

connectToDb();

// Add item endpoint
app.post('/items', async (req, res) => {
  try {
    const { itemName, startTime, endTime, amount, quantity, category, itemImage } = req.body;
    const newItem = await Item.create({ itemName, startTime, endTime, amount, quantity, category, itemImage });
    res.status(201).json({
      status: 'success',
      message: 'Item added successfully',
      item: newItem
    });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({
      status: 'failure',
      message: 'Failed to add item',
      error: error.message
    });
  }
});

// Update item endpoint
app.put('/items/:id', async (req, res) => {
  try {
    const { itemName, startTime, endTime, amount, quantity, category, itemImage } = req.body;
    const updateData = { itemName, startTime, endTime, amount, quantity, category, itemImage };

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json({
      status: 'success',
      message: 'Item updated successfully',
      item: updatedItem
    });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({
      status: 'failure',
      message: 'Failed to update item',
      error: error.message
    });
  }
});

// Get items endpoint
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ status: 'success', items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({
      status: 'failure',
      message: 'Failed to fetch items',
      error: error.message
    });
  }
});

// Delete item endpoint
app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({
      status: 'failure',
      message: 'Failed to delete item',
      error: error.message
    });
  }
});

// Fetch item image endpoint
app.get('/fetch-item-image/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ status: 'failure', message: 'Item not found' });
    }

    const imageUrl = item.itemImage.url;
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'stream' // Ensure response type is stream to handle large files
    });

    // Set content type based on image type if known (e.g., 'image/jpeg', 'image/png')
    res.setHeader('Content-Type', 'image/jpeg'); // Adjust content type as per your image type

    // Pipe the image stream directly to the response object
    imageResponse.data.pipe(res);
  } catch (error) {
    console.error('Error fetching item image:', error);
    res.status(500).json({ status: 'failure', message: 'Failed to fetch item image' });
  }
});

const port = process.env.PORT || 8001; // Change the port number if needed
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
