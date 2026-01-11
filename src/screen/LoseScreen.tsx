import { Button } from "../Components/Button";
import { useAppContext } from "../context/AppContext";
import { useRandomOpperation } from "../context/game.utils";

export const LoseScreen = () => {
	const { turn, score, bestScore, newParty, setScreen } = useAppContext();
	const { getTurn } = useRandomOpperation();
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				padding: "0.5rem",
			}}
		>
			<p style={{ fontSize: "5rem", margin: "1rem" }}>⛔</p>
			<h3>Perdu ...</h3>
			<h1 style={{ margin: "1rem" }}>
				{turn?.selectedFactor}×{turn?.selectedTable} = {turn?.result}
			</h1>
			<h2>
				Tu as {score} point{score > 1 ? "s" : ""}
			</h2>
			<p>
				(Meilleure score = {bestScore} point{bestScore > 1 ? "s" : ""})
			</p>
			<Button
				onClick={() => newParty(getTurn())}
				fullWidth
				style={{ marginBottom: "0.5rem", height: "4rem" }}
			>
				Recommencer
			</Button>
			<Button
				onClick={() => setScreen("config")}
				fullWidth
				style={{ height: "4rem" }}
			>
				Changer de tables
			</Button>
		</div>
	);
};
