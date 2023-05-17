import { type ChangeEvent, useEffect, useId, useState } from "react";
import { type UseFormTrigger, type UseFormRegister } from "react-hook-form";
import { type FormData } from "./LoginForm";
import useDebounce from "../../hooks/useDebounce";

interface InputFormProps {
	labelText: string;
	register: UseFormRegister<FormData>;
	trigger: UseFormTrigger<FormData>;
	field: keyof FormData;
}

export const FormInput = ({
	labelText,
	register,
	trigger,
	field,
}: InputFormProps) => {
	const id = useId();
	return (
		<>
			<label htmlFor={id}>{labelText}</label>
			<input className="bg-zinc-300" id={id} {...register(field)} />
		</>
	);
};
