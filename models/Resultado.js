class Resultado {
    constructor(
        idResultado,
        idLetra,  
        LetraImageUrL,
        dias,
        valorRecibido,
        costeInicial,
        costeFinal,
        tcea,
        valorNeto,
        descuento)
    {
        this.LetraImageUrL=LetraImageUrL;
        this.idLetra = idLetra;
        this.idResultado = idResultado;
        this.valorRecibido = valorRecibido; //VALOR RECIBIDO TOTAL
        this.costeInicial = costeInicial; //SUMA DE GASTOS INICIALES
        this.costeFinal = costeFinal; //SUMA DE GASTOS FINALES
        this.tcea = tcea;
        this.valorNeto = valorNeto;
        this.descuento = descuento;
        this.dias = dias;
    }
}

export default Resultado;