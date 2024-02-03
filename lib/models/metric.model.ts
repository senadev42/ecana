import mongoose from "mongoose";

const singleEntrySchema = new mongoose.Schema({
  symbol: { type: String },
  warehouseCode: { type: String },
  productionYear: { type: String },
  prevClose: { type: Number },
  close: { type: Number },
  change: { type: Number },
  high: { type: Number },
  low: { type: Number },
  volume: { type: Number },
});

const dailyRecordSchema = new mongoose.Schema(
  {
    recordID: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    date: { type: String, required: true },
    data: { type: [singleEntrySchema], require: true },
  },
  { timestamps: true }
);

const DailyRecord =
  mongoose.models.DailyRecord ||
  mongoose.model("DailyRecord", dailyRecordSchema);

export default DailyRecord;
