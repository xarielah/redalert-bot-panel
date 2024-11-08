import NewReport from "./components/new-report";

export default function NewReportsPage() {
  return (
    <section className="page-spacing">
      <h1 className="page-title">User Reports</h1>
      <p>Enhancements, bugs, etc...</p>
      <hr />
      <section className="page-section-spacing">
        <h2 className="page-section-title">Submit a Report</h2>
        <NewReport />
      </section>
    </section>
  );
}
