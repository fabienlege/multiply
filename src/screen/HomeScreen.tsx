import type { FC } from "react";
import { Button } from "../Components/Button";
import { useAppContext } from "../context/AppContext";

export const HomeScreen: FC = () => {
	const { setScreen } = useAppContext();
	return (
		<div>
			<Button onClick={() => setScreen("config")} style={{ height: "4rem" }}>
				Démarrer une partie
			</Button>
		</div>
	);
};
