package app.pushbump.services;

import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;

import app.pushbump.modules.PushBump;

public class NotificationListener extends NotificationListenerService {

    @Override
    public void onNotificationPosted(StatusBarNotification notification) {
        PushBump.parseNotification(notification, false);
    }

    @Override
    public void onNotificationRemoved(StatusBarNotification notification) {
        PushBump.parseNotification(notification, true);
    }
}
