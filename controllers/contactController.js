const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel")

//@desc Tomar todos los contactos
//@route GET /api/contacts 
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, sortBy = "name" } = req.query;
    const sortOptions = { [sortBy]: 1 };
    const skip = (page - 1) * limit;
    const totalContacts = await Contact.countDocuments({user_id: req.user.id});
    const contacts = await Contact.find({user_id: req.user.id})
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));
  
    res.status(200).json({ total: totalContacts, page, limit, contacts });
  });
  
//@desc Crear nuevo contacto
//@route POST api/contacts
//@access private
const createContact = asyncHandler (async (req,res) => {
    console.log("el cuerpo de la solicitud es ", req.body);
    const {name,email,phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("Todos los campos son obligatorios!");

    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});
//@desc consultar contacto
//@route GET api/contacts/:id
//@access private
const getContact = asyncHandler (async (req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contacto no encontrado");
    }
    res.status(200).json(contact);
});
//@desc modificar contacto
//@route PUT api/contacts/:id
//@access private
const updateContact = asyncHandler (async (req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contacto no encontrado");
    }
    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Este usuario no tiene permiso")
    }

    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updateContact);
});
//@desc Eliminar contacto
//@route DELETE api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contacto no encontrado");
    }
    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Este usuario no tiene permiso");
    }
    await contact.deleteOne();
    res.status(200).json(contact);
});

  
    module.exports = {getContacts, createContact, getContact,deleteContact,updateContact}

