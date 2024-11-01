import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import RedirectClient from "./redirect-client";

export default function HomePage() {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <RedirectClient url="/logs" />
      </SignedIn>
    </>
  );
}
