import { Input } from "./input";
import { Label } from "./label";
import { useFormContext } from "react-hook-form";

interface CustomInputProps {
  label: string;
  id: string;
  name:string;
  type: string | undefined;
  register: any;
  rules: any;
  defaultValue: string
}

const CustomInput = ({ label, id, name, type, register, rules, defaultValue }: CustomInputProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input
        type={type ?? "text"}
        id={id}
        name={name}
        {...register(id, rules)}
        className="col-span-3"
        defaultValue={defaultValue || ''}
      />
      {errors[id] && (
        <span className="text-red-500 text-xs col-span-4 text-right mt-[-15px]">
          {errors[id].message}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
