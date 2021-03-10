package app.pushbump.models;

import android.app.Notification;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.service.notification.StatusBarNotification;
import android.util.Base64;

import java.io.ByteArrayOutputStream;

public class Message {

    private String app;
    private String icon;

    private String title;
    private String body;

    private boolean remove;

    private long time;

    public static Message create(Context context, StatusBarNotification statusBarNotification, boolean remove) {
        Notification notification = statusBarNotification.getNotification();

        Message message = new Message();

        message.app = getAppName(context, statusBarNotification);
        message.icon = getAppIcon(context, statusBarNotification);

        CharSequence title = notification.extras.getCharSequence("android.title");

        if (title != null) {
            message.title = title.toString();
        }

        CharSequence body = notification.extras.getCharSequence("android.text");

        if (body != null) {
            message.body = body.toString();
        }

        message.remove = remove;

        message.time = statusBarNotification.getPostTime();

        return message;
    }

    private static String getAppIcon(Context context, StatusBarNotification statusBarNotification) {
        try {
            Drawable icon = context.getPackageManager().getApplicationIcon(statusBarNotification.getPackageName());

            Bitmap bitmap = Bitmap.createBitmap(icon.getIntrinsicWidth(), icon.getIntrinsicHeight(), Bitmap.Config.ARGB_8888);

            Canvas canvas = new Canvas(bitmap);

            icon.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
            icon.draw(canvas);

            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

            bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);

            byte[] byteArray = byteArrayOutputStream.toByteArray();

            return Base64.encodeToString(byteArray, Base64.DEFAULT);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();

            return null;
        }
    }

    private static String getAppName(Context context, StatusBarNotification statusBarNotification) {
        try {
            PackageManager packageManager = context.getPackageManager();

            ApplicationInfo info = packageManager.getApplicationInfo(statusBarNotification.getPackageName(), PackageManager.GET_META_DATA);

            return packageManager.getApplicationLabel(info).toString();
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();

            return null;
        }
    }

    public Bundle toBundle() {
        Bundle bundle = new Bundle();

        bundle.putString("app", app);
        bundle.putString("icon", icon);

        bundle.putString("title", title);
        bundle.putString("body", body);

        bundle.putBoolean("remove", remove);

        bundle.putLong("time", time);

        return bundle;
    }
}
