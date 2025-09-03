type Props = {
  title: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  isLoading?: boolean;
};
export const Button = ({ title, type, onClick, isLoading }: Props) => {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-orange-800 text-white p-3 w-full font-medium text-[14px] cursor-pointer rounded-md"
        type={type}
      >
        {isLoading ? <span className="ml-2">Adding...</span> : title}
      </button>
    </>
  );
};
