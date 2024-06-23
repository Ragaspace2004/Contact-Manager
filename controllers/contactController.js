const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
});

const getContactById = asyncHandler(async (req, res) => {
  const contact=await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);

});

const postContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({ name, email, phone,user_id: req.user.id});
  res.status(200).json(contact);
});


const updateContact = asyncHandler(async (req, res) => {
  const contact=await Contact.findById(req.params.id)
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }

  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("Users have no permission to update other user contacts");
  }
  const updated=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});
  res.status(200).json(updated)});


const deleteContact = asyncHandler(async (req, res) => {
  const contact=await Contact.findById(req.params.id)
  if(!contact){
    res.status(404);
    throw new Error("Contact not found");
  }
  await Contact.findByIdAndDelete({_id:req.params.id});
  res.status(200).json({ message: `Deleted contact ${req.params.id}` });
});

module.exports = {
  getContact,
  getContactById,
  updateContact,
  deleteContact,
  postContact
};
