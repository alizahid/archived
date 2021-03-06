package app.pushbump.services;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class Worker extends HeadlessJsTaskService {

    @Override
    protected @Nullable
    HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();

        if (extras != null) {
            return new HeadlessJsTaskConfig(
                    "PushBumpWorker",
                    Arguments.fromBundle(extras),
                    5000,
                    true
            );
        }

        return null;
    }
}
