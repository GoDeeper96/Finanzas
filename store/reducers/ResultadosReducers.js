
import Resultado from '../../models/Resultado';
import { CREATE_RESULTADO, SET_RESULTADO,DELETE_RESULTADO } from '../actions/ResultadosActions';

const initialState= {
    availableResultados: [],
    // availableResultados: [],
    // userResultado:[]
};

export default (state = initialState,action) =>{
    switch (action.type) {
        case SET_RESULTADO:
            return {
                availableResultados: action.resultados,
            }
        case CREATE_RESULTADO:
            const newResultado = new Resultado(
                action.ResultadoData.LetraImageUrL,
                action.ResultadoData.idLetra,
                action.ResultadoData.idResultado,
                action.ResultadoData.dias,
                action.ResultadoData.valorRecibido,
                action.ResultadoData.valorEntregado,
                action.ResultadoData.costeInicial,
                action.ResultadoData.costeFinal,
                action.ResultadoData.tcea,
                action.ResultadoData.valorNeto,
                action.ResultadoData.descuento,
                action.ResultadoData.fechaInicio,
                action.ResultadoData.fechaVencimiento,
                action.ResultadoData.valorNominalLetra,
                action.ResultadoData.tasa);
            return{
                ...state,
                availableResultados: state.availableResultados.concat(newResultado),
            };
        case DELETE_RESULTADO:
                return {
                    ...state,
                    availableResultados:state.availableResultados.filter(letra=>letra.idLetra!==action.lid),
                    
                };
    }
    return state;
}