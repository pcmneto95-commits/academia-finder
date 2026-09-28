   import { useState } from 'react'

   function SearchBar({ onSearch }) {
     const [texto, setTexto] = useState('')

     function handleSubmit(event) {
       event.preventDefault()
       if (texto.trim() === '') return
       onSearch(texto.trim())
     }

     return (
       <form className="search" onSubmit={handleSubmit}>
         <label htmlFor="cidade">Cidade ou bairro</label>
         <div className="search__row">
           <input
             id="cidade"
             type="text"
             placeholder="Ex.: Niterói"
             value={texto}
             onChange={(event) => setTexto(event.target.value)}
           />
           <button type="submit">Buscar</button>
         </div>
       </form>
     )
   }

   export default SearchBar