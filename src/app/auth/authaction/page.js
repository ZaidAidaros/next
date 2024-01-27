import ResetPasswordForm from "@/app/components/resetpasswordform";
import VerifyEmailPage from "@/app/components/verifyemail";
export default function Page({ searchParams }) {
  // const oobCode = useSearchParams().get("oobCode");
  // const mode = useSearchParams().get("mode");
  const { mode, oobCode } = searchParams;
  if (mode === "resetPassword") {
    return (
      <>
        <ResetPasswordForm oobCode={oobCode} />
      </>
    );
  }
  if (mode === "verifyEmail") {
    return (
      <>
        <VerifyEmailPage oobCode={oobCode} />
      </>
    );
  }
}
