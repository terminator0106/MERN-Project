import Contact from "../models/contact-model.js";

const contactForm = async (req,res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        res.status(201).json({message: "Contact created successfully"});
    } catch (error) {
        res.status(500).json({message: "Error creating contact"});
    }
};

export default contactForm;