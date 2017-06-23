import {Release} from "./release";
import {MD_DIALOG_DATA, MdSnackBar} from "@angular/material";
import {Component, Inject} from "@angular/core";
import {ClipboardService} from "ng2-clipboard";

@Component({
  selector: 'share-dialog',
  templateUrl: './release-detail-dialog.component.html',
})
export class ShareDialogComponent {
  isCopied: boolean = false;

  constructor(private clipboard: ClipboardService, public snackBar: MdSnackBar, @Inject(MD_DIALOG_DATA) public release: Release) {
  }

  openSnackBar() {
    this.snackBar.open('Copied!', '', {
      duration: 2000
    });
  }

  copyToClipboard(copy: string): void {
    this.clipboard.copy(copy);
    this.isCopied = true;
    this.openSnackBar();
  }
}
