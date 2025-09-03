import { Form, Formik, type FormikValues } from "formik";
import * as Yup from "yup";
import { TextField, TextInput } from "../components/TextField";
import { Button } from "../components/Button";
import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

export const Create = () => {
  const formSchema = Yup.object().shape({
    title: Yup.string().required("Enter a title"),
    method: Yup.string().required("Enter a method"),
    rating: Yup.number().required("Enter a rating"),
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (values: FormikValues) => {
    console.log("Form submitted with values:", values);
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("smoothies").insert([
        {
          title: values.title,
          method: values.method,
          rating: values.rating,
        },
      ]);

      console.log("Supabase response:", { data, error });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      // Navigate regardless of data response, as insert might return empty data
      console.log("Navigating to home page...");
      navigate("/");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-orange-50 min-h-screen pt-6">
      <div className="max-w-[800px] mx-auto px-[3%]">
        <Formik
          validationSchema={formSchema}
          initialValues={{
            title: "",
            method: "",
            rating: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
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
                value={values.rating}
                name="rating"
                type="number"
              />
              <Button
                isLoading={isLoading}
                title="Create Smoothie Recipe"
                type="submit"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
