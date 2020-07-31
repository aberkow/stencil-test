import { Component, h, State, Event, EventEmitter, Listen, Host, } from '@stencil/core';

@Component({
  tag: 'ucomm-req-appt-form',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {

  @State() data: { 
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    time: string,
    appointmentType: string
  } = { 
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    time: '',
    appointmentType: ''
  }

  @Event() testEvent: EventEmitter<Object>

  @Listen('ucTextInput')

  textChangeHandler(evt) {
    const { detail } = evt
    console.log(detail, 'ucTextInput')
    const target = detail.stateTarget
    this.data[target] = detail.value
    // this.data.middle = evt.detail
  }


  // handleChange({ target }) {
  //   this.data.first = target.value
  // }

  handleSubmit(evt) {
    evt.preventDefault()
    this.testEvent.emit(this.data)
  }

  componentWillRender() {
    return new Promise((resolve) => {
      console.log(this.data, 'something')
      resolve()
    }).then(res => {
      console.log(res, 'res?')
    }).catch(err => console.log(err, 'err'))
  }

  render() {
    return (
      <Host>
        <form onSubmit={evt => this.handleSubmit(evt)}>
          <slot name="firstName">
            <ucomm-text-input inputId="first-name" stateTarget="firstName" onChange={evt => this.textChangeHandler(evt)} />
          </slot>
          <slot name="lastName">
            <ucomm-text-input inputId="last-name" stateTarget="lastName" onChange={evt => this.textChangeHandler(evt)} />
          </slot>
          <input type="submit" value="Send"/>
        </form>
      </Host>
    )
  }
}
