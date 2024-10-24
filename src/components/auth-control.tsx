import { SignedIn, SignedOut } from "@clerk/nextjs";
import PageNotFound from "./page-not-found";

interface IAuthControl {
  children: React.ReactNode;
}

export default function AuthControl({ children }: IAuthControl) {
  return (
    <>
      <SignedOut>
        <PageNotFound />
      </SignedOut>
      <SignedIn>{children}</SignedIn>
    </>
  );
}
