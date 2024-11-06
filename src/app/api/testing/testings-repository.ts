import { NewTestingPayload } from "@/app/(pages)/testing/components/new-test-option";
import dbConnect from "@/database/db-connect";
import Testing, { TestingDocument } from "@/models/Testing";

export async function getPendingTestings() {
  await dbConnect();
  return Testing.find({ touched: false }).sort({ createdAt: -1 });
}

export async function deleteTestById(id: string) {
  await dbConnect();
  return Testing.findByIdAndDelete(id);
}

export async function getTestingById(
  id: string
): Promise<TestingDocument | null> {
  await dbConnect();
  return Testing.findById(id);
}

// This one expects a NOTIFICATION ID value, not a MONGODB OBJECTID
export async function processTestAlert(id: string) {
  await dbConnect();
  return Testing.findOneAndUpdate({ notificationId: id }, { touched: true });
}

export async function touchTestAlert(id: string) {
  await dbConnect();
  return Testing.findByIdAndUpdate(id, { touched: true });
}

// All successful ones
export async function getLastTestings() {
  await dbConnect();
  return Testing.find({ touched: true }).sort({ createdAt: -1 }).limit(5);
}

export type CreateMultipleTests = Omit<NewTestingPayload, "testId"> &
  Pick<TestingDocument, "time" | "notificationId">;

export async function createNewTestAlerts(
  payload: CreateMultipleTests[]
): Promise<TestingDocument[]> {
  await dbConnect();
  return Testing.insertMany(payload);
}
