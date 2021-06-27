import Resultado from "../../models/Resultado";

export const DELETE_RESULTADO = 'DELETE_RESULTADO';
export const CREATE_RESULTADO = 'CREATE_RESULTADO';
export const UPDATE_RESULTADO = 'UPDATE_RESULTADO';
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
                resData[resultado].LetraImageUrL,
                resData[resultado].idLetra,
                resData[resultado].idResultado,
                resData[resultado].plazot,
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
            userLetras:loadedResultado.filter(letr=>letr.idUsuario===userId)
        })
        } catch (error) {
            throw error;
        }
        
    }
}
export const deletResultado = resultadosId =>{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}
    return async (dispatch,getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const res = await fetch(`https://finanzasapp-dff53-default-rtdb.firebaseio.com/letras/${resultadosId}.json?auth=${token}`,{
        method:'DELETE'
        });
        
        if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
            type:DELETE_RESULTADO,lid:resultadosId
        })
    }
}
export const createResultado = 
    (
    // id,
    // idUsuario,
    LetraImageUrL,
    idLetra,
    idResultado,
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
     const userId = getState().auth.userId;
     const response = await fetch(`https://finanzasapp-dff53-default-rtdb.firebaseio.com/resultados.json?auth=${token}`
     ,{
         method:'POST',
         headers:{
             'Content-Type':'application/json'
         },
         body:JSON.stringify({
            LetraImageUrL,
            idLetra,
            idResultado,
            dias,
            valorRecibido,
            costeInicial,
            costeFinal,
            tcea,
            valorNeto,
            descuento,
            idUsuario:userId
         })
     });
     const resData = await response.json();
    //  console.log(resData);
      dispatch({
        type:CREATE_RESULTADO,
        ResultadoData:{
        idResultado:resData.name,
        LetraImageUrL,
        idLetra,
        idResultado,
        dias,
        valorRecibido,
        costeInicial,
        costeFinal,
        tcea,
        valorNeto,
        descuento,
        idUsuario:userId
      }
    }
    ); 

    }
    
}
export const updateResultado = (
    LetraImageUrL,
    idLetra,
    idResultado,
    dias,
    valorRecibido,
    costeInicial,
    costeFinal,
    tcea,
    valorNeto,
    descuento) =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}
    return async (dispatch,getState)=>{
        // console.log(getState);
        const token = getState().auth.token;
        const res = await fetch(
            `https://finanzasapp-dff53-default-rtdb.firebaseio.com/resultados/${id}.json?auth=${token}`
            ,{
             method:'PATCH', //PUT VA A SOBREESCRIBAR SOBRE LA NUEVA DATA, PATCH VA A ACTUALIZAD DONDE DGIAS QUE ACTUALICE
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                LetraImageUrL,
                idLetra,
                idResultado,
                dias,
                valorRecibido,
                costeInicial,
                costeFinal,
                tcea,
                valorNeto,
                descuento
             })
         });
         if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
        type:UPDATE_RESULTADO,
        lid:id,
        LetraData:{
            LetraImageUrL,
            idLetra,
            idResultado,
            dias,
            valorRecibido,
            costeInicial,
            costeFinal,
            tcea,
            valorNeto,
            descuento
        }
    });
        
    }

}