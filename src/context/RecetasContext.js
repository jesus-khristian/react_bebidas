import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, guardarRecetas] = useState([]);
    const [busqueda, buscarRecetas] = useState({
        categoria:''
    });
    const {categoria} = busqueda;
    const [consulta, guardarConsulta]=useState(false);

    useEffect(()=>{
        if(consulta){
            const obtenerRecetas = async _ =>{
                const url=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${categoria} `;
                const resultado = await axios.get(url);
                guardarRecetas(resultado.data.drinks);
            }
            obtenerRecetas();
        }
    },[busqueda])

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsulta    
            }}
        >
            {props.children}
        </RecetasContext.Provider>

    );
}

export default RecetasProvider;
