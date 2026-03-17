import type { useAppProps as UseAppProps } from "antdv-next/dist/app/context";

import {
  message as messageApi,
  Modal,
  notification as notificationApi,
} from "antdv-next";

export const useAppContext = createGlobalState(() => {
  const _message = {} as UseAppProps["message"];
  const _notification = {} as UseAppProps["notification"];
  const _modal = {} as UseAppProps["modal"];
  // 对对象进行代理

  const registerApp = (app: UseAppProps) => {
    Object.assign(_message, app.message);
    Object.assign(_notification, app.notification);
    Object.assign(_modal, app.modal);
  };
  // 代理对象，可以自动进行fallback
  const message = new Proxy(_message, {
    get(target, prop) {
      if (prop in target) {
        return Reflect.get(target, prop);
      }
      return Reflect.get(messageApi, prop);
    },
  });
  const notification = new Proxy(_notification, {
    get(target, prop) {
      if (prop in target) {
        return Reflect.get(target, prop);
      }
      return Reflect.get(notificationApi, prop);
    },
  });
  const modal = new Proxy(_modal, {
    get(target, prop) {
      if (prop in target) {
        return Reflect.get(target, prop);
      }
      return Reflect.get(Modal, prop);
    },
  });
  return {
    message,
    notification,
    modal,
    registerApp,
  };
});
