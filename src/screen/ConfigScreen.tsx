import { Button } from '../Components/Button'
import { Checkbox } from '../Components/Checkbox'
import { availableTables } from '../constants/tables'
import { useAppContext } from '../context/AppContext'
import { useRandomOpperation } from '../context/game.utils'

export const ConfigScreen = () => {
  const {tables, disableTable, enableTable, startTurn} = useAppContext()
  const {getTurn} = useRandomOpperation()
  
  const handleOnChange = (table: keyof typeof availableTables, checked: boolean) => {
    if(checked){
      enableTable(table)
    }
    else{
      disableTable(table)
    }
  }

  return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height:'100%', justifyContent: 'space-around'}}>
    <h2>Quelles tables connais-tu ?</h2>
    <div>
    {availableTables.map(table => (
      <Checkbox 
        name='table' 
        label={`Table de ${table}`} 
        onChange={(isChecked: boolean) => handleOnChange(table, isChecked)} 
        key={table}
        isChecked={tables.has(table)}
        />
      ))}
    </div>
    <Button onClick={() => {startTurn(getTurn())}} style={{height:'4rem'}} disabled={!tables.size}>Démarrer la partie</Button>
  </div>
}