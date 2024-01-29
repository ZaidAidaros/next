import ResetPasswordForm from "@/app/components/resetpasswordform";
import VerifyEmailPage from "@/app/components/verifyemail";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function Page({ searchParams }) {
  const { mode, oobCode } = searchParams;
  if (mode === "resetPassword") {
    return (
      <div>
        <ResetPasswordForm oobCode={oobCode} />
      </div>
    );
  }
  if (mode === "verifyEmail") {
    return (
      <div>
        <VerifyEmailPage oobCode={oobCode} />
      </div>
    );
  }
  return <div>Unknown Action Error..</div>;
}
