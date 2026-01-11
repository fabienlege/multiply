import { Button } from "../Components/Button";
import { useAppContext } from "../context/AppContext";
import { useRandomOpperation } from "../context/game.utils";

export const WinScreen = () => {
	const { turn, score, bestScore, startTurn } = useAppContext();
	const { getTurn } = useRandomOpperation();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				padding: "0.5rem",
			}}
		>
			<p style={{ fontSize: "5rem", margin: "1rem" }}>✅</p>
			<h3>Bravo !</h3>
			<h1 style={{ margin: "1rem" }}>
				{turn?.selectedFactor}×{turn?.selectedTable} = {turn?.result}
			</h1>
			<h2>
				Tu as {score} point{score > 1 ? "s" : ""}
			</h2>
			<p>
				(Meilleure score = {bestScore} point {bestScore > 1 ? "s" : ""})
			</p>
			<Button
				onClick={() => startTurn(getTurn())}
				fullWidth
				style={{ height: "4rem" }}
			>
				Continuer
			</Button>
		</div>
	);
};
