const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const resourceRoutes = require('./routes/ressourceRoutes.js');
const cors =require('cors');


const app = express();
dotenv.config();
app.use(cors())
connectDB();

app.use(express.json());

app.use('/api', projectRoutes);
app.use('/api', taskRoutes);
app.use('/api', resourceRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
