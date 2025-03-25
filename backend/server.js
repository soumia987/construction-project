const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const resourceRoutes = require('./routes/ressourceRoutes.js');
const protect = require('./middleware/authMiddleware');
const cors = require('cors');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"], credentials: true }));

app.use('/api', projectRoutes);
app.use('/api', taskRoutes);
app.use('/api', resourceRoutes);

// Exemple de route protégée
app.use('/api/protected', protect, (req, res) => {
  res.status(200).send('Protected route accessed');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
