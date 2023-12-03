const db = require("../config/dbConnection");


// create orderCtrl to controll customer order 
const orderCtrl = (req, res) => {
    console.log(req.body);
    db.query("INSERT INTO food_order SET ?", req.body , (error, results) => {
        if (error) {
            res.render('index', { fail: "Something went wrong 😥 Please try again 🙏"});
        } else {
            res.render('index', { success: "You successfully confirmed order 🥰 Thank you for being with us 🎉" });
        }

    });
};


// dashboard update controller 
// dashboard controller
const dashboardUpdateCtrl = (req, res) => {
    // SELECT JSON_ARRAYAGG(JSON_OBJECT( 'id', `id`, 'food', `food`, 'name', `name`, 'phone', `phone`)) FROM food_order;
    db.query("SELECT * FROM food_orders", (error, results) => {
        if (error) {
            return res.json({});
        } else {
            return res.json(JSON.stringify(results));
        }
    })
};


module.exports = { orderCtrl, dashboardUpdateCtrl };