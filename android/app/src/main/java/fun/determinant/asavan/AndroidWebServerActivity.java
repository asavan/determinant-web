package fun.determinant.asavan;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;


public class AndroidWebServerActivity extends Activity {
    private static final int STATIC_CONTENT_PORT = 8080;
    private static final int WEB_SOCKET_PORT = 8088;
    public static final String WEB_VIEW_URL = "file:///android_asset/www/index.html";
    public static final String MAIN_LOG_TAG = "DETERMINANT_TAG";
    private static final boolean secure = false;

    private BtnUtils btnUtils;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        btnUtils = new BtnUtils(this, STATIC_CONTENT_PORT, WEB_SOCKET_PORT, secure);
        try {
            addButtons(IpUtils.getIPAddressSafe());
            btnUtils.launchWebView(WEB_VIEW_URL, null);
        } catch (Exception e) {
            TextView textIpAddress2 = findViewById(R.id.ipaddr2);
            textIpAddress2.setText(Arrays.toString(e.getStackTrace()));
            Log.e(MAIN_LOG_TAG, "main", e);
        }
    }

    private void addButtons(String formattedIpAddress) {
        HostUtils hostUtils = new HostUtils(STATIC_CONTENT_PORT, WEB_SOCKET_PORT, secure);
        final String host = hostUtils.getStaticHost(formattedIpAddress);
        final String webSocketHost = hostUtils.getSocketHost(formattedIpAddress);
        {
            btnUtils.addButtonWebView(WEB_VIEW_URL, null, R.id.button6);
        }
        {
            Map<String, String> b1 = new LinkedHashMap<>();
            b1.put("color", "red");
            b1.put("wh", webSocketHost);
            b1.put("sh", host);
            b1.put("mode", "net");
            btnUtils.addButtonBrowser(host, b1, R.id.button1);
            btnUtils.addButtonTwa(hostUtils.getStaticHost(IpUtils.LOCALHOST), b1, R.id.button2, host);
        }
        {
            Map<String, String> b = new LinkedHashMap<>();
            b.put("color", "blue");
            b.put("wh", webSocketHost);
            b.put("sh", host);
            b.put("mode", "net");
            btnUtils.addButtonTwa(hostUtils.getStaticHost(IpUtils.LOCALHOST), b, R.id.button5);
        }
        {
            Map<String, String> b = new LinkedHashMap<>();
            b.put("color", "blue");
            b.put("wh", hostUtils.getSocketHost(IpUtils.LOCAL_IP));
            b.put("sh", host);
            b.put("mode", "net");
            btnUtils.addButtonWebView(WEB_VIEW_URL, b, R.id.button9);
        }
        {
            Map<String, String> b = new LinkedHashMap<>();
            b.put("color", "blue");
            b.put("wh", hostUtils.getSocketHost(IpUtils.LOCAL_IP));
            b.put("sh", host);
            b.put("mode", "cheating");
            btnUtils.addButtonTwa(hostUtils.getStaticHost(IpUtils.LOCALHOST), b, R.id.cfirst);
        }
        {
            Map<String, String> b = new LinkedHashMap<>();
            b.put("color", "red");
            b.put("wh", hostUtils.getSocketHost(IpUtils.LOCAL_IP));
            b.put("sh", host);
            b.put("mode", "cheating");
            btnUtils.addButtonTwa(hostUtils.getStaticHost(IpUtils.LOCALHOST), b, R.id.csecond);
        }
    }

    @Override
    protected void onDestroy() {
        if (btnUtils != null) {
            btnUtils.onDestroy();
        }
        super.onDestroy();
    }
}
