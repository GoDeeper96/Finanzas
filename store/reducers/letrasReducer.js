import Letra from '../../models/Letra';
import { CREATE_LETRA, DELETE_LETRA, SET_LETRA, UPDATE_LETRA } from '../actions/letrasActions';

const initialState= {
    availableLetras: [],
    userLetras:[]
    // availableLetras: [],
    // userLetras:[]
};

export default (state = initialState,action) =>{
    switch (action.type) {
        case SET_LETRA:
            return {
                availableLetras: action.letras,
                userLetras:action.userLetras
            }
        case UPDATE_LETRA:
            const LetrasIndex = state.userLetras.findIndex(letr=>letr.id ===action.lid);
            const updatedLetra = new Letra(
                action.lid,
                state.userLetras[LetrasIndex].idUsuario,
                action.LetraData.titulo,
                action.LetraData.SelectedImage,
                action.LetraData.descripcion,
                action.LetraData.plazot,
                action.LetraData.tasa,
                action.LetraData.fechaDescuento,
                action.LetraData.gastoInicial,
                action.LetraData.gastoFinal,
                action.LetraData.fechaEmision,
                action.LetraData.retencion,
                action.LetraData.valorNominal,
                action.LetraData.capitalizacion)
            const updatedUserLetra = [...state.userLetras];
            updatedUserLetra[LetrasIndex] = updatedLetra;
            const availableLetrasIndex = state.availableLetras.findIndex(
                letr=>letr.id===action.lid
            );
            const updatedAvailableLetras=[...state.availableLetras];
            updatedAvailableLetras[availableLetrasIndex] = updatedLetra;
            return {
                ...state,
                availableLetras: updatedAvailableLetras,
                userLetras: updatedUserLetra
            }
        case CREATE_LETRA:
            const newLetra = new Letra(
            action.LetraData.id,
            action.LetraData.idUsuario,
            action.LetraData.titulo,
            action.LetraData.SelectedImage,
            action.LetraData.descripcion,
            action.LetraData.plazot,
            action.LetraData.tasa,
            action.LetraData.fechaDescuento,
            action.LetraData.gastoInicial,
            action.LetraData.gastoFinal,
            action.LetraData.fechaEmision,
            action.LetraData.retencion,
            action.LetraData.valorNominal,
            action.LetraData.capitalizacion);
            return{
                ...state,
                availableLetras: state.availableLetras.concat(newLetra),
                userLetras:state.userLetras.concat(newLetra)
            };
        case DELETE_LETRA:
            return {
                ...state,
                userLetras:state.userLetras.filter(letra=>letra.id!==action.lid),
                availableLetras:state.availableLetras.filter(letra=>letra.id!==action.lid),
                
            };
    }
    return state;
}