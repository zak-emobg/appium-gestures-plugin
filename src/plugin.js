import BasePlugin from '@appium/base-plugin';
import dragAndDrop from './gestures/dragAndDrop';
import LeftRightSwipeBuilder from './gestures/leftRightSwipe';
import RightLeftSwipeBuilder from './gestures/rightLeftSwipe';

const SOURCE_URL_RE = new RegExp('/session/[^/]+/plugin/actions/');

export default class GesturesPlugin extends BasePlugin {
  constructor(pluginName) {
    super(pluginName);
  }

  static newMethodMap = {
    '/session/:sessionId/plugin/actions/dragAndDrop': {
      POST: {
        command: 'dragAndDrop',
        payloadParams: { required: ['sourceId', 'destinationId'] },
      },
    },
    '/session/:sessionId/plugin/actions/leftRightSwipe': {
      POST: {
        command: 'leftRightSwipe',
        payloadParams: { required: ['elementId', 'percentage'] },
      },
    },
    '/session/:sessionId/plugin/actions/rightLeftSwipe': {
      POST: {
        command: 'rightLeftSwipe',
        payloadParams: { required: ['elementId', 'percentage'] },
      },
    },
  };

  shouldAvoidProxy(method, route, body) {
    this.body = body;
    return SOURCE_URL_RE.test(route);
  }

  async leftRightSwipe(next, driver) {
    const builder = LeftRightSwipeBuilder(this.body, driver);
    await builder.leftRight;
  }

  async rightLeftSwipe(next, driver) {
    const builder = RightLeftSwipeBuilder(this.body, driver);
    await builder.rightLeft;
  }

  async dragAndDrop(next, driver) {
    const builder = dragAndDrop(this.body, driver);
    await builder.dragAndDrop;
  }
}
