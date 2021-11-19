import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, switchMap, tap} from 'rxjs/operators';
import {UploadFileModalComponent} from './upload-file-modal/upload-file-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {RequestService} from '../../services/request.service';
import {SearchModalComponent} from './search-modal/search-modal.component';
import {UserService} from '../../../user/user.service';
import {TransferRequestModalComponent} from '../transfer-request-modal/transfer-request-modal.component';
import {DictionariesService} from '../../services/dictionaries.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {ConfirmModalComponent} from "./confirm-modal/confirm-modal.component";

@UntilDestroy()
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  id: null | number = null;
  @ViewChild('fileInput') file: ElementRef | undefined;
  extensionFile = ['csv'];
  requestData$ = this.service.requestData$;
  canSearch$ = this.service.canSearch$;
  disableAdminBtn$ = this.service.disableAdminBtn$;
  canSave$ = this.service.canSave$;
  isInWork = false;
  get isAdd(): boolean {
    return this.id == null;
  }

  get isAdmin(): boolean {
    return !this.userService.isUserNotAdmin;
  }


  constructor(
    private route: ActivatedRoute,
    public service: RequestService,
    public userService: UserService,
    private dictionaryService: DictionariesService,
    private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.dictionaryService.dictionary$.getValue() == null) {
      this.dictionaryService.getData();
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
    this.service.saveRequest()
      .pipe(
        switchMap(data => this.router.navigate(['/request/', data.id]))
      )
      .subscribe();
  }

  reject() {
    const id = this.id;
    let confirm = false;
    const dialogReject = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
    });

    dialogReject.afterClosed().subscribe(result => {
      confirm = result === 'confirm';
      if (confirm && id) {
        this.service.reject(id).pipe(
          untilDestroyed(this)
        ).subscribe(() => this.service.getRequestData(id));
      }
    });
    if (confirm && id) {
      this.service.reject(id).pipe(
        untilDestroyed(this)
      ).subscribe(() => this.service.getRequestData(id));
    }
  }

  complete() {
    const id = this.id;
    let confirm = false;
    const dialogComplete = this.dialog.open(ConfirmModalComponent, {
      width: '300px',
    });

    dialogComplete.afterClosed().subscribe(result => {
      confirm = result === 'confirm';
      if (confirm && id != null) {
        this.service.complete(id)
          .pipe(untilDestroyed(this))
          .subscribe(() => this.service.getRequestData(id));
      }
    });
  }

  search() {
    this.service.searchResources(this.id!!).subscribe(() => {
      this.dialog.open(SearchModalComponent, {
        width: '320px',
      });
    });
  }

  transfer() {
    this.dialog.open(TransferRequestModalComponent, {
      width: '400px'
    });
  }

  inWork() {
    const id = this.id;
    if(id) {
      this.service.setResponsible(id.toString(), '3')
        .pipe(untilDestroyed(this))
        .subscribe((val) => {
          console.log(val);
          if(val) {
            this.isInWork = true;
            this.service.getRequestData(id);
          }
        });
    }
  }
}
