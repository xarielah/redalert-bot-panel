import AuthControl from "@/components/auth-control";
import LastTestings from "./components/lastest-testings";
import NewTestOption from "./components/new-test-option";

export default function TestingPage() {
  return (
    <AuthControl>
      <section className="page-spacing">
        <h1 className="page-title">Alert Testings</h1>
        <hr />
        <section className="page-section-spacing">
          <h2 className="page-section-title">Test alert</h2>
          <NewTestOption />
        </section>
        <section className="page-section-spacing">
          <h2 className="page-section-title">Last Testings</h2>
          <LastTestings />
        </section>
      </section>
    </AuthControl>
  );
}
