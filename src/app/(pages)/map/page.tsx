import AuthControl from "@/components/auth-control";
import ColoringOptions from "./components/coloring-options";
import TimingOptions from "./components/timing-options";

export default function MapPage() {
  return (
    <AuthControl>
      <section className="page-spacing">
        <h1 className="page-title">Map Settings</h1>
        <hr />
        <section className="page-section-spacing">
          <h2 className="page-section-title">Timing</h2>
          <TimingOptions />
        </section>
        <section className="page-section-spacing">
          <h2 className="page-section-title">Coloring</h2>
          <ColoringOptions />
        </section>
      </section>
    </AuthControl>
  );
}
