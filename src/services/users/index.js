const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')

const saltRounds = 10

const signUp = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        const _user = await User.findOne({ email })
        if (_user) {
            return res.status(403).json({ message: 'User Already Exists!' })
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Password decryption error!'
                    })
                } else {
                    if (hash) {
                        const userModel = new User({
                            _id: mongoose.Types.ObjectId(),
                            userName,
                            email,
                            password: hash
                        })
                        await userModel.save()
                        const token = jwt.sign({ ...userModel.toJSON() }, process.env.JWT_SECRET_KEY, { expiresIn: "8h" })
                        res.status(200).json({
                            message: 'User Signed Up Successfully!',
                            token
                        })
                    } else {
                        return res.status(403).json({ message: 'Invalid Password!!' })
                    }
                }
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const _user = await User.findOne({ email })
        if (_user) {
            bcrypt.compare(password, _user.password, async (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Password decryption error!'
                    })
                } else {
                    if (result) {
                        const loginToken = jwt.sign({ ..._user.toJSON() }, process.env.JWT_SECRET_KEY, { expiresIn: "8h" })
                        res.status(200).json({
                            message: 'User Login Successfully!',
                            token: loginToken
                        })
                    } else {
                        return res.status(403).json({ message: 'Invalid Password!!' })
                    }
                }
            })
        } else {
            return res.status(404).json({
                message: 'No user found!!'
            })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    login, signUp
}