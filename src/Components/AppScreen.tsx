import { useAppContext } from "../context/AppContext";
import { ConfigScreen } from "../screen/ConfigScreen";
import { LoseScreen } from "../screen/LoseScreen";
import { PlayScreen } from "../screen/PlayScreen";
import { WinScreen } from "../screen/WinScreen";

export type ScreenIndex = "home" | "config" | "play" | "win" | "lose";

export const AppScreen = () => {
	const { screen } = useAppContext();

	switch (screen) {
		case "home":
		case "config":
			return <ConfigScreen />;
		case "play":
			return <PlayScreen />;
		case "win":
			return <WinScreen />;
		case "lose":
			return <LoseScreen />;
		default:
			return null;
	}
};
