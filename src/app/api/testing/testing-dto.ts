import { TestingDocument } from "@/models/Testing";

export function testingDto(test: TestingDocument) {
  return {
    id: test._id,
    cities: test.cities,
    isDrill: test.isDrill,
    threat: test.threat,
    touched: test.touched,
    notificationId: test.notificationId,
    time: test.time,
    createdAt: test.createdAt,
    updatedAt: test.updatedAt,
  };
}
