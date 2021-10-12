import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {RequestService} from '../../request.service';
import {UploadFileModalComponent} from "./upload-file-modal/upload-file-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  id: null | number = null;
  file: any;
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
    console.log('file: ', this.file);
    var ext = this.file.substr(this.file.lastIndexOf('.') + 1);
    if( this.extensionFile.indexOf(ext) === -1  ) {
      const dialogRef = this.dialog.open(UploadFileModalComponent, {
        width: '320px',
        data: {extends: this.extensionFile}
      });
    }
  }
}
