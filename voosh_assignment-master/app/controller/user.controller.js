const userServices = require("../services/user.services.js");

exports.register = (req, res, next) => {
  // #swagger.tags = ['User Authentication']

  /*  
  #swagger.description="One can register as admin or user."
  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/User"
                    }  
                }
            }
        } 
 
        #swagger.responses[201] = {
            description:"User created",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userRegistered"
                    }  
                }
            }
        } 
    
        #swagger.responses[400] = {
            description:"User already exist",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/alreadyRegistered"
                    }  
                }
            }
        } 
  */
  const { body: userDetails } = req;
  userServices
    .register(userDetails)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
};

exports.authenticate = (req, res, next) => {
  // #swagger.tags = ['User Authentication']
  /* 
  #swagger.description="Both users and admins can be authenticated."
  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userLogin"
                    }  
                }
            }
        } 
 
        #swagger.responses[200] = {
            description:"Login successful.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/loginSuccess"
                    }  
                }
            }
        } 
  
        #swagger.responses[400] = {
            description:"Invalid Credentials.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/invalidCredentials"
                    }  
                }
            }
        } 
  */
  const { body: userDetails } = req;
  userServices
    .authenticate(userDetails)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};

exports.OAuth = (req, res, next) => {
  userServices
    .OAuth()
    .then((data) => res.redirect(data))
    .catch((err) => next(err));
};

exports.signOut = (req, res, next) => {
  // #swagger.tags = ['User Authentication']
  /*
    #swagger.description="Admins and users can sign out."
        #swagger.responses[200] = {
            description:"Successful sign out",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/logout"
                    }  
                }
            }
        }
        #swagger.responses[400] = {
            description:"User not registered.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userNotRegistered"
                    }  
                }
            }
        } 
  */
  userServices
    .signOut(req.query.email)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};

exports.getProfileDetails = (req, res, next) => {
  /*
        #swagger.tags = ['Profile details']
        #swagger.description="Admins and users can see their profile details like email, contact, profile pic, bio etc."
        #swagger.responses[200] = {
            description:"Profile fetched successfully.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userDetails"
                    }  
                }
            }
        }
        #swagger.responses[400] = {
            description:"User not registered.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userNotRegistered"
                    }  
                }
            }
        } 
  */
  userServices
    .getProfileDetails(req.query.email)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};

exports.updateProfile = (req, res, next) => {
  /*  #swagger.tags=["Update Profile"]
    #swagger.description="Admins and users can update their profile details like making their account private/public or changing username, password, email, phone, bio, profile pic etc."
    #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/profileUpdateBody"
                    }  
                }
            }
        } 
    #swagger.responses[200] = {
            description:"Profile updated successfully.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userDetails"
                    }  
                }
            }
        }
  */
  userServices
    .updateProfile(req.body)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};

exports.getUsers = (req, res, next) => {
  /*
        #swagger.tags = ['Profile details']
        #swagger.description="Admins can see both private and public user details where as normal users can see only public account details."
        #swagger.responses[200] = {
            description:"Profile fetched successfully.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userList"
                    }  
                }
            }
        }
        #swagger.responses[400] = {
            description:"User not registered.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userNotRegistered"
                    }  
                }
            }
        } 
  */
  userServices
    .getUsers(req.query.email)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};
