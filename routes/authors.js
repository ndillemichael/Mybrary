const express = require("express");
const router = express.Router();
const Author = require("../models/author");

//All Authors Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name !== null && req.query.name !== " ") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});
//New Authors Route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});
//Create Authors Route

router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    // On success, redirect to the authors page.
    res.redirect("/authors"); ///${savedAuthor.id}
  } catch (err) {
    // On error, re-render the "new author" page with an error message.
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    });
  }
});

// router.post("/", async (req, res) => {
//   const author = new Author({
//     name: req.body.name,
//   });
//   const savedAuthor = await author.save((err, newAuthor) => {
//     if (err) {
//       res.render("authors/new", {
//         author: author,
//         errorMessage: "Error creating author",
//       });
//     } else {
//       res.redirect("authors");
//     }
//   });
//    res.send(req.body.name);
// });

module.exports = router;
