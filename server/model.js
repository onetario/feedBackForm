const mongoose = require("mongoose");
const schema = mongoose.Schema;

const formSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const form = mongoose.model("FormData", formSchema);
module.exports = form;
