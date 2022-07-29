// render the user profile Page
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "User Profile",
  });
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
