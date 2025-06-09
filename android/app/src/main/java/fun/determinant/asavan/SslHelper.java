package fun.determinant.asavan;

import android.content.Context;
import android.util.Log;

import java.io.InputStream;
import java.security.KeyStore;

import javax.net.ssl.KeyManagerFactory;

import fi.iki.elonen.NanoHTTPD;

public class SslHelper {
    public static void addSslSupport(Context context, NanoHTTPD nanoHTTPD) {
        try {
            nanoHTTPD.makeSecure(NanoHTTPD.makeSSLSocketFactory(
                    "/keystore.jks", "password".toCharArray()), null);
        } catch (Exception ex) {
            Log.e("DETERMINANT_TAG", "SSl support error", ex);
        }
    }
}
