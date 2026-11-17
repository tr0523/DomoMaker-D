const models = require('../models');
const Domo = models.Domo;

const statsPage = async (req,res) => {
    return res.render('statistics');
};

const getDomos = async (req,res) => {
    try{
        const query = {owner: req.session.account._id};
        const docs = await Domo.find(query).select('name age rank').lean().exec();
        
        return res.json({domos: docs});
    } catch(err){
        console.log(err);
        return res.status(500).json({error: 'Error retrieving domos!'});
    }
};

module.exports = {
    statsPage,
    getDomos,
};