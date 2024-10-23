import { RedirectToSignIn, SignedOut } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  );
}
