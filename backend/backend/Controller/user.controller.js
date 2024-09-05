import User from '../model/user.model.js'; // Correct import statement
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'



export const signup = async(req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all required fields are present
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email already exists' });
            }
            if (existingUser.username === username) {
                return res.status(400).json({ message: 'Username already exists' });
            }
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create and save the new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Respond with a success message
        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Login function
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id, username: user.username },
            process.env.JWT_SECRET, { expiresIn: '2days' } // Token expires in 1 hour
        );

        // Send the token in the response
        res.status(200).json({
            message: 'Logged in successfully',
            user: {
                id: user._id,
                username: user.username
            },
            token,

            // Send the JWT to the client 
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}