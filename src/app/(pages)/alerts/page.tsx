import AuthControl from "@/app/(components)/auth-control";
import HeadingOptions from "./components/headings-options";

export default function AlertsPage() {
  return (
    <AuthControl>
      <section className="page-spacing">
        <h1 className="page-title">Alerts Settings</h1>
        <hr />
        <section className="page-section-spacing">
          <h2 className="page-section-title">Headings</h2>
          <HeadingOptions />
        </section>
      </section>
    </AuthControl>
  );
}
