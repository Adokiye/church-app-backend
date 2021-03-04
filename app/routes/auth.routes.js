module.exports = (app) => {
    const auth = require("../controllers/auth.controller.js");
    let middleware = require("../helpers/middleware.js");
 
    // Registers a user
    app.post("/register", auth.validate('register'), auth.register);
  
  //  app.patch("/auth", middleware.checkToken, auth.updateProfile);
  
    app.post("/login", auth.login);
  };