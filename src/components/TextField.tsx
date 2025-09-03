import { ErrorMessage, Field } from "formik";

type Props = {
  label: string;
  name: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};
export const TextInput = ({ label, name, type, onChange, value }: Props) => {
  return (
    <div className="flex flex-col mb-3">
      <label className="text-[14px] font-bold" htmlFor={name}>
        {label}
      </label>
      <Field
        as="input"
        className="border border-gray-400 mt-2 outline-none rounded-md p-2"
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div className="text-red-500 mt-1 text-[12px]">{msg}</div>
        )}
      />
    </div>
  );
};
export const TextField = ({ label, name, type, onChange, value }: Props) => {
  return (
    <div className="flex flex-col mb-3">
      <label className="text-[14px] font-bold" htmlFor={name}>
        {label}
      </label>
      <Field
        as="textarea"
        onChange={onChange}
        value={value}
        className="border border-gray-400 mt-2 outline-none resize-none rounded-md p-2"
        rows={3}
        type={type}
        id={name}
        name={name}
      />
      <ErrorMessage
        name={name}
        render={(msg) => (
          <div className="text-red-500 mt-1 text-[12px]">{msg}</div>
        )}
      />
    </div>
  );
};
