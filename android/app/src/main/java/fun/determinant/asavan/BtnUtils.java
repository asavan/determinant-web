package fun.determinant.asavan;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.widget.Button;
import android.widget.TextView;

import com.google.androidbrowserhelper.trusted.QualityEnforcer;
import com.google.androidbrowserhelper.trusted.TwaLauncher;

import java.util.Arrays;
import java.util.Map;

import androidx.browser.trusted.TrustedWebActivityIntentBuilder;

import fi.iki.elonen.NanoHTTPD;

public class BtnUtils {
    private final int staticContentPort;
    private final Activity activity;
    private WebServer server = null;

    public BtnUtils(Activity activity, int staticContentPort) {
        this.staticContentPort = staticContentPort;
        this.activity = activity;
    }

    public void launchWebView(String host, Map<String, String> parameters) {
        Intent intent = new Intent(activity.getApplicationContext(), WebViewActivity.class);
        String launchUrl = UrlUtils.getLaunchUrl(host, parameters);
        Log.i("BTN_UTILS", launchUrl);
        intent.putExtra("url", launchUrl);
        activity.startActivity(intent);
    }

    public void addButtonBrowser(final String host, Map<String, String> parameters, int btnId) {
        Button btn = activity.findViewById(btnId);
        btn.setOnClickListener(v -> {
            launchBrowser(host, parameters);
        });
    }

    public void addButtonWebView(final String host, Map<String, String> parameters, int btnId) {
        Button btn = activity.findViewById(btnId);
        btn.setOnClickListener(v -> {
            launchWebViewAndServer(host, parameters);
        });
    }

    public void addButtonTwa(String host, Map<String, String> parameters, int id) {
        addButtonTwa(host, parameters, id, null);
    }

    public void addButtonTwa(String host, Map<String, String> parameters, int id, String text) {
        Button btn = activity.findViewById(id);
        if (text != null) {
            btn.setText(text);
        }
        btn.setOnClickListener(v -> launchTwa(host, parameters));
    }

    private void launchBrowser(String host, Map<String, String> parameters) {
        startServerAndSocket();
        Uri launchUri = Uri.parse(UrlUtils.getLaunchUrl(host, parameters));
        activity.startActivity(new Intent(Intent.ACTION_VIEW, launchUri));
    }


    private void launchWebViewAndServer(String host, Map<String, String> parameters) {
        startServerAndSocket();
        launchWebView(host, parameters);
    }

    private void launchTwa(String host, Map<String, String> parameters) {
        startServerAndSocket();
        Uri launchUri = Uri.parse(UrlUtils.getLaunchUrl(host, parameters));
        TwaLauncher launcher = new TwaLauncher(activity);
        launcher.launch(new TrustedWebActivityIntentBuilder(launchUri), new QualityEnforcer(), null, null);
    }

    private void startServerAndSocket() {
        if (server != null) {
            return;
        }
        try {
            Context applicationContext = activity.getApplicationContext();
            server = new WebServer(applicationContext, staticContentPort);
            server.start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
        } catch (Exception e) {
            TextView textIpAddress2 = activity.findViewById(R.id.ipaddr2);
            textIpAddress2.setText(Arrays.toString(e.getStackTrace()));
            Log.e("BTN_UTILS", "main", e);
        }
    }

    protected void onDestroy() {
        if (server != null) {
            server.stop();
        }
        server = null;
    }
}
