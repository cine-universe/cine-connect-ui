import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  imports: [],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss',
})
export class DeleteDialog {
  category: string = '';
  name: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    readonly dialogRef: MatDialogRef<DeleteDialog>
  ) {
    this.category = data.category;
    this.name = data.name;
  }

  onClose() {
    this.dialogRef.close(false)
  }

  onDelete() {
    this.dialogRef.close(true)
  }
}
