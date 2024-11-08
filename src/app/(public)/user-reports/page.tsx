import ReportsContainer from "./components/reports-container";

export default function UserReports() {
  return (
    <section className="page-spacing">
      <h1 className="page-title">User Reports</h1>
      <p>Enhancements, bugs, etc...</p>
      <hr />
      <section className="page-section-spacing">
        <ReportsContainer />
      </section>
    </section>
  );
}
