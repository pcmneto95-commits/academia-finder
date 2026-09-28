const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search'

const OVERPASS_MIRRORS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]

// Transforma o nome de um lugar em coordenadas
export async function buscarCoordenadas(lugar) {
  const url = `${NOMINATIM_URL}?q=${encodeURIComponent(lugar)}&format=json&limit=1`
  const resposta = await fetch(url)

  if (!resposta.ok) {
    throw new Error(`Nominatim respondeu com erro ${resposta.status}`)
  }

  const dados = await resposta.json()
  if (dados.length === 0) return null

  return { lat: dados[0].lat, lon: dados[0].lon }
}

// Busca academias ao redor das coordenadas (raio em metros)
// Tenta o servidor principal e, se falhar, tenta os mirrors
export async function buscarAcademias(lat, lon, raio = 3000) {
  const consulta = `
    [out:json][timeout:25];
    (
      node["leisure"="fitness_centre"](around:${raio},${lat},${lon});
      way["leisure"="fitness_centre"](around:${raio},${lat},${lon});
    );
    out center tags;
  `

  let ultimoErro = null

  for (const endpoint of OVERPASS_MIRRORS) {
    try {
      const url = `${endpoint}?data=${encodeURIComponent(consulta)}`
      const resposta = await fetch(url)

      if (!resposta.ok) {
        throw new Error(`${endpoint} respondeu com erro ${resposta.status}`)
      }

      const dados = await resposta.json()
      return dados.elements.map(formatarAcademia)
    } catch (erro) {
      console.error('Falhou em', endpoint, erro)
      ultimoErro = erro
    }
  }

  throw new Error(
    `Nenhum servidor respondeu. Último erro: ${ultimoErro?.message ?? 'desconhecido'}`
  )
}

// Organiza os dados de cada academia e trata o que vier vazio
function formatarAcademia(elemento) {
  const tags = elemento.tags || {}
  const rua = [tags['addr:street'], tags['addr:housenumber']]
    .filter(Boolean)
    .join(', ')
  const endereco = [rua, tags['addr:suburb']].filter(Boolean).join(' - ')

  return {
    id: `${elemento.type}-${elemento.id}`,
    nome: tags.name || 'Academia sem nome',
    endereco: endereco || 'Não informado',
    horario: tags.opening_hours || 'Não informado',
    telefone: tags.phone || tags['contact:phone'] || 'Não informado',
    site: tags.website || tags['contact:website'] || 'Não informado',
    lat: elemento.lat ?? elemento.center?.lat,
    lon: elemento.lon ?? elemento.center?.lon,
  }
}