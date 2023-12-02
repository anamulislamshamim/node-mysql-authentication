exports.registerCrtl = (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    res.send("Form submitted successfully!");
};