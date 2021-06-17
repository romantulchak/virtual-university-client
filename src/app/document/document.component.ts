import { Component, Input, OnInit } from '@angular/core';
import { SubjectFile } from '../model/subject-file.model';
import { SubjectService } from '../service/subject.service';
import { saveAs } from 'file-saver';
import { timeout } from 'rxjs/operators';
@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  @Input() files: SubjectFile[];

  @Input() showDownloadButton: boolean = true;

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    console.log(this.files);
    
  }

  public downloadFile(filename: string){
    this.subjectService.downloadFile(filename).pipe(timeout(50000)).subscribe(res=>{
      let urlBlob = window.URL.createObjectURL(res);
      saveAs(urlBlob, filename);
    });
  }

}
