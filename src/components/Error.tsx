export const Error = ({
  error,
  message,
}: {
  error: string | null;
  message: string;
}) => {
  return (
    <div>{error ? <div style={{ color: "red" }}>{error}</div> : null}</div>
  );
};
