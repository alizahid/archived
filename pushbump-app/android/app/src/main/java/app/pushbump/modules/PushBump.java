package app.pushbump.modules;

import android.content.ContentResolver;
import android.content.Intent;
import android.provider.Settings;
import android.service.notification.StatusBarNotification;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import app.pushbump.models.Message;
import app.pushbump.services.NotificationListener;
import app.pushbump.services.Worker;

public class PushBump extends ReactContextBaseJavaModule {

    private static ReactApplicationContext context;

    public PushBump(ReactApplicationContext context) {
        super(context);

        PushBump.context = context;
    }

    @ReactMethod
    public void hasAccess(Promise promise) {
        ContentResolver contentResolver = context.getContentResolver();
        String packageName = NotificationListener.class.getName();

        Boolean allowed = Settings.Secure.getString(contentResolver, "enabled_notification_listeners").contains(packageName);

        promise.resolve(allowed);
    }

    @ReactMethod
    public void requestAccess() {
        Intent intent = new Intent("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS");

        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        context.startActivity(intent);
    }

    public static void parseNotification(StatusBarNotification statusBarNotification, boolean remove) {
        if (statusBarNotification.getTag() == null) {
            return;
        }

        Message message = Message.create(context, statusBarNotification, remove);

        sendNotification(message);
    }

    private static void sendNotification(Message message) {
        Intent service = new Intent(context, Worker.class);

        service.putExtras(message.toBundle());

        context.startService(service);
    }

    @Override
    public String getName() {
        return "PushBump";
    }
}
