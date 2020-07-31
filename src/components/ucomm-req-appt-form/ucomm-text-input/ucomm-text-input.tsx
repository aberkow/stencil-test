import { Component, h, State, Event, EventEmitter, Prop } from '@stencil/core'

@Component({
  tag: 'ucomm-text-input',
  shadow: true
})

export class MyInput {
  @Prop() inputId!: string

  @Prop() placeholder: string = 'Sam Smith'

  @Prop() stateTarget: string

  @State() value: string = ''

  @Event({
    eventName: 'ucTextInput',
    bubbles: false,
    composed: true
  }) ucTextInput: EventEmitter<Object>

  // @Listen('keydown')

  handleChange({ target }) {
    this.value = target.value
    this.ucTextInput.emit({
      value: this.value,
      inputId: this.inputId,
      stateTarget: this.stateTarget
    })
  }

  // handleKeyDown(evt) {
  //   console.log(evt, 'keydown')
  // }

  render() {
    return (
      <div>
        <input 
          type="text" 
          id={this.inputId} 
          value={this.value} 
          onChange={evt => this.handleChange(evt)} 
          placeholder={this.placeholder} 
        />
      </div>
    )
  }
}