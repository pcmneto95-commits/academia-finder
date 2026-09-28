function GymDetails({ academia, onFechar }) {
  if (!academia) return null

  return (
    <div className="gym-details">
      <button type="button" className="gym-details__fechar" onClick={onFechar}>
        Fechar
      </button>
      <h3>{academia.nome}</h3>
      <ul>
        <li><strong>Endereço:</strong> {academia.endereco}</li>
        <li><strong>Horário:</strong> {academia.horario}</li>
        <li><strong>Telefone:</strong> {academia.telefone}</li>
        <li><strong>Site:</strong> {academia.site}</li>
      </ul>
    </div>
  )
}

export default GymDetails