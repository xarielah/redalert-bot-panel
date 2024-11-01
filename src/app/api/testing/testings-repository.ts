import dbConnect from "@/database/db-connect";
import Testing, { TestingDocument } from "@/models/Testing";

export async function getPendingTestings() {
  await dbConnect();
  return Testing.find({ touched: false });
}

export async function getTestingById(id: string) {
  await dbConnect();
  return Testing.findById(id);
}

export async function touchTestAlert(id: string) {
  await dbConnect();
  return Testing.findByIdAndUpdate(id, { touched: true });
}

export async function getLastTestings() {
  await dbConnect();
  return Testing.find({}).sort({ createdAt: -1 }).limit(5);
}

export async function createNewTestAlert(
  payload: Pick<TestingDocument, "cities" | "isDrill" | "threat">
) {
  await dbConnect();
  return Testing.create({
    cities: payload.cities,
    isDrill: payload.isDrill,
    threat: payload.threat,
    notificationId: crypto.randomUUID(),
    time: Date.now(),
  });
}
