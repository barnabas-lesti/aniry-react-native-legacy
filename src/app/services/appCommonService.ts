import { Subject } from 'rxjs';

interface AppNotification {
  text?: string;
  textKey?: string;
}

class AppCommonService {
  public readonly NOTIFICATION_DURATION = 3000;
  private readonly notificationSubject = new Subject<AppNotification>();
  private readonly loaderSubject = new Subject<boolean>();

  startLoading() {
    this.loaderSubject.next(true);
  }

  stopLoading() {
    this.loaderSubject.next(false);
  }

  onLoadingStateChange(callback: (isLoading: boolean) => void) {
    this.loaderSubject.subscribe(callback);
  }

  /**
   * Pushes a new notification.
   * @param text Notification text.
   */
  pushNotification(text: string) {
    this.notificationSubject.next({ text });
  }

  /**
   * Pushes a new notification key.
   * @param textKey Notification text key.
   */
  pushNotificationKey(textKey: string) {
    this.notificationSubject.next({ textKey });
  }

  /**
   * On notification handler function.
   * @param callback Callback to be executed on new notification.
   */
  onNotification(callback: (notification: AppNotification) => void) {
    this.notificationSubject.subscribe(callback);
  }
}

/**
 * App common service.
 */
export const appCommonService = new AppCommonService();
