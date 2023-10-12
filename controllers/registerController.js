const Register = require('../models/Register')
// add new user
const addNewUser= async function(req,res){
  if(req.body.Password!=req.body.ConfirmPassword){
    return res.status(400).json({message:"invalid password"})
  }
    try {
        const user = new Register(req.body)
        const token = await user.generateToken()
        await user.save()
        res.status(200).json({user , token})
    } catch (e) {
      console.log(e);
        res.status(400).send(e)
    }
    
}

// Get user by id
const getUserById= async function(req,res){
  const _id = req.params.id
  Register.findById(_id).then ((user) => {
      if(!user){
        return  res.status(404).send('UNABLE TO FIND')
      }
      res.status(200).send(user)
    }).catch ((e) => {
      res.status(500).send(e)
    })
}

// Get all user

const getAllUsers=async function(req,res){
    User.find((err, users) => {
        if (err) {
          console.log(err);
          res.status(500).send(`Error fetching users: ${err}`);
        } else {
          console.log(`Found ${users.length} users`);
          res.status(200).json(users);
        }
      });
}

// update user info by id

const updateUserInfoById = async function(req,res){
    try{
  
        const updates = Object.keys (req.body)
        console.log(updates)

        const _id = req.params.id

        const user = await Register.findById (_id)
        if(!user){
            return res.status(404).send('No user is found')
        }

        updates.forEach((ele) => (user[ele] = req.body[ele]))

      
       await user.save()


        res.status(200).send(user)
    }
    catch(error){
        res.status(400).send(error)
    }
}
// delted user by id
    
const deleteUserById = async function(req,res){
  try {
      const _id = req.params.id
      const user = await Register.findByIdAndDelete(_id)
      if(!user) {
         return res.status(404).send('UNABLE TO FIND USER')
      }
      res.status(200).send(user)
 }
 catch(e){
     res.status(400).send(e)
 }
}
module.exports={
    deleteUserById,
    addNewUser,
    updateUserInfoById,
    getAllUsers,
    getUserById

}