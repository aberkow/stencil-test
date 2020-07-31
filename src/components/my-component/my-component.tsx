import { Component, Prop, h, State, Event, EventEmitter, Listen, } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  @State() data: { 
    first: string,
    middle: string,
    last: string 
  } = { 
    first: this.first || '',
    middle: this.middle || '',
    last: this.last || '' 
  }

  @Event() testEvent: EventEmitter<Object>

  @Listen('my-input-event')

  testEventHandler(evt) {
    console.log(evt, 'my-input-event')
    this.data.middle = evt.detail
  }


  handleChange({ target }) {
    this.data.first = target.value
  }

  handleSubmit(evt) {
    evt.preventDefault()
    console.log('submitted', this.data.first)
    this.testEvent.emit(this.data)
  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
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
      <div>
        <div>Hello world, I'm {this.getText()}</div>
        <p><strong>{this.data.first}</strong></p>
        <form action="" onSubmit={evt => this.handleSubmit(evt)}>
          <input type="text" id="first-name" value={this.data.first} onChange={evt => this.handleChange(evt)} placeholder={this.data.first} />
          <my-input onChange={evt => this.testEventHandler(evt)} />
          <input type="submit" value="Send"/>
        </form>
      </div>
    )
  }
}
