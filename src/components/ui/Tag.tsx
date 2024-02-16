type Props = {
  text: string;
};

export const Tag = (props: Props) => {
  return (
    <a href={`/search/${props.text}`} className="text-[#6E96A5] text-base">
      #{props.text}
    </a>
  );
};
