import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@kubex/cube-icon/cube-icon.js';

/**
 An element providing a solution to no problem in particular.

 Example:

 <cube-action icon="iron:icons:star"></cube-action>

 @demo demo/index.html
 */
class CubeAction extends PolymerElement {
  static get is() {return 'cube-action';}

  static get template()
  {
    return html`<style>
       :host {
        position: relative;
        background: transparent;
        -webkit-tap-highlight-color: transparent;
        outline: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        cursor: pointer;
        z-index: 0;
        box-sizing: content-box;
        display: inline-flex;
        align-items: center;
        font-size: calc(var(--cube-icon-size, 24px) * 0.6);
        padding: 5px;
        @apply --cube-action-style;
      }

       :host([same-font]) {
        font-size: var(--cube-icon-size, 24px);
      }

       :host:hover {
        @apply --cube-action-hover-style;
      }

      paper-ripple {
        color: var(--paper-button-ink-color);
      }

      #container {
        display: flex;
        align-items: center;
      }

      #slottedContent {
        display: inline-flex;
        align-items: center;
      }
    </style>

    <div id="container">
      <template strip-whitespace="" is="dom-if" if="[[_showIcon(icon,src)]]">
        <cube-icon icon="[[icon]]" src="[[src]]" size="[[size]]"></cube-icon>
      </template>
      <div id="slottedContent">
        <slot></slot>
      </div>
    </div>
    <paper-ripple center="[[rippleCenter]]" class$="[[_rippleCircle(rippleCircle)]]"></paper-ripple>`;
  }

  static get properties()
  {
    return {
      icon: {type: String, notify: true, reflectToAttribute: true},
      src:  {type: String, notify: true, reflectToAttribute: true},
      size: {type: Number, notify: true, observer: '_styleChanged'},

      rippleCenter: {type: Boolean},
      rippleCircle: {type: Boolean}
    };
  }

  _showIcon(icon, src)
  {
    return icon || src;
  }

  _styleChanged()
  {
    if(this.size)
    {
      this.updateStyles({'--cube-icon-size': this.size + 'px'});
    }
  }

  _rippleCircle(rippleCircle)
  {
    return rippleCircle ? 'circle' : '';
  }
}

customElements.define(CubeAction.is, CubeAction);