import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
declare function iniciar():void;
declare function crearElemento(id: number):void;
declare function guardar():void;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    iniciar();
  }

  @ViewChild('content',{static:true}) el!: ElementRef<HTMLImageElement>
  @ViewChild('ctrFontSize',{static:true}) ctrFontSize!: ElementRef<HTMLInputElement>
  
  exportPDF() {
    // renderizar();
    // const mainCan = this.el.nativeElement;
    html2canvas(this.el.nativeElement, {
      allowTaint: true,
      logging: true,
      useCORS: true, //By passing this option in function Cross origin images will be rendered properly in the downloaded version of the PDF
      }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      const imageProps = pdf.getImageProperties(imgData)
      const pdfw = pdf.internal.pageSize.getWidth()
      const pdfh = (imageProps.height * pdfw)/imageProps.width
      pdf.addImage(imgData,'PNG',0,0,pdfw,pdfh);
      pdf.save('output.pdf');
    })
  }

  crear(id: number){
    crearElemento(id);
  }

  almacenar(){
    guardar();
  }

  start(){
    iniciar();
  }
  

}
