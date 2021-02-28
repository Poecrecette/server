const express = require('express');
const router = express.Router();

// User Model
const User = require('../../models/User');


// @route   GET api/Users
// @desc    Get all Users
// @access  Public`
router.get('/', (req, res) => {
    User.find()
        .sort({ date: -1 })
        .then(users => res.json(users))
});

// @route   GET api/Users/user/id
// @desc    Get one Users
// @access  Public`
router.get('/user/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
});

// @route   GET api/Users/token/id
// @desc    Get one UserSession
// @access  Public`
router.get('/token/:id', (req, res) => {
    UserSession.findById(req.params.id)
        .then(user => res.json(user))
});

// @route   POST api/Users/signup
// @desc    Create An User
// @access  Public
router.post('/signup', (req, res, next) => {
    const { body } = req;
    const {
        nom,
        prenom,
        password
    } = body;
    let {
        email
    } = body;

    if (!nom) {
        return res.send({
            success: false,
            message: 'Error: nom cannot be blank.'
        });
    }

    if (!prenom) {
        return res.send({
            success: false,
            message: 'Error: prenom cannot be blank.'
        });
    }

    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }

    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exist.'
            });
        }

        // Save the new user
        const newUser = new User();
        newUser.nom = nom;
        newUser.prenom= prenom;
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                message: 'Signed up'
            });
        });
    });
});

// @route   POST api/Users/login
// @desc    Create An UserSession
// @access  Public
router.post('/login', (req, res, next) => {
    const { body } = req;
    const {
        password
    } = body;
    let {
        email
    } = body;
    if (!email) {
        return res.send({
            success: false,
            message: 'Error: Email cannot be blank.'
        });
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    email = email.toLowerCase();
    email = email.trim();
    User.find({
        email: email
    }, (err, users) => {
        if (err) {
            console.log('err 2:', err);
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid Email'
            });
        }
        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid Password'
            });
        }
        // Otherwise correct user
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: server error'
                });
            }
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id
            });
        });
    });
});

// @route   POST api/Users/verify
// @desc    Get all tokens
// @access  Public
router.get('/verify', (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // Verify the token is one of a kind and it's not deleted.
    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            console.log(err);
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        else {
            // DO ACTION
            return res.send({
                success: true,
                message: 'Good'
            });
        }
    });
});

// // @route   POST api/Users/logout
// // @desc    Updates isDeledted in users
// // @access  Public
// router.get('/logout', (req, res, next) => {
//     // Get the token
//     const { query } = req;
//     const { token } = query;
//     // ?token=test
//     // Verify the token is one of a kind and it's not deleted.
//     UserSession.findOneAndUpdate({
//         _id: token,
//         isDeleted: false
//     },
//         {
//             $set: {
//                 isDeleted: true
//             }
//         }, null, (err, sessions) => {
//             if (err) {
//                 console.log(err);
//                 return res.send({
//                     success: false,
//                     message: 'Error: Server error'
//                 });
//             }
//             return res.send({
//                 success: true,
//                 message: 'Good'
//             });
//         }
//     );
// });

// // @route   DELETE api/Users/id
// // @desc    Delete A User
// // @access  Public
// router.delete('/:id', (req, res) => {
//     User.findById(req.params.id)
//         .then(user => user.remove().then(() => res.json({ success: true })))
//         .catch(err => res.status(404).json({ success: false }));
// });

// // @route   DELETE api/Users/token/id
// // @desc    Delete A Token
// // @access  Public
// router.delete('/token/:id', (req, res) => {
//     UserSession.findById(req.params.id)
//         .then(user => user.remove().then(() => res.json({ success: true })))
//         .catch(err => res.status(404).json({ success: false }));
// });

module.exports = router;