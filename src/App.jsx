import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import GymList from './components/GymList'
import GymDetails from './components/GymDetails'
import Footer from './components/Footer'
import { buscarCoordenadas, buscarAcademias } from './services/api'

function App() {
  const [academias, setAcademias] = useState([])
  const [selecionada, setSelecionada] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [buscou, setBuscou] = useState(false)

  async function handleSearch(lugar) {
    setCarregando(true)
    setErro('')
    setAcademias([])
    setSelecionada(null)
    setBuscou(true)

    try {
      const coordenadas = await buscarCoordenadas(lugar)

      if (!coordenadas) {
        setErro('Local não encontrado. Tente outro nome.')
        return
      }

      const resultado = await buscarAcademias(coordenadas.lat, coordenadas.lon)
      setAcademias(resultado)
    } catch (error) {
      console.error(error)
      setErro(`Erro ao buscar: ${error.message}`)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <SearchBar onSearch={handleSearch} />

        {carregando && <p className="mensagem">Carregando academias...</p>}
        {erro && <p className="mensagem mensagem--erro">{erro}</p>}
        {buscou && !carregando && !erro && academias.length === 0 && (
          <p className="mensagem">Nenhuma academia encontrada nessa região.</p>
        )}

        {academias.length > 0 && (
          <div className="resultados">
            <GymList academias={academias} onSelecionar={setSelecionada} />
            <GymDetails academia={selecionada} onFechar={() => setSelecionada(null)} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App