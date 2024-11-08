import AuthControl from "@/components/auth-control";
import LastTestings from "./components/lastest-testings";
import NewTestOption from "./components/new-test-option";
import PendingTestings from "./components/pending-testings";

export default function TestingPage() {
  return (
    <AuthControl>
      <section className="page-spacing">
        <h1 className="page-title">Alert Testings</h1>
        <hr />
        <section className="page-section-spacing">
          <div className="space-y-1">
            <h2 className="page-section-title">Emit an Alert</h2>
            <p className="text-gray-700">
              Emit a test alert to the whatsapp bot. Notification will be shown
              with a testing header to distinc testing notification than real
              ones.
            </p>
          </div>
          <NewTestOption />
        </section>
        <section className="page-section-spacing">
          <h2 className="page-section-title">Pending Testings</h2>
          <PendingTestings />
        </section>
        <section className="page-section-spacing">
          <h2 className="page-section-title">Last 5 Processed Testings</h2>
          <LastTestings />
        </section>
      </section>
    </AuthControl>
  );
}
