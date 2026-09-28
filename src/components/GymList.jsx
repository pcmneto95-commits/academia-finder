import GymCard from './GymCard'

function GymList({ academias, onSelecionar }) {
  return (
    <ul className="gym-list">
      {academias.map((academia) => (
        <GymCard key={academia.id} academia={academia} onSelecionar={onSelecionar} />
      ))}
    </ul>
  )
}

export default GymList