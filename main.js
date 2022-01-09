const instances = [];
class Venta {

    constructor(producto, cantidad, precio){
        this.producto   = producto;
        this.cantidad   = cantidad;
        this.precio     = precio;
        this.carrito    = [];
        this.suma       = function(){
            return parseInt(this.cantidad * this.precio);
        }
        this.iva        = function(){
            return this.suma() * 0.19;
        }
        this.total      = function(){
            return parseInt(this.suma() + this.iva());
        }
    }


    addInstance(objeto){
        instances.push(objeto)
    }
    getInstances(){
        return instances;
    }
    clearInstances(){
        instances.length = 0;
    }

    /* Inicia la aplicación */
    init(){
        let cantidad    = parseInt(prompt("Ingresar cantidad de productos vendidos:"));
        if(cantidad > 0 && !isNaN(cantidad)){
            console.log('cantidad : ', cantidad);
            for(let i=1; i <= cantidad; i++){
                this.initPrompt();
                //console.log('Pase por aquí : ', i);
            }
        }else{
            console.log('UPS!! Debes ingresar valores númericos!!');
            this.init();
        }
    }
    
    /* output valores con iva */
    createSelectProducto(){

        /*
        let productos = [{
            "title": "Brown eggs",
            "price": 1200,
          }, {
            "title": "Sweet fresh stawberry",
            "price": 1800,
          }, {
            "title": "Asparagus",
            "price": 1500,
          }, {
            "title": "Green smoothie",
            "price": 3000,
          }, {
            "title": "Raw legums",
            "price": 2000,
          }, {
            "title": "Baking cake",
            "price": 8000,
          }, {
            "title": "Pesto with basil",
            "price": 3450,
          }, {
            "title": "Hazelnut in black ceramic bowl",
            "price": 4500,
          }, {
            "title": "Fresh stawberry",
            "price": 4800,
          }, {
            "title": "Lemon and salt",
            "price": 9000,
          }, {
            "title": "Homemade bread",
            "price": 7600,
          }, {
            "title": "Legums",
            "price": 590,
          }, {
            "title": "Fresh tomato",
            "price": 1040,
          }, {
            "title": "Healthy breakfast",
            "price": 1300,
          }, {
            "title": "Green beans",
            "price": 2800,
          }, {
            "title": "Baked stuffed portabello mushrooms",
            "price": 2000,
          }, {
            "title": "Strawberry jelly",
            "price": 1400,
          }, {
            "title": "Pears juice",
            "price": 1900,
          }, {
            "title": "Fresh pears",
            "price": 1500,
          }, {
            "title": "Caprese salad",
            "price": 1600,
          }, {
            "title": "Oranges",
            "price": 2100,
          }, {
            "title": "Vegan food",
            "price": 2966,
          }, {
            "title": "Breakfast with muesli",
            "price": 2270,
          }, {
            "title": "Honey",
            "price": 17011,
          }, {
            "title": "Breakfast with cottage",
            "price": 14055,
          }, {
            "title": "Strawberry smoothie",
            "price": 28800,
          }, {
            "title": "Strawberry and mint",
            "price": 2621,
          }, {
            "title": "Ricotta",
          }, {
            "title": "Cuban sandwiche",
            "price": 185,
          }, {
            "title": "Granola",
            "price": 2997,
          }, {
            "title": "Smoothie with chia seeds",
            "price": 2526,
          }, {
            "title": "Yogurt",
            "price": 2761,
          }];
          */

          $.getJSON( "https://posicionamientopro.cl/tools/coderhouse/remote.php?opc=getProductos", function( productos ) {
            /*
            var items = [];
            $.each( data, function( key, val ) {
              console.log(key);
              console.log(val);
              items.push( "<li id='" + key + "'>" + val + "</li>" );
            });
           
            $( "<ul/>", {
              "class": "my-new-list",
              html: items.join( "" )
            }).appendTo( "body" );
            */
            productos.sort((a, b) => {
                if(a.titulo < b.titulo) return -1;
                if(a.titulo > b.titulo) return 1;
                
                return 0;
            })
        
            let html = '';
            for(var key in productos) {
                html += '<option data-price="' + productos[key].precio + '" value="' + productos[key].titulo + '">' + productos[key].titulo + '</option>';
            }
            $("#producto").html(html);


          });

          
    }
    
    addProducto() {
        let select      = $("#producto");
        //let producto    = select.options[select.selectedIndex].value;
        let producto    = $('#producto option:selected').val();
        let valor       = $('#producto option:selected').data('price');
        let cantidad    = $("#cantidad").val();

        let objeto      = new Venta(producto, cantidad, valor); 
        this.addInstance(objeto);
        return objeto;
    }
    

    writeInnerHTML(){

      let ventas = this.getInstances();
        let sumaTotal = 0;
        let ivaTotal = 0;
        let totalFinal = 0;
        
        let ciclo = ``;
        let head = '<table class="table table-striped"><thead><tr><th scope="col">#</th><th scope="col" class="text-left">Producto</th><th scope="col">Cantidad</th><th scope="col">Valor</th><th scope="col">IVA</th><th scope="col">Total</th></tr></thead><tbody>';

        let contador = 1;
        for (const venta of ventas){

            //console.log('Producto : ', venta.producto);
            //console.log('suma : ', venta.suma());
            //console.log('iva : ', venta.iva());
            //console.log('total : ', venta.total());
            sumaTotal = sumaTotal + parseInt(venta.suma());
            ivaTotal = ivaTotal + parseInt(venta.iva());
            totalFinal = totalFinal + parseInt(venta.total());
            ciclo    = ciclo + '<tr><th scope="row">'+contador+'</th><td class="text-left">'+venta.producto+'</td><td>'+venta.cantidad+'</td><td>'+venta.precio+'</td><td>'+venta.iva()+'</td><td>'+venta.suma()+'</td></tr>';
            contador++;
        }
        //console.log("Resultado de la Venta");
        //console.log("Suma Total :", sumaTotal);
        //console.log("Iva Total :", ivaTotal);
        //console.log("Valor Final :", totalFinal);

      
      
      let pie = '<tr><th scope="row" colspan="4"></th><td><strong>Total</strong></td><td>'+sumaTotal+'</td></tr>';
          pie+= '<tr><th scope="row" colspan="4"></th><td><strong>IVA</strong></td><td></strong>'+ivaTotal+'</strong></td></tr>';
          pie+= '<tr><th scope="row" colspan="4"></th><td><strong>Valor Final</strong></td><td></strong>'+totalFinal+'</strong></td></tr>';
          pie+= '</tbody></table>';

        let todo = head+ciclo+pie;
      $("#remote").html(todo);
    }
}




    function addProducto(){
        let objVenta = new Venta();
        objVenta.addProducto();
        objVenta.writeInnerHTML();
    }


  


    //let objVenta = new Venta();
    //objVenta.createSelectProducto();
    //objVenta.writeInnerHTML();

    //document.addEventListener("click", addProducto);
    
  $( document ).ready(function() {
    let objVenta = new Venta();
    objVenta.createSelectProducto();
    objVenta.writeInnerHTML();
  });