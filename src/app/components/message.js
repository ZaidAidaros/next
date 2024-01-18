export default function Message({ msg, err = false }) {
  return (
    <div>
      <h1 className={err ? "text-red-400" : "text-green-500"}>{msg}</h1>
    </div>
  );
}
