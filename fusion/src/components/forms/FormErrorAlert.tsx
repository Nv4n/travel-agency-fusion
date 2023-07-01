import { IconAlertTriangle } from "@tabler/icons-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface FormErrorAlertProps {
	errorMsg: string;
}

export const FormErrorAlert = ({ errorMsg }: FormErrorAlertProps) => {
	return errorMsg ? (
		<Alert className="mx-auto my-4  w-full " variant="destructive">
			<IconAlertTriangle className="!top-auto h-4 w-4"></IconAlertTriangle>{" "}
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{errorMsg}</AlertDescription>
		</Alert>
	) : null;
};
