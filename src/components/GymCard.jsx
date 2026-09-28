function GymCard({ academia, onSelecionar }) {
  return (
    <li className="gym-card">
      <h3>{academia.nome}</h3>
      <p>{academia.endereco}</p>
      <button type="button" onClick={() => onSelecionar(academia)}>
        Ver detalhes
      </button>
    </li>
  )
}

export default GymCard