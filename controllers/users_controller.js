const User = require("../models/user");

// render the user profile Page
module.exports.profile = function (req, res) {
  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (user) {
        return res.render("user_profile", {
          title: "User Profile",
          user: user,
        });
      } else {
        return res.redirect("/users/sign-in");
      }
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};

// render the sign in Page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Sign UP",
  });
};

// render the sign up Page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Sign IN",
  });
};

// get the sign up Data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user while signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in Creating user while signing up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  // steps to authenticate

  // find the user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user while signing in");
      return;
    }
    // handle if the user is found
    if (user) {
      // handle passwords which don't match
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      // handle session creation
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      // hanle user not found
      return res.redirect("back");
    }
  });
};
