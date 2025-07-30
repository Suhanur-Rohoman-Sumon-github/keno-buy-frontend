import React from "react";
import { useFormContext } from "react-hook-form";
import { GoEye, GoEyeClosed } from "react-icons/go";

interface IProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type: string;
  label: string;
  name: string;
  islogin?: boolean;
  fullWidth?: boolean;
}

const DInput = ({
  required = false,
  type = "text",
  label,
  name,
  islogin = false,
  fullWidth = false,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message?.toString() || "";
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className={`w-full ${fullWidth ? "w-full" : ""} space-y-1`}>
      {/* Label */}
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>

      {/* Input wrapper */}
      <div className="relative">
        <input
          {...register(name)}
          id={name}
          className={`block w-full px-4 py-2 text-sm border rounded-md ${
            errors[name]
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }`}
          type={islogin && isVisible ? "text" : type}
          placeholder={islogin ? "Enter your password" : ""}
        />

        {/* Password visibility toggle */}
        {islogin && (
          <button
            type="button"
            aria-label={isVisible ? "Hide password" : "Show password"}
            onClick={toggleVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 focus:outline-none"
          >
            {isVisible ? <GoEye /> : <GoEyeClosed />}
          </button>
        )}
      </div>

      {/* Error message */}
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};

export default DInput;
