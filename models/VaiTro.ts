import mongoose from "mongoose";

const VaiTroSchema = new mongoose.Schema(
  {
    tenVaiTro: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const VaiTro = mongoose.model("VaiTro", VaiTroSchema, "VaiTro");

export default VaiTro;
