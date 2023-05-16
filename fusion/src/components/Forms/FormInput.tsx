import { type ChangeEvent, useEffect, useId, useState } from "react";
import { type UseFormTrigger, type UseFormRegister } from "react-hook-form";
import { type FormData } from "./LoginForm";
import useDebounce from "../../hooks/useDebounce";

interface InputFormProps {
	labelText: string;
	register: ReturnType<UseFormRegister<FormData>>;
	trigger: ReturnType<UseFormTrigger<FormData>>;
}

export const FormInput = ({ labelText, register, trigger }: InputFormProps) => {
	const id = useId();
	const [value, setValue] = useState<string>("");
	const debouncedValue = useDebounce<string>(value, 500);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	useEffect(() => {
		async () => {
			await trigger;
		};
	}, [debouncedValue]);
	return (
		<>
			<label htmlFor={id}>{labelText}</label>
			<input
				className="bg-slate-600"
				id={id}
				{...register}
				onChange={handleChange}
			/>
		</>
	);
};
