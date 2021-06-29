import Letra from "../../models/Letra";

export const DELETE_LETRA = 'DELETE_LETRA';
export const CREATE_LETRA = 'CREATE_LETRA';
export const UPDATE_LETRA = 'UPDATE_LETRA';
export const SET_LETRA = 'SET_LETRA';
export const fetchLetras = () =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products.json
    return async (dispatch,getState) =>{
        try {
        const userId = getState().auth.userId;
        const response = await fetch('https://finanzasapp-dff53-default-rtdb.firebaseio.com/letras.json');
        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        const resData = await response.json();
        const loadedLetras = [];
        for(const letra in resData){
            loadedLetras.push(
                new Letra(
                letra,
                resData[letra].idUsuario,
                resData[letra].titulo,
                resData[letra].SelectedImage,
                resData[letra].descripcion,
                resData[letra].plazot,
                resData[letra].tasa,
                resData[letra].fechaDescuento,
                resData[letra].gastoInicial,
                resData[letra].gastoFinal,
                resData[letra].fechaEmision,
                resData[letra].retencion,
                resData[letra].valorNominal,
                resData[letra].capitalizacion,            
                )
            );
        }
        dispatch({
            type:SET_LETRA,
            letras:loadedLetras,
            userLetras:loadedLetras.filter(letr=>letr.idUsuario===userId)
        })
        } catch (error) {
            throw error;
        }
        
    }
}
export const deletLetra = letrasId =>{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}
    return async (dispatch,getState) =>{
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const res = await fetch(`https://finanzasapp-dff53-default-rtdb.firebaseio.com/letras/${letrasId}.json?auth=${token}`,{
        method:'DELETE'
        });
        
        if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
            type:DELETE_LETRA,lid:letrasId
        })
    }
}
export const createLetra = 
    (
    // id,
    // idUsuario,
    titulo,
    SelectedImage,
    descripcion,
    plazot,
    tasa,
    fechaDescuento,
    gastoInicial,
    gastoFinal,
    fechaEmision,
    retencion,
    valorNominal,
    capitalizacion) =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products.json?auth=${token}
    return async (dispatch,getState)=>{
     //ANY ASYNC CODE YOU WANT
     const token = getState().auth.token;
     const userId = getState().auth.userId;
     const response = await fetch(`https://finanzasapp-dff53-default-rtdb.firebaseio.com/letras.json?auth=${token}`
     ,{
         method:'POST',
         headers:{
             'Content-Type':'application/json'
         },
         body:JSON.stringify({
            idUsuario: userId,
            titulo,
            SelectedImage,
            descripcion,
            plazot,
            tasa,
            fechaDescuento,
            gastoInicial,
            gastoFinal,
            fechaEmision,
            retencion,
            valorNominal,
            capitalizacion
         })
     });
     const resData = await response.json();
    //  console.log(resData);
      dispatch({
        type:CREATE_LETRA,
        LetraData:{
        idLetra:resData.name,
        idUsuario: userId,
        titulo,
        SelectedImage,
        descripcion,
        plazot,
        tasa,
        fechaDescuento,
        gastoInicial,
        gastoFinal,
        fechaEmision,
        retencion,
        valorNominal,
        capitalizacion
      }
    }
    ); 

    }
    
}
export const updateLetra = (
    id,
    titulo,
    SelectedImage,
    descripcion,
    plazot,
    tasa,
    fechaDescuento,
    gastoInicial,
    gastoFinal,
    fechaEmision,
    retencion,
    valorNominal) =>
{
    //https://mealsapp-d838a-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}
    return async (dispatch,getState)=>{
        // console.log(getState);
        const token = getState().auth.token;
        const res = await fetch(
            `https://finanzasapp-dff53-default-rtdb.firebaseio.com/letras/${id}.json?auth=${token}`
            ,{
             method:'PATCH', //PUT VA A SOBREESCRIBAR SOBRE LA NUEVA DATA, PATCH VA A ACTUALIZAD DONDE DGIAS QUE ACTUALICE
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({
                titulo,
                SelectedImage,
                descripcion,
                plazot,
                tasa,
                fechaDescuento,
                gastoInicial,
                gastoFinal,
                fechaEmision,
                retencion,
                valorNominal,
                capitalizacion
             })
         });
         if(!res.ok){
            throw new Error('Something went wrong!')
        }
        dispatch({
        type:UPDATE_LETRA,
        lid:id,
        LetraData:{
            titulo,
            SelectedImage,
            descripcion,
            plazot,
            tasa,
            fechaDescuento,
            gastoInicial,
            gastoFinal,
            fechaEmision,
            retencion,
            valorNominal,
            capitalizacion
        }
    });
        
    }

}