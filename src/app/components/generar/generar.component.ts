import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
declare function iniciar():void;

@Component({
  selector: 'app-generar',
  templateUrl: './generar.component.html',
  styleUrls: ['./generar.component.scss']
})
export class GenerarComponent implements OnInit {
  @ViewChild('content',{static:true}) el!: ElementRef<HTMLImageElement>
  @ViewChild('nombre',{static:true}) inputNombre!: ElementRef<HTMLInputElement>
  @ViewChild('promedio',{static:true}) inputPromedio!: ElementRef<HTMLInputElement>
  constructor() { }

  ngOnInit(): void {
    iniciar();
    // const d = localStorage.getItem("content");
    // if(d){
    //   this.el.nativeElement.innerHTML = d;
    //   iniciar();
    // }
  }

  exportPDF() {
    const textos = this.el.nativeElement.querySelectorAll('h1');
    const nombre = this.el.nativeElement.querySelector('#nombre');
    const fecha = this.el.nativeElement.querySelector('#fecha');
    const fechaHoy = new Date();
    const optionsDate: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaCompleta = fechaHoy.toLocaleDateString("es-MX", optionsDate);
    for (let index = 0; index < textos.length; index++) {
      textos[index].innerText = textos[index].innerText.replace('{fechaCompleta}', fechaCompleta);
      textos[index].innerText = textos[index].innerText.replace('{nombreAlumno}', this.inputNombre.nativeElement.value);
      textos[index].innerText = textos[index].innerText.replace('{promedio}', this.inputPromedio.nativeElement.value);
    }
    
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

}
