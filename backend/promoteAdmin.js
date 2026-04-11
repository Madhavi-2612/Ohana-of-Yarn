const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const promoteToAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const latestUser = await User.findOne().sort({ createdAt: -1 });
    
    if (!latestUser) {
      console.log('No users found in database.');
      process.exit(0);
    }

    latestUser.isAdmin = true;
    await latestUser.save();

    console.log(`Successfully promoted user "${latestUser.name}" (${latestUser.email}) to Admin!`);
    process.exit(0);
  } catch (error) {
    console.error('Error promoting user:', error);
    process.exit(1);
  }
};

promoteToAdmin();
