import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'search',
  imports: [MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  onInputValue = output<string>();

  onSendValue(value: Event): void {
    const input = value.target as HTMLInputElement;
    this.onInputValue.emit(input.value.trim());
  }
}
