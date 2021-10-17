import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {UploadFileModalComponent} from "./upload-file-modal/upload-file-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {RequestService} from '../../services/request.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  id: null | number = null;
  @ViewChild('fileInput') file: ElementRef | undefined;
  extensionFile = ['csv'];

  get isAdd(): boolean {
    return this.id == null;
  }

  constructor(private route: ActivatedRoute, private service: RequestService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(({id}) => Number(id)),
        tap(id => isNaN(id) && this.service.addNewRequest()),
        filter(id => !isNaN(id)),
        tap(id => this.id = id),
      )
      .subscribe(id => this.service.getRequestData(id));
  }

  changedFile() {
    console.log(this.file?.nativeElement.files);
    const type = this.file?.nativeElement.files[0].type;
    const ext = type.substr(type.lastIndexOf('/') + 1);
    if( this.extensionFile.indexOf(ext) === -1  ) {
      const dialogRef = this.dialog.open(UploadFileModalComponent, {
        width: '320px',
        data: {extends: this.extensionFile}
      });
    }
  }
}
