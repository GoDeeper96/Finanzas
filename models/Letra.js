class Letra {
    constructor
       (idLetra,
        idUsuario,
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
        capitalizacion)
    {
        this.idLetra = idLetra; //nosetoca*
        this.idUsuario = idUsuario; //nosetoca*
        this.titulo = titulo; //nosetoca*
        this.SelectedImage = SelectedImage; //nosetoca*
        this.selectedLocation=selectedLocation;
        this.descripcion = descripcion; //nosetoca*
        this.plazot = plazot; //PLAZO DE TASA PERIODO
        this.tasa = tasa; //VALOR NUMERICO * 
        this.fechaDescuento = fechaDescuento; // fecha *// FECHA VENCIMIENNTO
        this.gastoInicial = gastoInicial; // SON ARRAYS
        this.gastoFinal = gastoFinal; // SON ARRAYS
        this.fechaEmision = fechaEmision; // FECHA INICIO
        this.retencion = retencion;
        this.valorNominal = valorNominal;
        this.capitalizacion= capitalizacion;
    }
}
export default Letra;

