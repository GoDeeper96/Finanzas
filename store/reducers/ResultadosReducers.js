
import Resultado from '../../models/Resultado';
import { CREATE_RESULTADO, DELETE_RESULTADO, SET_RESULTADO, UPDATE_RESULTADO } from '../actions/ResultadosActions';

const initialState= {
    availableResultados: [],
    userResultado:[]
    // availableResultados: [],
    // userResultado:[]
};

export default (state = initialState,action) =>{
    switch (action.type) {
        case SET_RESULTADO:
            return {
                availableResultados: action.Resultado,
                userResultado:action.userResultado
            }
        case UPDATE_RESULTADO:
            const ResultadosIndex = state.userResultado.findIndex(result=>result.idResultado ===action.lid);
            const updatedResultado = new Resultado(
                action.lid,
                state.userResultado[ResultadosIndex].ownerId,
                action.userResultado.LetraImageUrL,
                action.userResultado.idLetra,
                action.userResultado.idResultado,
                action.userResultado.dias,
                action.userResultado.valorRecibido,
                action.userResultado.costeInicial,
                action.userResultado.costeFinal,
                action.userResultado.tcea,
                action.userResultado.valorNeto,
                action.userResultado.descuento)
            const updateUserResultado = [...state.userResultado];
            updateUserResultado[ResultadosIndex] = updatedResultado;
            const availableResultadosIndex = state.availableResultados.findIndex(
                result=>result.idResultado===action.lid
            );
            const updatedavailableResultados=[...state.availableResultados];
            updatedavailableResultados[availableResultadosIndex] = updatedResultado;
            return {
                ...state,
                availableResultados: updatedavailableResultados,
                userResultado: updateUserResultado
            }
        case CREATE_RESULTADO:
            const newResultado = new Resultado(
                action.userResultado.LetraImageUrL,
                action.userResultado.idLetra,
                action.userResultado.idResultado,
                action.userResultado.dias,
                action.userResultado.valorRecibido,
                action.userResultado.costeInicial,
                action.userResultado.costeFinal,
                action.userResultado.tcea,
                action.userResultado.valorNeto,
                action.userResultado.descuento);
            return{
                ...state,
                availableResultados: state.availableResultados.concat(newResultado),
                userResultado:state.userResultado.concat(newResultado)
            };
        case DELETE_RESULTADO:
            return {
                ...state,
                userResultado:state.userResultado.filter(result=>result.idResultado!==action.lid),
                availableResultados:state.availableResultados.filter(result=>result.idResultado!==action.lid),
                
            };
    }
    return state;
}