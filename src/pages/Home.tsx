import { SmoothieCard } from "../components/smoothieCard";
import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
type Smoothie = {
  id: number;
  title: string;
  method: string;
  rating: number;
};
export const Home = () => {
  const [fetchErr, setFetchErr] = useState<string | null>(null);
  const [smoothies, setSmoothies] = useState<Smoothie[] | null>(null);
  const [orderBy, setOrderBy] = useState("created_at");
  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select("*")
        .order(orderBy, { ascending: false });
      if (error) {
        setFetchErr("Could not fetch the smoothies");
        console.log(error);
      }
      if (data) {
        setSmoothies(data);
        setFetchErr(null);
      }
    };

    fetchSmoothies();
  }, [orderBy]);
  const handleDelete = async (id: number) => {
    setSmoothies((prevState) => {
      return prevState
        ? prevState.filter((smoothie) => smoothie.id !== id)
        : null;
    });
  };
  return (
    <div className="bg-orange-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-[3%]">
        <div className="flex gap-4 items-center pt-6">
          <button
            onClick={() => setOrderBy("rating")}
            className="bg-orange-700 hover:bg-orange-900 cursor-pointer text-white px-4 py-2 rounded-md"
          >
            Order by Rating
          </button>
          <button
            onClick={() => setOrderBy("title")}
            className="bg-orange-700 hover:bg-orange-900 cursor-pointer text-white px-4 py-2 rounded-md"
          >
            Order by Title
          </button>
          <button
            onClick={() => setOrderBy("created_at")}
            className="bg-orange-700 hover:bg-orange-900 cursor-pointer text-white px-4 py-2 rounded-md"
          >
            Order by Time Created
          </button>
        </div>
        {fetchErr && <p className="text-red-500">{fetchErr}</p>}
        {smoothies && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            {smoothies.map((smoothie) => (
              <SmoothieCard
                key={smoothie.id}
                {...smoothie}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
