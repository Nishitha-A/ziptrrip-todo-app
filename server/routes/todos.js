const express = require("express");
const router = express.Router();

const Todo = require("../models/Todo");


// CREATE TODO
router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET ALL TODOS
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({
      createdAt: -1,
    });

    res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET SINGLE TODO
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// UPDATE TODO
router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE TODO
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(
      req.params.id
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


module.exports = router;