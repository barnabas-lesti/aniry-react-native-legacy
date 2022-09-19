import { Subject } from 'rxjs';

class AppNotificationService {
  private readonly subject = new Subject<string>();

  public readonly NOTIFICATION_DURATION = 3000;

  /**
   * Pushes a new notification ot the subject.
   * @param notificationKey Localization key of the notification.
   */
  pushNotification(notificationKey: string) {
    this.subject.next(notificationKey);
  }

  /**
   * On notification handler function.
   * @param callback Callback to be executed on new notification.
   */
  onNotification(callback: (notificationKey: string) => void) {
    this.subject.subscribe(callback);
  }
}

/**
 * App notification service.
 */
export const appNotificationService = new AppNotificationService();
