import Resultado from "../../models/Resultado";

export const CREATE_RESULTADO = 'CREATE_RESULTADO';
export const SET_RESULTADO = 'SET_RESULTADO';
export const DELETE_RESULTADO = 'DELETE_RESULTADO';
export const fetchResultado = () =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products.json
    return async (dispatch,getState) =>{
        try {
        const userId = getState().auth.userId;
        const response = await fetch('https://finanzasapp-dff53-default-rtdb.firebaseio.com/resultados.json');
        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        const loadedResultado = [];
        for(const resultado in resData){
            loadedResultado.push(
                new Resultado(        
                resultado,
                resData[resultado].idLetra,
                resData[resultado].LetraImageUrL,
                resData[resultado].dias,
                resData[resultado].valorRecibido,
                resData[resultado].valorEntregado,
                resData[resultado].costeInicial,
                resData[resultado].costeFinal,
                resData[resultado].tcea,
                resData[resultado].valorNeto,
                resData[resultado].descuento,

                resData[resultado].fechaInicio,
                resData[resultado].fechaVencimiento,
                resData[resultado].valorNominalLetra,
                resData[resultado].tasa,
                )
            );
        }
        dispatch({
            type:SET_RESULTADO,
            resultados:loadedResultado,
        })
        } catch (error) {
            throw error;
        }
        
    }
}
export const deleteResultados = letrasId =>{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}
    return async (dispatch,getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const res = await fetch(`https://finanzasapp-dff53-default-rtdb.firebaseio.com/resultados/${letrasId}.json?auth=${token}`,{
        method:'DELETE'
        });
        console.log("que fue"+letrasId);
        if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
            type:DELETE_RESULTADO,lid:letrasId
        })
    }
}
export const createResultado = 
    (
    // id,
    // idUsuario,
    idLetra,
    LetraImageUrL,
    dias,
    valorRecibido,
    valorEntregado,
    costeInicial,
    costeFinal,
    tcea,
    valorNeto,
    descuento,
    fechaInicio,
    fechaVencimiento,
    valorNominalLetra,
    tasa,
    ) =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products.json?auth=${token}
    return async (dispatch,getState)=>{
     //ANY ASYNC CODE YOU WANT
     const token = getState().auth.token;
     const response = await fetch(`https://finanzasapp-dff53-default-rtdb.firebaseio.com/resultados.json?auth=${token}`
     ,{
         method:'POST',
         headers:{
             'Content-Type':'application/json'
         },
         body:JSON.stringify({
            idLetra:idLetra,
            LetraImageUrL,
            dias,
            valorRecibido,
            valorEntregado,
            costeInicial,
            costeFinal,
            tcea,
            valorNeto,
            descuento,
            fechaInicio,
            fechaVencimiento,
            valorNominalLetra,
            tasa,
         })
     });
     const resData = await response.json();
    //  console.log(resData);
      dispatch({
        type:CREATE_RESULTADO,
        ResultadoData:{
        idResultado:resData.name,
        idLetra:idLetra,
        LetraImageUrL,
        dias,
        valorRecibido,
        valorEntregado,
        costeInicial,
        costeFinal,
        tcea,
        valorNeto,
        descuento,
        fechaInicio,
        fechaVencimiento,
        valorNominalLetra,
        tasa,
      }
    }
    ); 

    }
    
}