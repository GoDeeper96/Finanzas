
    
     





























     //Calcular periodo
       periodo = Math.round((FechaVen-FechaGiro) / (1000 * 60 * 60 * 24));
       //Calcular tasa
        t=0;
       
       if(TipoTasa=="Tasa Nominal"){
           if(pT==="Mensual"){
               SetCapitalizacion(30);
           }
           if(pT=="Bimestral"){
               SetCapitalizacion(60);
           }
           if(pT=="Trimestral"){
               SetCapitalizacion(90);
           }
           if(pT=="Cuatrimestral"){
               SetCapitalizacion(120)
           }
           if(pT=="Semestral"){
               SetCapitalizacion(180)
           }
           if(pT=="Diario"){
               SetCapitalizacion(1)
           }
           m = plazot/capitalizacion;
           n = periodo/capitalizacion;
           t = Math.pow(1+(tasa/m),n)-1;
       }
       if(TipoTasa=="Tasa Efectiva"){
           t = Math.pow((1+tasa),periodo/plazot)-1;
           t = parseFloat(t.toPrecision(7));
       }
       //Calcular Tasa descuento
       tasadescuento = t/(t+1.00);
       tasadescuento = parseFloat(tasadescuento.toFixed(7));
       //Calcular Descuento
       descuento = valorNominal*(tasadescuento);
       descuento = parseFloat(descuento.toFixed(2));
       //Valor Neto
       valorNeto=valorNominal-descuento;
       valorNeto = parseFloat(valorNeto.toFixed(2))
       //Valor a Recibir
       valorRecibido=valorNeto-gastoInicial-retencion;
       valorRecibido = parseFloat(valorRecibido.toFixed(2))
       //Valor a Entregar
       valorEntregado=valorNominal+gastoFinal-retencion;
       valorEntregado = parseFloat(valorEntregado.toFixed(2))
       //TCEA
       TCEA=Math.pow(( valorEntregado/valorRecibido), 360/periodo) - 1;
            // if(TipoTasa=="Tasa Nominal"){
        //     if(pT==="Mensual"){
        //         SetCapitalizacion(30);
        //     }
        //     if(pT=="Bimestral"){
        //         SetCapitalizacion(60);
        //     }
        //     if(pT=="Trimestral"){
        //         SetCapitalizacion(90);
        //     }
        //     if(pT=="Cuatrimestral"){
        //         SetCapitalizacion(120)
        //     }
        //     if(pT=="Semestral"){
        //         SetCapitalizacion(180)
        //     }
        //     if(pT=="Diario"){
        //         SetCapitalizacion(1)
        //     }
        //     m = plazot/capitalizacion;
        //     n = periodo/capitalizacion;
        //     t = Math.pow(1+(tasa/m),n)-1;
        // }

        // props.navigation.goBack();
            // resultas=<Fancy
            // visible={true}
            // resultas={true}
            // periodo={periodo}
            // valorRecibido={valorRecibido}
            // sumArrayI={sumArrayI}
            // sumArrayF={sumArrayF}
            // TCEA={TCEA}
            // valorNeto={valorNeto}
            // descuento={descuento}
            // valorNominal={valorNominal}
            // capitalizacion={capitalizacion}
            // toggle={toggleAlertFinal}
            // />
            // SetHayResultados(true);
            // console.log(props.route.params.letraId);
            // console.log("here"+userLetras.map(x=>x.idLetra))
            // props.navigation.navigate('Resultados',{
            //     dias:periodo,
            //     valorRecibido:valorRecibido,
            //     costeInicial:sumArrayI,
            //     costeFinal:sumArrayF,
            //     tcea:TCEA,
            //     valorNeto:valorNeto,
            //     descuento:descuento
            // });