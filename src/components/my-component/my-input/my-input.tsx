import { Component, h, State, Event, EventEmitter, Listen } from '@stencil/core'

@Component({
  tag: 'my-input',
  shadow: true
})

export class MyInput {
  @State() value: string = ''

  @Event({
    eventName: 'my-input-event',
    bubbles: false,
    composed: true
  }) myInputEvent: EventEmitter<String>

  @Listen('keydown')

  handleChange({ target }) {
    this.value = target.value
    this.myInputEvent.emit(this.value)
  }

  handleKeyDown(evt) {
    console.log(evt, 'keydown')
  }

  render() {
    return (
      <div>
        <input type="text" id="my-input" value={this.value} onChange={evt => this.handleChange(evt)} onKeyDown={evt => this.handleKeyDown(evt)} placeholder={this.value || 'test'} />
      </div>
    )
  }
}