import { FaStar, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
type Smoothie = {
  id: number;
  title: string;
  method: string;
  rating: number;
};

type SmoothieCardProps = Smoothie & {
  onDelete: (id: number) => void;
};

export const SmoothieCard = ({ onDelete, ...smoothie }: SmoothieCardProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/${smoothie.id}`);
  };

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("smoothies")
      .delete()
      .eq("id", smoothie.id)
      .select();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      onDelete(smoothie.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 relative">
      <div className="absolute top-3 right-3 flex gap-2">
        <button
          onClick={handleEdit}
          className="cursor-pointer p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          title="Edit smoothie"
        >
          <FaEdit className="text-[16px]" />
        </button>
        <button
          onClick={handleDelete}
          className="cursor-pointer p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Delete smoothie"
        >
          <FaTrash className="text-[13px]" />
        </button>
      </div>
      <h1 className="text-[18px] text-gray-700 font-bold">{smoothie.title}</h1>
      <p className="text-[14px] text-gray-500">{smoothie.method}</p>
      <div className="flex items-center gap-1 mt-2">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`text-[14px] ${
              index < smoothie.rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-[14px] text-gray-500 ml-1">
          ({smoothie.rating})
        </span>
      </div>
    </div>
  );
};
