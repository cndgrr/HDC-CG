import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { EventEmitter, Output } from '@angular/core';
export interface transferFormModel {
  memo: string | null;
  amount: number | null;
  recieverAddress: string | null;
}
export interface transferFormPayload {
  memo: string;
  amount: number;
  recieverAddress: string;
}
@Component({
  selector: 'cg-bank-justspend-form',
  template: ` <form
    #form="ngForm"
    class="w-[400px]"
    (ngSubmit)="onSubmitForm(form)"
  >
    <p>
      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Start spending</mat-label>
        <input
          name="memo"
          matInput
          type="text"
          placeholder="Yes, spend."
          [(ngModel)]="model.memo"
          required
          #memoControl="ngModel"
        />
        <mat-icon matSuffix>diamond</mat-icon>
        @if (form.submitted && memoControl.errors) {
          <mat-error>
            @if (memoControl.errors['required']) {
              Share your spending reason, don't be shy!
            }
          </mat-error>
        } @else {
          <mat-hint>What are you spending?</mat-hint>
        }
      </mat-form-field>
    </p>
    <mat-form-field appearance="fill" class="w-full mb-4">
      <mat-label>How much?</mat-label>
      <input
        name="amount"
        matInput
        type="number"
        min="1"
        placeholder="How much?"
        [(ngModel)]="model.amount"
        required
        #amountControl="ngModel"
      />
      <mat-icon matSuffix>sell</mat-icon>
      @if (form.submitted && amountControl.errors) {
        <mat-error>
          @if (amountControl.errors['required']) {
            Share your spending $$$, don't be shy!
          } @else if (amountControl.errors['min']) {
            You need to spend more!
          }
        </mat-error>
      } @else {
        <mat-hint>How much? How much?</mat-hint>
      }
    </mat-form-field>
    <mat-form-field appearance="fill" class="w-full mb-4">
      <mat-label>Who gets it? </mat-label>
      <input
        name="recieverAddress"
        matInput
        type="text"
        placeholder="Who gets it?"
        [(ngModel)]="model.recieverAddress"
        required
        #recieverAddressControl="ngModel"
      />
      <mat-icon matSuffix>shopping_basket</mat-icon>
      @if (form.submitted && recieverAddressControl.errors) {
        <mat-error>
          @if (recieverAddressControl.errors['required']) {
            Tell me who gets the money, don't be shy!
          } @else {
            <mat-hint>Who?</mat-hint>
          }
        </mat-error>
      }
    </mat-form-field>
    <footer class="flex justify-center">
      <button type="submit" mat-raised-button color="primary">LFS!</button>
    </footer>
  </form>`,
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInput, MatIcon, MatButton],
})
export class JustspendFormComponent {
  readonly model: transferFormModel = {
    amount: null,
    memo: null,
    recieverAddress: null,
  };
  @Output() readonly submitForm = new EventEmitter<transferFormPayload>();
  onSubmitForm(form: NgForm) {
    if (
      form.invalid ||
      this.model.amount === null ||
      this.model.memo === null ||
      this.model.recieverAddress === null
    ) {
      console.error('You are not spending.');
    } else {
      this.submitForm.emit({
        amount: this.model.amount,
        memo: this.model.memo,
        recieverAddress: this.model.recieverAddress,
      });
    }
  }
}
