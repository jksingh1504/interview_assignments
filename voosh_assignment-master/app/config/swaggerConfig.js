const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "Voosh Enhanced Authentication API",
    description:
      "These set of APIs provide endpoints for managing administrator and user details for authorization and authentication purposes.\n\n**Features include:**\n- **Register new Admin/User**: One can register as admin or user.\n- **Authenticate**: Both users and admins can be authenticated.\n- **Sign out**: Admins and users can sign out.\n- **Profile Details**: Admins and users can see their profile details like email, contact, profile pic, bio etc.\n- **User List**: Admins can see both private and public user details where as normal users can see only public account details.\n- **Update profile details**: Admins and users can update their profile details like making their account private/public or changing username, password, email, phone, bio, profile pic etc. \n\n\n**Contact Information**:\n- **Name:** Jyoti Kamal Singh\n- **Email:** [jyotikamal.official@gmail.com](mailto:jyotikamal.official@gmail.com)\n- **Phone:** [7354440856](tel:7354440856)\n- **Designation:** Software Developer\n- **Portfolio:** [https://jyoti-kamal.netlify.app/](https://jyoti-kamal.netlify.app/)",
  },
  servers: [
    {
      url: "https://voosh-assignment-s2ko.onrender.com",
      description: "Deployed server url",
    },
    {
      url: "http://localhost:5000",
      description: "Local server",
    },
  ],
  tags: [
    {
      name: "User Authentication",
      description:
        "Admins and users can register and login/authenticate their account",
    },
    {
      name: "Profile details",
      description:
        "Admins and users can check their and other users profile details",
    },
    {
      name: "Update Profile",
      description:
        "Admins and users can update their profile details. Like making their account public/private change their userName, password, photo, phone, email ect",
    },
  ],
  components: {
    schemas: {
      User: {
        $userName: "John Doe",
        $email: "john.doe@voosh.com",
        $password: "John@voosh",
        $phone: 7354441234,
        $bio: "This is a short description about myself",
        $photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ngU1GxK9VdwXCRVuxzISotU9_hBfHaLDYA9wevgXtuSqbhWiWRlrLE733g&s",
        $isAdmin: false,
        $loginType: "voosh",
        $isAccountPrivate: true,
      },
      userRegistered: {
        message: "new user registered successfuly.",
        user: {
          userName: "John Doe",
          email: "john.doe@voosh.com",
          phone: 7354441234,
          bio: "This is a short description about myself",
          photo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ngU1GxK9VdwXCRVuxzISotU9_hBfHaLDYA9wevgXtuSqbhWiWRlrLE733g&s",
          isAdmin: false,
          loginType: "voosh",
          isAccountPrivate: false,
          isLogin: true,
        },
      },
      alreadyRegistered: {
        message: "User already registered.",
        error: true,
      },
      userDetails: {
        userName: "John Doe",
        email: "john.doe@voosh.com",
        phone: 7354441234,
        bio: "This is a short description about myself",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ngU1GxK9VdwXCRVuxzISotU9_hBfHaLDYA9wevgXtuSqbhWiWRlrLE733g&s",
        isAdmin: false,
        loginType: "voosh",
        isAccountPrivate: false,
        isLogin: true,
      },
      userLogin: { $email: "john.doe@voosh.com", $password: "John@voosh" },
      loginSuccess: {
        message: "login successful.",
        user: {
          userName: "John Doe",
          email: "john.doe@voosh.com",
          phone: 7354441234,
          bio: "This is a short description about myself",
          photo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ngU1GxK9VdwXCRVuxzISotU9_hBfHaLDYA9wevgXtuSqbhWiWRlrLE733g&s",
          isAdmin: false,
          loginType: "voosh",
          isAccountPrivate: false,
          isLogin: true,
        },
      },
      invalidCredentials: {
        message: "Invalid user credentials.",
        error: true,
      },
      userNotRegistered: { message: "User not registered." },
      logout: { message: "You have been signed out successfully." },
      profileUpdateBody: {
        $email: "john.doe@voosh.com",
        updateParams: {
          $isAccountPrivate: true,
          $bio: "add your updated new bio here",
          $photo: "add new profile pic link here",
          $userName: "add new username here",
          $phone: 7632198042,
          $email: "add new email here",
        },
      },
      profileUpdateSuccess: {
        message: "profile details updated successfully.",
        user: {
          userName: "John Doe",
          email: "john.doe@voosh.com",
          phone: 7354441234,
          bio: "This is a short description about myself",
          photo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ngU1GxK9VdwXCRVuxzISotU9_hBfHaLDYA9wevgXtuSqbhWiWRlrLE733g&s",
          isAdmin: false,
          loginType: "voosh",
          isAccountPrivate: false,
          isLogin: true,
        },
      },
      userList: [{ type: "object", $ref: "#/components/schemas/userDetails" }],
    },
  },
};

const outputFile = "../../swaggerSpec.json";
const routes = ["index.js"];

swaggerAutogen(outputFile, routes, doc);
