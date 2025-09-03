import { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { Button } from "../components/Button";
import { TextField, TextInput } from "../components/TextField";
import { Formik } from "formik";
import * as Yup from "yup";

type Smoothie = {
  title: string;
  method: string;
  rating: number;
};

export const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formSchema = Yup.object().shape({
    title: Yup.string().required("Enter a title"),
    method: Yup.string().required("Enter a method"),
    rating: Yup.number().required("Enter a rating"),
  });
  const [smoothie, setSmoothie] = useState<Smoothie | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching smoothie:", error);
        navigate("/", { replace: true });
      }
      if (data) {
        console.log("Smoothie data:", data);
        setSmoothie(data);
      }
    };
    fetchSmoothie();
  }, [navigate, id]);

  const handleUpdate = async (values: Smoothie) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("smoothies")
      .update({
        title: values.title,
        method: values.method,
        rating: values.rating,
      })
      .eq("id", id)
      .select();
    if (error) {
      console.error("Error updating smoothie:", error);
    }
    if (data) {
      console.log("Smoothie updated:", data);
      navigate("/");
    }
    setIsLoading(false);
  };

  // Don't render the form until we have the smoothie data
  if (!smoothie) {
    return (
      <div className="bg-orange-50 min-h-screen pt-6">
        <div className="max-w-[800px] mx-auto px-[3%]">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen pt-6">
      <div className="max-w-[800px] mx-auto px-[3%]">
        <Formik
          validationSchema={formSchema}
          initialValues={{
            title: smoothie.title,
            method: smoothie.method,
            rating: smoothie.rating,
          }}
          onSubmit={handleUpdate}
        >
          {({ values, handleChange, handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <TextInput
                label="Title"
                onChange={handleChange("title")}
                value={values.title}
                name="title"
                type="text"
              />
              <TextField
                label="Method"
                onChange={handleChange("method")}
                value={values.method}
                name="method"
                type="text"
              />
              <TextInput
                label="Rating"
                onChange={handleChange("rating")}
                value={values.rating.toString()}
                name="rating"
                type="number"
              />
              <Button
                isLoading={isLoading || isSubmitting}
                title="Update Smoothie Recipe"
                type="submit"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
