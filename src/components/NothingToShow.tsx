interface NothingToShowProps {
  message: string;
}

export const NothingToShow = ({ message }: NothingToShowProps) => {
  return <div>{message}</div>;
};
