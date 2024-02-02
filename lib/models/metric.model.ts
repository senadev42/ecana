import mongoose from "mongoose";

const singleEntrySchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  warehouseCode: { type: String, required: true },
  productionYear: { type: String, required: true },
  prevClose: { type: Number, required: true },
  close: { type: Number, required: true },
  change: { type: Number, required: true },
  high: { type: Number, required: true },
  low: { type: Number, required: true },
  volume: { type: Number, required: true },
});

const dailyRecordSchema = new mongoose.Schema(
  {
    recordID: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    date: { type: String, required: true },
    data: { type: [singleEntrySchema], required: true },
  },
  { timestamps: true }
);

const DailyRecord = mongoose.models.DailyRecord || mongoose.model("DailyRecord", dailyRecordSchema);

export default DailyRecord;
