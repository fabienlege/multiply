import type { FC } from "react";

export interface CheckboxProps {
	name: string;
	label: string;
	onChange: (isChecked: boolean) => void;
	isChecked: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({
	name,
	label,
	onChange,
	isChecked,
}) => {
	return (
		<label style={{ padding: "0.5rem", display: "block" }}>
			<input
				type="checkbox"
				checked={isChecked}
				onChange={(e) => onChange(e.target.checked)}
				name={name}
			/>
			{label}
			<br />
		</label>
	);
};
