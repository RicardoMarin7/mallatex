import React from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import logo from '../../img/logo_dark.png'


const handleClick = (req) =>{
    const pdf = new jsPDF({
        format:'letter'
    })


    //Logo
    pdf.addImage(logo,'PNG',18,15,90,18,'logo','slow')
    
    //Datos de la empresa
    let marginTop = 50
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

    //Datos de Requisicion
    marginTop = 15
    marginBottomText = 9
    marginLeft = 130
    let marginLeftData = marginLeft + 28
    pdf.setFontSize(16)
    pdf.setFont('Helvetica','Bold')
    pdf.text('Requisición de Compra',marginLeft,marginTop)
    marginTop += marginBottomText

    marginLeft= 115
    marginBottomText = 5
    pdf.setFontSize(10)
    pdf.setFont('Helvetica','')

    pdf.text('Folio',marginLeft,marginTop)
    pdf.text(`${req.folio}`,marginLeftData,marginTop)
    marginTop += marginBottomText

    pdf.text('Fecha',marginLeft,marginTop)
    let date = new Date(req.creationdate)

    const fecha = date.toLocaleDateString()
    pdf.text(`${fecha}`,marginLeftData,marginTop)
    marginTop += marginBottomText

    pdf.text('Enviar a',marginLeft,marginTop)
    pdf.text(`${req.sendTo}`,marginLeftData,marginTop)
    marginTop += marginBottomText

    pdf.text('Cliente',marginLeft,marginTop)
    pdf.text(`${req.client}`,marginLeftData,marginTop)


    const articleArray = req.articles.map( article =>(
        [article.article.code,
            article.article.description,
            article.article.line,
            article.article.unit,
            article.quantity
        ]
    ))

    pdf.autoTable({
        startY:90,
        headStyles: { fillColor: "#c60923" },
        head:[['Código','Descripción','Linea','Unidad','Cantidad']],
        body:articleArray,
        theme:'striped'
    })

    let recWidth = 60
    let recHeight = 35

    pdf.autoTable({
        startY:pdf.lastAutoTable.finalY+10,
        headStyles: { 
            fillColor: "#c60923",
            halign:'center'
        },
        head:[['Comentarios']],
        body:[[req.comments]],
        theme:'striped'
    })


    //Firma

    marginLeft = 80
    const pageHeight = pdf.internal.pageSize.height
    let y = pdf.lastAutoTable.finalY + recHeight + 15
    pdf.setDrawColor(0)
    if(y > pageHeight){
        pdf.addPage()
        marginBottomText = 10 + recHeight + 15
        pdf.rect(marginLeft, 20 , recWidth, recHeight)
        
    }
    
    else{
        
        marginBottomText = pdf.lastAutoTable.finalY + recHeight + 15
        pdf.rect(marginLeft, pdf.lastAutoTable.finalY+10 , recWidth, recHeight)
        
    }
    //Rectangulo
    

    //Nombre
    marginLeft = 110
    pdf.text('Firma del Solicitante',marginLeft,marginBottomText,{align:'center'})
    marginBottomText += 5
    pdf.text(`${req.createdby.name}`,marginLeft,marginBottomText,{align:'center'})

    

    pdf.output('save',{
        format:[4,2],
        filename:`Requisicion Folio:${req.folio}`
    });
}

const Requisition = ({requisition}) =>{
    const stateClass = requisition.state
    const reviewedClass = requisition.reviewed
    let reviewed = 'Sin Revisar'
    if(reviewedClass){
        reviewed = 'Revisada'
    }

    let date = new Date(requisition.creationdate)
    const fecha = date.toLocaleDateString()

    return(
        <li className="tarea sombra" key={requisition.folio}>
            
            <div className="row">
                
                <div className="one-half column">
                    <div className="row">
                        <div className="one-half column">
                            <h4>Folio: <span className="fw-400">{requisition.folio}</span></h4>
                            <h4>Creada por: <span className="fw-400">{requisition.createdby.name}</span></h4>
                        </div>

                        <div className="one-half column">
                            <h4>Enviar a: <span className="fw-400">{requisition.sendTo}</span></h4>
                            <h4>Cliente: <span className="fw-400">{requisition.client}</span></h4>
                        </div>
                    </div>
                    
                    <div className="estado row">
                        <div className="one-half column">
                            <button className={`mb-5 u-full-width ${stateClass}`}>{requisition.state}</button>
                        </div>
                        <div className="one-half column">
                            <button className={`mb-5 u-full-width ${reviewedClass}`}>{reviewed}</button>
                        </div>
                        
                    </div>

                    <div className="row">
                        <div className="one-half column">
                            <button type="button" className="button button-primary" onClick={ ()=> handleClick(requisition)}>Generar PDF</button>
                        </div>

                        <div className="one-half column">
                            <button type="button" className="button button-delete" onClick={ ()=> handleClick(requisition)}>Eliminar</button>
                        </div>
                    </div>
                    
                    <h4>Comentarios: <span>{requisition.comments}</span></h4>
                </div>
                <div className="one-half column">
                    <table>
                        <thead className="table100-head">
                            <tr>
                                <th>Descripcion</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requisition.articles.map( article =>(
                                <tr key={article.article._id}>
                                    <td className="column1req">{article.article.description}</td>
                                    <td className="column2req">{article.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            
            
        </li>
    )
}

export default Requisition