import jwt from 'jsonwebtoken';
import { userModal } from '../modal/userModal.js';
import bcrypt from 'bcrypt';

export class userController {

async register(req,res){
    try{
        const { userName,DOB,contact,address,gender, password, role } = req.body;

        if(role=='admin'){
            const existingAdmin = await userModal.findOne({ role: 'admin' });
            if (existingAdmin) {
              return res.status(403).send({ message: "Admin already exists. Only one admin is allowed." });
            }
          }
          const hashed = await bcrypt.hash(password, 10);
          const user = new userModal({userName,DOB,contact,address,gender, password: hashed, role });
          await user.save();
          res.status(201).send({ message: "User registered", user: { id: user._id, name: user.userName, email: user.email, role: user.role } });
        } catch (error) {
          res.status(500).send({ message: "Registration failed", error: error.message });
        }
      }
      async login(req, res) {
        try {
          const { userName, password } = req.body;
          const user = await userModal.findOne({ userName });
          if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send({ message: 'Invalid credentials' });
          }
    
          const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
          res.json({ token });
        } catch (error) {
          res.status(500).send({ message: "Login failed", error: error.message });
        }
      }

      async userIndex(req,res){
        try{
            const user = await userModal.find();
            if(!user){
                return res.status(400).send({ message: 'no user found' });
            }
            res.json({ success: true, data: user });
        }
        catch(err){
            return res.status(400).send({ message: 'failed fetch user' });
        }
      }

      async editUser(req,res){
        const{id} = req.params;
        try{

            const existingUser = await userModal.findById(id);
            if (!existingUser) {
                return res.status(404).send({ status: false, message: "No user found" });
            }
            
          const { userName,DOB,contact,address,gender, password, role } = req.body;
          if(role=='admin'){
            const existingAdmin = await userModal.findOne({ role: 'admin' });
            if (existingAdmin) {
              return res.status(403).send({ message: "Admin already exists. Only one admin is allowed." });
            }
          }
          const hashed = await bcrypt.hash(password, 10);
          const updatedUser = await userModal.findByIdAndUpdate(id,{userName ,DOB,contact,address,gender, password: hashed, role });
          await updatedUser.save();
          
          res.status(201).send({ message: "User updated",result:updatedUser});
        } catch (error) {
          res.status(500).send({ message: "update failed", error: error.message });
        }
      }


      async deleteUser(req,res){
        const{id} = req.params;
        try{
          const deleteUser = await userModal.findByIdAndDelete(id);
          if (!deleteUser) {
            return res.send({ status: false, message: "No user found" });
          }
          res.status(201).send({ message: "User Deleted",result:deleteUser});
        } catch (error) {
          res.status(500).send({ message: "Deletion failed", error: error.message });
        }
      }
    }
    