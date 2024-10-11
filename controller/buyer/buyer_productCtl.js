const { LONG } = require("mysql/lib/protocol/constants/types");
const db = require("../../config/db");
const commonClass = require("../../utils/common");

module.exports.getallproduct = (req, res) => {
  try {
    if (req.cookies.token == undefined) {
      return res.redirect("/api/signIn");
    }
    const sql = "SELECT * FROM product";
    db.query(sql, function (error, results) {
      if (error) {
        console.error(error);
        return commonClass.reply(res, 500, true, "Database error");
      }

      const countSql = "SELECT COUNT(*) AS total_count FROM product";
      db.query(countSql, function (countError, countResult) {
        if (countError) {
          console.error(countError);
          return commonClass.reply(res, 500, true, "Database error");
        }

        const totalCount = countResult[0].total_count;
        return res.render("buyer/allproduct", {
          total_data: totalCount,
          data: results,
        });
        // return commonClass.reply(
        //   res,
        //   200,
        //   false,
        //   "Products fetched successfully!",
        //   {
        //     total_data: totalCount,
        //     data: results,
        //   }
        // );
      });
    });
  } catch (error) {
    console.error("Internal server error: ", error);
    return commonClass.reply(res, 500, true, "Internal server error");
  }
};

module.exports.addproduct = (req, res) => {
  if (req.cookies.token == undefined) {
    return res.redirect("/api/signIn");
  }

  const sql = "SELECT * FROM product WHERE id = ?";

  db.query(sql, [req.query.id], function (error, results) {
    if (error) {
      console.error(error);
      return commonClass.reply(res, 500, true, "Database error");
    }
    return res.render("buyer/addtocard", {
      data: results[0],
    });
  });
};

module.exports.quantity = (req, res) => {
  const productId = req.query.id;
  const userId = req.user.id;
  const quantity = req.body.quantity;

  const insertSql =
    "INSERT INTO cart(userId, productId, quantity) VALUES(?, ?, ?)";
  db.query(insertSql, [userId, productId, quantity], function (error) {
    if (error) {
      console.error(error);
      return;
    }

    const updateStockSql = `
      UPDATE product 
      SET stock = stock - ? 
      WHERE id = ? AND stock >= ?`;

    db.query(updateStockSql, [quantity, productId, quantity], function (error) {
      if (error) {
        console.error(error);
        return commonClass.reply(
          res,
          500,
          true,
          "Database error while updating stock"
        );
      }

      return res.redirect("/");
    });
  });
};

module.exports.buyer_product = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      c.id AS id,
      c.quantity As  quantity,
      p.id AS productId, 
      p.product_name, 
      p.price, 
      p.stock, 
      p.description 
    FROM 
      cart c 
    JOIN 
      product p ON c.productId = p.id 
    WHERE 
      c.userId = ?
  `;

  db.query(sql, [userId], function (error, results) {
    if (error) {
      console.error(error);
      return commonClass.reply(res, 500, true, "Database error");
    }
    return res.render("buyer/buyer_product", { data: results });
  });
};

module.exports.removecart = (req, res) => {
  const cartId = req.query.id;

  const selectSql = "SELECT productId, quantity FROM cart WHERE id = ?";
  db.query(selectSql, [cartId], (error, results) => {
    if (error) {
      console.error(error);
      return commonClass.reply(res, 500, true, "Database error");
    }

    if (results.length === 0) {
      return commonClass.reply(res, 404, true, "Cart item not found");
    }

    const { productId, quantity } = results[0];

    const deleteSql = "DELETE FROM cart WHERE id = ?";
    db.query(deleteSql, [cartId], (deleteError, deleteResult) => {
      if (deleteError) {
        console.error(deleteError);
        return commonClass.reply(res, 500, true, "Database error");
      }
      const updateStockSql = "UPDATE product SET stock = stock + ? WHERE id = ?";
      db.query(updateStockSql, [quantity, productId], (updateError, updateResult) => {
        if (updateError) {
          console.error(updateError);
          return commonClass.reply(res, 500, true, "Database error");
        }

        return res.redirect("/buyer_product");
      });
    });
  });
};
