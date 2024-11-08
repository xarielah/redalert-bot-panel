import AuthControl from "@/components/auth-control";
import CreateNewOptions from "./components/create-new-options";

export default function CreateNewTokenPage() {
  return (
    <AuthControl>
      <section className="page-spacing">
        <h1 className="page-title">API Tokens</h1>
        <hr />
        <section className="page-section-spacing">
          <h2 className="page-section-title">Create New Token</h2>
          <CreateNewOptions />
        </section>
      </section>
    </AuthControl>
  );
}
