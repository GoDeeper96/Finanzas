import Resultado from "../../models/Resultado";

export const CREATE_RESULTADO = 'CREATE_RESULTADO';
export const SET_RESULTADO = 'SET_RESULTADO';

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
                resData[resultado].costeInicial,
                resData[resultado].costeFinal,
                resData[resultado].tcea,
                resData[resultado].valorNeto,
                resData[resultado].descuento,   
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
export const createResultado = 
    (
    // id,
    // idUsuario,
    idLetra,
    LetraImageUrL,
    dias,
    valorRecibido,
    costeInicial,
    costeFinal,
    tcea,
    valorNeto,
    descuento) =>
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
            costeInicial,
            costeFinal,
            tcea,
            valorNeto,
            descuento,
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
        costeInicial,
        costeFinal,
        tcea,
        valorNeto,
        descuento,
      }
    }
    ); 

    }
    
}