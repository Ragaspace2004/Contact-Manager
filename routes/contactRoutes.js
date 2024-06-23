const express = require('express');
const router = express.Router();
const {
  getContact,
  getContactById,
  updateContact,
  deleteContact,
  postContact
} = require("../controllers/contactController");

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/")
  .get(getContact)
  .post(postContact);

router.route("/:id")
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
