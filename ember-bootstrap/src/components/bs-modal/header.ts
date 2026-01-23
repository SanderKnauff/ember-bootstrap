/**
 *
 * Modal header element used within [Components.Modal](Components.Modal.html) components. See there for examples.
 *
 * @class ModalHeader
 * @namespace Components
 * @extends Glimmer.Component
 * @public
 */

/**
 * Show a close button (x icon)
 *
 * @property closeButton
 * @type boolean
 * @default true
 * @public
 */

/**
 * The title to display in the modal header
 *
 * @property title
 * @type string
 * @default null
 * @public
 */

/**
 * @property titleComponent
 * @type {String}
 * @private
 */

/**
 * @property closeComponent
 * @type {String}
 * @private
 */

/**
 * @event onClose
 * @public
 */
import type { ComponentLike } from '@glint/template';
import type { TitleSignature } from './header/title';
import type { CloseSignature } from './header/close';
import TitleComponent from './header/title.ts';
import CloseComponent from './header/close.ts';
import Component from '@glimmer/component';

export interface HeaderSignature {
  Args: {
    closeButton?: boolean;
    title?: string;
    titleComponent?: ComponentLike<TitleSignature>;
    closeComponent?: ComponentLike<CloseSignature>;
    onClose?: () => void;
  };
  Blocks: {
    default: [
      {
        title: ComponentLike<TitleSignature>;
        close: ComponentLike<CloseSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class Header extends Component<HeaderSignature> {
  /**
   * @private
   */
  get titleComponent(): ComponentLike<TitleSignature> {
    return this.args.titleComponent ?? TitleComponent;
  }
  /**
   * @private
   */
  get closeComponent(): ComponentLike<CloseSignature> {
    return this.args.closeComponent ?? CloseComponent;
  }
}
