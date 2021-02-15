module.exports = (app) => {
    const user = require("../controllers/users.js");
    let middleware = require("../helpers/middleware.js");
    // Create a new Note
    app.post("/user", user.create);
  
    app.patch("/user", middleware.checkToken, user.updateProfile);
  
    app.post("/login", user.login);
  
    app.post("/advertise", user.advert);
  
    // Retrieve all Users -superadmin
    app.get("/users", middleware.checkToken, user.findAll);
  
    // Change password
    app.post("/change-password", middleware.checkToken, user.changePassword);
  
    // Retrieve user data based on token
    app.get("/me", middleware.checkToken, user.me);
  
    // Retrieve a single user with user_id
    app.get("/users/:user_id", middleware.checkToken, user.findOne);
  };