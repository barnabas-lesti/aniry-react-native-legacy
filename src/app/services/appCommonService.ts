import { Subject } from 'rxjs';

class AppCommonService {
  public readonly NOTIFICATION_DURATION = 3000;
  private readonly notificationSubject = new Subject<string>();
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
   * Pushes a new notification ot the subject.
   * @param notificationKey Localization key of the notification.
   */
  pushNotification(notificationKey: string) {
    this.notificationSubject.next(notificationKey);
  }

  /**
   * On notification handler function.
   * @param callback Callback to be executed on new notification.
   */
  onNotification(callback: (notificationKey: string) => void) {
    this.notificationSubject.subscribe(callback);
  }
}

/**
 * App common service.
 */
export const appCommonService = new AppCommonService();
