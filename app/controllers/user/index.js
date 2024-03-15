const uuidv4 = require('uuid').v4;
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const {hashPassword} = require("../../utils/bcrypt");


exports.getAll = async (req, res) => {
    return res.status(200).json({ msg: 'OK', users: await User.findAll()})
}

exports.create = async (req, res) => {
    // get body content of request
    const {email, password} = req.body
    try {
        const user = await User.create({
            email,
            password: hashPassword(password),
            token:uuidv4()
        })
        if (!user.id){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', user: user.dataValues})
        // return user.id ? res.status(200).json({ msg: 'OK', user}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.findOne = async (req, res) => {
    try {
        const { email } = req.body;
        const User = await User.findOne({ where: { email } });
        return res.status(200).json({ msg: 'OK', User})
    } catch (error) {
        res.status(401).send('Erreur serveur');
    }
}

exports.update = async (req, res) => {
    try {
        if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
        if (!req.body) return res.status(400).json({ msg: 'BAD REQUEST BODY IS REQUIRED'})
        const { email, password} = req.body
        const { uuid } = req.params
        const user = await User.update({
            email,
            password: hashPassword(password),
        }, {where: { id: uuid}})
        return res.status(200).json({ msg: 'OK', user: user})
        // return user.id ? res.status(200).json({ msg: 'OK', user}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.delete = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        const user = await User.destroy( {where: { id: uuid}})
        console.log(user)
        if (!user){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK'})
        // return user.id ? res.status(200).json({ msg: 'OK', user}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}


// exports.getById = (req, res) => {
//     const { uuid } = req.params

//     return res.status(200).json({ msg: 'OK', User: User.find(u => u.id === uuid)})
// }


exports.getById = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        const user = await User.findByPk(uuid)
        // const user = await userModel.findOne({where: {id: uuid}})
        // console.log(user.dataValues)
        if (!user){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }

        return res.status(200).json({ msg: 'OK', user: user.dataValues})
        // return user.id ? res.status(200).json({ msg: 'OK', user}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}