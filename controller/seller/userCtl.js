const db = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const commonClass = require("../../utils/common");

module.exports.signup = (req, res) => {
    res.render("user/signup"); 
};


module.exports.signUp = async (req, res) => {
  try {
    const email = req.body.email;
    let password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const role = req.body.role;

    if (password === confirm_password) {
      password = await bcrypt.hash(password, 10);

      const sql = "INSERT INTO user (email, password, role) VALUES (?, ?, ?)";
      db.query(sql, [email, password, role], function (error, result) {
        if (error) {
          return commonClass.reply(res, 500, true, "Error during signup");
        } else {
          const data = { id: result.insertId, email: email, role: role };
          return res.redirect('/api/signIn')

        //   return commonClass.reply(
        //     res,
        //     200,
        //     false,
        //     "Sign up successfully !!",
        //     data
        //   );
        }
      });
    } else {
      return commonClass.reply(
        res,
        400,
        true,
        "Password and confirm password do not match"
      );
    }
  } catch (error) {
    console.error(error);
    return commonClass.reply(res, 500, true, "Internal server error");
  }
};

module.exports.signIn = (req, res) => {
  res.render("user/signin");
};

module.exports.singIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM user WHERE email = ?";

    db.query(sql, [email], async function (error, result) {
      if (error) {
        console.error(error);
        return commonClass.reply(res, 500, true, "Database error");
      }

      if (result.length === 0) {
        return commonClass.reply(res, 401, true, "User not found");
      }

      const user = result[0];

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return commonClass.reply(res, 401, true, "Invalid password");
      }
      const cookieData = {email, role:user.role}

      res.cookie("cookieData", cookieData, {
        httpOnly: true,
        maxAge: 600 * 60 * 100,
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        "userToken"
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 600 * 60 * 100,
      });
      const data = token;
      if(user.role ==="Buyer"){
        return res.redirect('/')
      }else{
        return res.redirect('/api/product/fetchedata')
      }
   
    });
  } catch (error) {
    console.error("Internal server error: ", error);
    return commonClass.reply(res, 500, true, "Internal server error");
  }
};

module.exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const userId = req.user.id;

    if (newPassword !== confirmNewPassword) {
      return commonClass.reply(
        res,
        400,
        true,
        "New password and New confirm passwosg is not mach"
      );
    }

    const sqlSelect = "SELECT * FROM user WHERE id = ?";
    db.query(sqlSelect, [userId], async (error, result) => {
      if (error) {
        console.error(error);
        return commonClass.reply(res, 500, true, "Database error");
      }

      if (result.length === 0) {
        return commonClass.reply(res, 401, true, "User not found");
      }
      const user = result[0];

      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isPasswordValid) {
        return commonClass.reply(res, 401, true, "Current password is rong");
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      const sqlUpdate = "UPDATE user SET password = ? WHERE id = ?";
      db.query(sqlUpdate, [hashedNewPassword, userId], (error, result) => {
        if (error) {
          console.error(error);
          return commonClass.reply(res, 500, true, "Error updating password");
        }
        return commonClass.reply(
          res,
          200,
          false,
          "Password updated successfully"
        );
      });
    });
  } catch (error) {
    console.error("Internal server error: ", error);
    return commonClass.reply(res, 500, true, "Internal server error");
  }
};

module.exports.signout = async (req, res) => {
  res.clearCookie("token");

  return res.redirect('/api/signIn')
//   return commonClass.reply(res, 200, false, "Successfully signed out");
};

module.exports.profile = async (req, res) => {
  try {
    const userId = req.user.id;
    const username = req.body.username;

    let img = null;

    if (req.file) {
      img = req.file.path;
    }

    const sqlSelect = "SELECT * FROM user WHERE id = ?";
    db.query(sqlSelect, [userId], (error, result) => {
      if (error) {
        console.error(error);
        return commonClass.reply(res, 500, true, "Database error");
      }

      if (result.length > 0) {
        const sqlUpdate = "UPDATE user SET img = ?, username = ? WHERE Id = ?";
        db.query(sqlUpdate, [img, username, userId], (error, result) => {
          if (error) {
            console.error("Database update error: ", error);
            return commonClass.reply(res, 500, true, "Error updating profile");
          }

          const data = { userId, username, img };
          return commonClass.reply(
            res,
            200,
            true,
            "Profile updated successfully!",
            data
          );
        });
      }
    });
  } catch (error) {
    console.error("Internal server error: ", error);
    return commonClass.reply(res, 500, true, "Internal server error");
  }
};
