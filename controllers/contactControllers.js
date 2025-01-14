const asyncHandler = require("express-async-handler")
const Contacts = require("../models/contactModels")

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async(req, res) => {
  const contact = await Contacts.find({user_id: req.user.id});
  res.status(200).json(contact);
});

//@desc Create contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async(req, res) => {
    console.log("The request body is:", req.body)
    const {name, email, phone} = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("ALL fields are mandatory!") 
    }
    const contact = await Contacts.create({
      name,
      email,
      phone,
      user_id: req.user.id
    })
  res.status(201).json(contact);
});

//@desc Get individual contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async(req, res) => {
  const contact = await Contacts.findById(req.params.id)
  if(!contact){
    res.status(404);
    throw new Error("Contact not found.")
  }
  res.status(200).json(contact);
});

//@desc Edit contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async(req, res) => {
  const contact = await Contacts.findById(req.params.id)
  if(!contact){
    res.status(404);
    throw new Error("Contact not found.")
  }

  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User don't have permission to update other user's contacts")
  }

  const updatedContact = await Contacts.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true}
  )
  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async(req, res) => {
  const contact = await Contacts.findByIdAndDelete(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found.")
  }

  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User don't have permission to update other user's contacts")
  }
  
  res.status(200).json(contact);
});
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};