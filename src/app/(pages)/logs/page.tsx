import AuthControl from "@/components/auth-control";

export default function LogsPage() {
  return (
    <AuthControl>
      <section className="page-spacing">
        <h1 className="page-title">Logs</h1>
        <h4 className="font-bold text-2xl">TODO:</h4>
        <ol className="list-decimal list-inside">
          <li>Polling mechanism to draw bot logs from database</li>
          <li>Display them prettly</li>
        </ol>
        <hr />
      </section>
    </AuthControl>
  );
}
