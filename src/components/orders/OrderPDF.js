import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../img/logo_dark.png'


const OrderPDF = (order) => {
    const pdf = new jsPDF({
        format:'letter'
    })


    //Logo
    pdf.addImage(logo,'PNG',60,10,108,22,'logo','slow')
    
    //Datos de la empresa
    let marginTop = 45
    let marginBottomText = 7
    let marginLeft = 20

    pdf.setFont('Helvetica','')
    pdf.setFontSize(10)

    //datos
    pdf.text('Tejidos Tecnicos Mallatex S.A. De C.V',marginLeft,marginTop)
    marginTop += marginBottomText

    pdf.text('Av. Iturbide #5210, Zapopan, Jal.',marginLeft,marginTop)
    marginTop += marginBottomText

    pdf.text('Teléfono: 3320164875',marginLeft,marginTop)
    marginTop += marginBottomText

    pdf.text('Email: mallatex@mallatex.com.mx',marginLeft,marginTop)
    marginTop += marginBottomText

    pdf.text('Sitio Web: https://mallatex.com.mx/',marginLeft,marginTop)

    //Datos de Orden
    marginTop = 45
    marginBottomText = 9
    marginLeft = 130
    let marginLeftData = marginLeft + 35
    pdf.setFontSize(16)
    pdf.setFont('Helvetica','Bold')
    pdf.text('Orden de Compra',marginLeft,marginTop)
    marginTop += marginBottomText

    marginLeft= 125
    marginBottomText = 5
    pdf.setFontSize(10)
    pdf.setFont('Helvetica','')

    pdf.text('Folio',marginLeft,marginTop)
    pdf.text(`${order.folio}`,marginLeftData,marginTop)
    marginTop += marginBottomText

    pdf.text('Fecha',marginLeft,marginTop)
    
    let date = new Date(order.creationdate)
    let fecha = date.toLocaleDateString()
    pdf.text(`${fecha}`,marginLeftData,marginTop)
    marginTop += marginBottomText

    pdf.text('Moneda',marginLeft,marginTop)
    pdf.text(`${order.currency.toUpperCase()}`,marginLeftData,marginTop)
    marginTop += marginBottomText

    pdf.text('Fecha de compra',marginLeft,marginTop)

    date = new Date(order.boughtdate)
    fecha = date.toLocaleDateString()
    pdf.text(`${fecha}`,marginLeftData,marginTop)


    const articleArray = order.articles.map( article =>(
        [article.article.code,
            article.article.description,
            article.article.unit,
            article.quantity,
            `$${new Intl.NumberFormat("en-US").format(article.price)}`,
            `$${new Intl.NumberFormat("en-US").format(article.import)}`,,
        ]
    ))

    const providerData = [
        [order.provider.name],
        [order.provider.address],
        [order.provider.email],
        [order.provider.phone]
    ]

    const employeeData = [
        [order.createdby.name],
        ['Mallatex'],
        [order.createdby.email]
    ]

    articleArray.push(
        [
        '',
        '',
        '',
        '',
        '',
        `Subtotal:$${new Intl.NumberFormat("en-US").format(order.subtotal)}\nIVA:$${new Intl.NumberFormat("en-US").format(order.iva)}`])
    
    const sendInfoStyle = { fillColor: "#000", fontStyle:'bold', fontSize:10, halign:'center'}
    pdf.autoTable({
        startY:85,
        tableWidth:60,
        headStyles: sendInfoStyle,
        head:[['Enviado Mediante']],
        body:[[order.fob]],
        theme:'striped',
    })

    pdf.autoTable({
        startY:85,
        tableWidth:55,
        margin:{left:80},
        headStyles: sendInfoStyle,
        head:[['F.O.B']],
        body:[[order.sentvia]],
        theme:'striped'
    })

    pdf.autoTable({
        startY:85,
        tableWidth:60,
        margin:{left:140},
        headStyles: sendInfoStyle,
        head:[['Condiciones de Envio']],
        body:[[order.shipping_conditions]],
        theme:'striped'
    })

    const providerY = pdf.lastAutoTable.finalY+5
    pdf.autoTable({
        startY:providerY,
        tableWidth:90,
        margin: {left: 110},
        headStyles: { fillColor: "#c60923", fontStyle:'bold', fontSize:14},
        head:[['Creado Por']],
        body:employeeData,
        theme:'striped',
    })

    pdf.autoTable({
        startY:providerY,
        tableWidth:90,
        headStyles: { fillColor: "#c60923", fontStyle:'bold', fontSize:14},
        head:[['Proveedor']],
        body:providerData,
        theme:'striped'
    })

    pdf.autoTable({
        startY:pdf.lastAutoTable.finalY+5,
        headStyles: { fillColor: "#000" },
        head:[['Código','Descripción','Unidad','Cant','Precio','Importe']],
        body:articleArray,
        footStyles:{ fillColor: "#fff", fontSize:17 , halign:'right', textColor:"#0000"},
        foot:[[`Total:$${new Intl.NumberFormat("en-US").format(order.total)}`]],
        theme:'striped'
    })

    let recWidth = 60
    let recHeight = 35

    pdf.autoTable({
        startY:pdf.lastAutoTable.finalY+5,
        headStyles: { 
            fillColor: "#c60923",
            halign:'center'
        },
        head:[['Comentarios o instrucciones especiales']],
        body:[[order.comments]],
        theme:'striped'
    })

    marginLeft = 35
    let marginLeftUser = 125
    const pageHeight = pdf.internal.pageSize.height
    let y = pdf.lastAutoTable.finalY + recHeight + 10
    pdf.setDrawColor(0)
    if(y > pageHeight){
        pdf.addPage()
        marginBottomText = 10 + recHeight + 10
        pdf.rect(marginLeft, 15 , recWidth, recHeight)
        pdf.rect(marginLeftUser, 15 , recWidth, recHeight)
        
    }
    
    else{
        
        marginBottomText = pdf.lastAutoTable.finalY + recHeight + 10
        pdf.rect(marginLeft, pdf.lastAutoTable.finalY+5 , recWidth, recHeight)
        pdf.rect(marginLeftUser, pdf.lastAutoTable.finalY+5 , recWidth, recHeight)
        
    }
    //Rectangulo
    

    //Nombre
    marginLeft = 65
    pdf.text('Autorizada Por',marginLeft,marginBottomText,{align:'center'})
    marginBottomText += 5
    pdf.text(`${order.createdby.name}`,marginLeft,marginBottomText,{align:'center'})

    marginLeft = 156
    pdf.text('Firma del Solicitante',marginLeft,(marginBottomText-5),{align:'center'})
    pdf.text(`${order.requestedby.name}`,marginLeft,marginBottomText,{align:'center'})

    pdf.output('save',{
        format:[4,2],
        filename:`Orden Folio_${order.folio}`
    });
}

export default OrderPDF 