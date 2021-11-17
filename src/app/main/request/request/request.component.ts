import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, map, tap} from 'rxjs/operators';
import {UploadFileModalComponent} from './upload-file-modal/upload-file-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {RequestService} from '../../services/request.service';
import {SearchModalComponent} from './search-modal/search-modal.component';
import {UserService} from '../../../user/user.service';
import {TransferRequestModalComponent} from '../transfer-request-modal/transfer-request-modal.component';
import {DictionariesService} from '../../services/dictionaries.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  id: null | number = null;
  @ViewChild('fileInput') file: ElementRef | undefined;
  extensionFile = ['csv'];
  isSaved = false;
  requestData$ = this.service.requestData$;

  get isAdd(): boolean {
    return this.id == null;
  }

  get isAdmin(): boolean {
    return !this.userService.isUserNotAdmin;
  }

  constructor(
    private route: ActivatedRoute,
    private service: RequestService,
    private userService: UserService,
    private dictionaryService: DictionariesService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if(this.dictionaryService.dictionary$.getValue() == null) {
      this.dictionaryService.getData()
    }

    this.route.params
      .pipe(
        map(({id}) => Number(id)),
        tap(id => isNaN(id) && this.service.addNewRequest()),
        filter(id => !isNaN(id)),
        tap(id => this.id = id)
      )
      .subscribe(id => this.service.getRequestData(id));
  }

  changedFile() {
    const fileType = this.file?.nativeElement.files[0].type;

    if (!this.extensionFile.some(ext => fileType.includes(ext))) {
      this.dialog.open(UploadFileModalComponent, {
        width: '320px',
        data: {extends: this.extensionFile}
      });
    }
  }

  save() {
    this.service.saveRequest().subscribe(data => {
      this.isSaved = true;
    })
  }

  search() {
    this.dialog.open(SearchModalComponent, {
      width: '320px'
    });
  }

  transfer() {
    this.dialog.open(TransferRequestModalComponent, {
      width: '400px'
    });
  }
}
