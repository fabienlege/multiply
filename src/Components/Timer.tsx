import { MAX_TURN_DURATIONS } from '../constants/timer';
import { useAppContext } from '../context/AppContext'

export const Timer = () => {
  const {timer, finishTurn} = useAppContext();

  if(timer > MAX_TURN_DURATIONS) finishTurn(null);

  return <progress value={timer} max={MAX_TURN_DURATIONS} />
}