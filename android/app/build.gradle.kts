plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "fun.determinant.asavan"
    compileSdk = 37

    defaultConfig {
        applicationId = "fun.determinant.asavan"
        minSdk = 24
        targetSdk = 37
        versionCode = 21
        versionName = "1.6.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    packaging {
        jniLibs {
            pickFirsts += "META-INF/nanohttpd/*"
        }
        resources {
            pickFirsts += "META-INF/nanohttpd/*"
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            optimization {
                enable = false
            }
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
}

dependencies {
    implementation(libs.nanohttpd)
    implementation(libs.org.nanohttpd.nanohttpd.websocket)
    implementation(libs.androidbrowserhelper)
    implementation(libs.webkit)

    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
}
