/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { IInput } from "@/types";
import { Textarea } from "../ui/textarea";

interface IProps extends IInput {
  type?: string;
  descriptions?: string;
  value?: string; // ✅ for controlled usage
  onChange?: (e: any) => void; // ✅ for controlled usage
}

export default function DTextArea({
  name,
  label,
  variant = "bordered",
  descriptions,
  value,
  onChange,
}: IProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  useEffect(() => {
    if (descriptions !== undefined) {
      setValue(name, descriptions);
    }
  }, [descriptions, name, setValue]);

  const currentValue = useWatch({ name });

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}

      <Textarea
        rows={8}
        id={name}
        {...(onChange
          ? { value: value ?? "", onChange } // ✅ controlled
          : register(name))} // ✅ react-hook-form mode
        value={onChange ? value ?? "" : currentValue || descriptions || ""}
        className={`${
          variant === "bordered" ? "border rounded-md" : ""
        } w-full px-3 py-2 text-sm`}
      />

      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
