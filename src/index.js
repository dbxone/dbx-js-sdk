import * as _ from './utils';

export const mui = {
  fire(webview, eventType, data) {
    if (webview) {
      if (_.isUndefined(data)) {
        data = '';
      } else if (_.isBoolean(data) || _.isNumber(data)) {
        webview.evalJS(`typeof mui!=='undefined'&&mui.receive('${eventType}',${data})`);
        return;
      } else if (_.isPlainObject(data) || _.isArray(data)) {
        data = JSON.stringify(data || {})
          .replace(/\'/g, '\\u0027')
          .replace(/\\/g, '\\u005c');
      }
      webview.evalJS(`typeof mui!=='undefined'&&mui.receive('${eventType}','${data}')`);
    }
  },
  trigger(element, eventType, data) {
    element.dispatchEvent(
      new CustomEvent(eventType, {
        detail: data,
        bubbles: true,
        cancelable: true
      })
    );
  },
  receive(eventType, data) {
    if (eventType) {
      if (_.isString(data)) {
        try {
          data = JSON.parse(data);
        } catch (e) {}
      }

      mui.trigger(document, eventType, data);
    }
  }
};

let parentWin;
const listeners = {};
const EVENT_TYPES = {
  PLUS_READY: 'plusready',
  ON_GET_FEE_DONE: 'onGetFeeDone',
  ON_GET_ASSETS_DONE: 'onGetAssetsDone',
  ON_GET_ACCOUNT_DONE: 'onGetAccountDone',
  ON_GET_BALANCE_DONE: 'onGetBalanceDone',
  ON_TRANSACTION_DONE: 'onTransactionDone'
};
const eventProxy = {
  handleEvent: function(e) {
    var data = e.detail || {};
    var handler = listeners[e.type];

    if (e.type === EVENT_TYPES.PLUS_READY && !_.isUndefined(plus)) {
      var currWebView = plus.webview.currentWebview();
      parentWin = currWebView.parent();
    }

    if (_.isFunction(handler)) {
      return handler.apply(null, [data]);
    }

    if (handler) {
      if (data.success) {
        _.isFunction(handler.success) &&
          handler.success.apply(null, [data.data]);
      } else {
        _.isFunction(handler.error) && handler.error.apply(null, [data.error]);
      }
    }
  }
};

Object.values(EVENT_TYPES).forEach(type => {
  document.addEventListener(type, eventProxy, false);
});

function onAndFireEvent(options, key, type) {
  if (_.isString(options)) {
    return parentWin && mui.fire(parentWin, options);
  }

  if (_.isPlainObject(options)) {
    const { success, error, ...data } = options;

    if (key) {
      const handler = listeners[key] || (listeners[key] = {});

      handler['error'] = error;
      handler['success'] = success;
    }

    parentWin && mui.fire(parentWin, type, data);
  }
}

export const DBX = {
  ready: function(cb) {
    listeners[EVENT_TYPES.PLUS_READY] = cb;
  },
  back: function() {
    onAndFireEvent('back');
  },
  close: function() {
    onAndFireEvent('close');
  },
  reload: function() {
    onAndFireEvent('reload');
  },
  refresh: function() {
    onAndFireEvent('refresh');
  },
  forward: function() {
    onAndFireEvent('forward');
  },
  enablePullToRefresh: function() {
    onAndFireEvent('enablePullToRefresh');
  },
  disablePullToRefresh: function() {
    onAndFireEvent('disablePullToRefresh');
  },
  startPullToRefresh: function() {
    onAndFireEvent('startPullToRefresh');
  },
  stopPullToRefresh: function() {
    onAndFireEvent('stopPullToRefresh');
  },
  getFee: function(config) {
    onAndFireEvent(config, EVENT_TYPES.ON_GET_FEE_DONE, 'getFee');
  },
  getAssets: function(config) {
    onAndFireEvent(config, EVENT_TYPES.ON_GET_ASSETS_DONE, 'getAssets');
  },
  getAccount: function(config) {
    onAndFireEvent(config, EVENT_TYPES.ON_GET_ACCOUNT_DONE, 'getAccount');
  },
  getBalance: function(config) {
    onAndFireEvent(config, EVENT_TYPES.ON_GET_BALANCE_DONE, 'getBalance');
  },
  transaction: function(config) {
    onAndFireEvent(config, EVENT_TYPES.ON_TRANSACTION_DONE, 'transaction');
  }
};

if (!_.isUndefined(window)) {
  window.mui == window.mui || (window.mui = mui);
  window.DBX == window.DBX || (window.DBX = DBX);
}

export default DBX;
