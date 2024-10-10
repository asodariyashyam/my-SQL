const db = require("../../config/db");

module.exports.admindetelproduct = (req, res) => {
  const productId = req.query.id;
  const deleteSql = "DELETE FROM product WHERE id = ?";

  db.query(deleteSql, [productId], function (error, result) {
    if (error) {
      console.error(error);
      return commonClass.reply(res, 500, true, "Database error");
    }
    return res.redirect("back");
  });
};

module.exports.sellerShowseller = (req, res) => {
  const rolename = "seller";

  const sql = "SELECT * FROM user WHERE role = ?";

  db.query(sql, [rolename], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Seller not found or not a seller" });
    }

    res.render("admin/sellerShowseller", { data:results });
  });
};

module.exports.buyerShowseller = (req, res) => {
    const rolename = "buyer";
  
    const sql = "SELECT * FROM user WHERE role = ?";
  
    db.query(sql, [rolename], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Database error" });
      }
  
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "Seller not found or not a seller" });
      }
  
      res.render("admin/buyerShowseller", { data:results });
    });
  };

  module.exports.adminShowseller = (req, res) => {
    const rolename = "admin";
  
    const sql = "SELECT * FROM user WHERE role = ?";
  
    db.query(sql, [rolename], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Database error" });
      }
  
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "Seller not found or not a seller" });
      }
  
      res.render("admin/adminShowseller", { data:results });
    });
  };

  module.exports.admindeteldata = (req, res) => {
    const productId = req.query.id;
    const deleteSql = "DELETE FROM user WHERE id = ?";
  
    db.query(deleteSql, [productId], function (error, result) {
      if (error) {
        console.error(error);
        return commonClass.reply(res, 500, true, "Database error");
      }
      return res.redirect("back");
    });
  };