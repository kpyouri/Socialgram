const express = require('express');
const router = express.Router();
const passport = require('passport');
//Load profile model
const Profile = require('../../models/Profile');
//Load user model
const User = require('../../models/User');
// Load Validation
const validateProfileInput = require('../../validation/profile');


// @route GET api/profile
// @desc Get current user profile
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}), 
  (req, res) => {
    let errors = {};
    Profile.findOne({user: req.user.id})
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(400).json(err));
  }
)

// @route POST api/profile
// @desc create or edit profile
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const {errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
    }

    //Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.gender) profileFields.gender = req.body.gender;

    //Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile.findOne({user: req.user.id})
      .then(profile => {
        if (profile) {
          //Update
          Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFields},
            {new: true}
          ).then(profile => res.json(profile));
        } else {
          // Create

          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle})
            .then(profile => {
              if (profile){
                errors.handle = 'That handle already exists';
                return res.status(400).json(errors);
              }

              //Save profile
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            })
        }
      })
  }
)

// @route GET api/profile/all
// @desc get all profiles
// @access Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if(!profiles) {
        errors.nonprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }

      return res.json(profiles);
    })
    .catch(err => res.status(404).json({profile: 'There are no profiles'}));
})

// @route GET api/profile/handle/:handle
// @desc get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.nonprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

// @route GET api/profile/user/:user_id
// @desc get profile by user_id
// @access Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if(!profile) {
        errors.nonprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }

      return res.json(profile);
    })
    .catch(err => res.status(404).json(err));
})

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;