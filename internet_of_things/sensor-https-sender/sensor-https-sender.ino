
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>

// Replace with your network credentials
const char* ssid = "REPUBLICADOQUEIROIZ";
const char* password = "abcde10200";

const int analogInPin = A0;
int sensorValue = 0;
int outputValue = 0;
int criticity = 0;

String serverName = "https://us-central1-hackathon-4matt.cloudfunctions.net/updateRoom";
String serverPath = serverName + "?id=ufjf:ice:floor-1:101";

void setup() {
  Serial.begin(115200);
  //Serial.setDebugOutput(true);

  Serial.println();
  Serial.println();
  Serial.println();

  //Connect to Wi-Fi
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
}

void loop() {

  sensorValue = analogRead(analogInPin);
  outputValue = map(sensorValue, 0, 1023, 20, 50);
  criticity = map(outputValue, 28, 45, 5, 0);

  Serial.println();
  Serial.println("sensorValue");
  Serial.println(sensorValue);

  // wait for WiFi connection
  if ((WiFi.status() == WL_CONNECTED)) {

    std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);

    // Ignore SSL certificate validation
    client->setInsecure();
    
    //create an HTTPClient instance
    HTTPClient https;
    
    //Initializing an HTTPS communication using the secure client
    Serial.print("[HTTPS] begin...\n");
    if (https.begin(*client, serverPath.c_str())) {
      Serial.print("[HTTPS] GET...\n");

      // HTTPS header
      https.addHeader("Content-Type", "application/json");
      String color = "green";
      if (outputValue > 30) {
        color = "orange";
      }
      if (outputValue > 40) {
        color = "red";
      }
      String temperatureValue = String(outputValue);

      Serial.println(color);
      Serial.println(temperatureValue);

      String jsonData = "{\"status\":\"temperature under control\",\"fail_state\":\"false\",\"color\":\"" + color + "\",\"criticity\":" + criticity + ",\"system_operating\":\"true\",\"temperature\":" + temperatureValue + ",\"cooling\":\"true\",\"heating\":\"false\"}";
      
      Serial.println(jsonData);

      int httpCode = https.POST(jsonData);

      // httpCode will be negative on error
      if (httpCode > 0) {
        // HTTP header has been send and Server response header has been handled
        Serial.printf("[HTTPS] GET... code: %d\n", httpCode);
        // file found at server
        if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
          String payload = https.getString();
          Serial.println(payload);
        }
      } else {
        Serial.printf("[HTTPS] GET... failed, error: %s\n", https.errorToString(httpCode).c_str());
      }

      https.end();
    } else {
      Serial.printf("[HTTPS] Unable to connect\n");
    }
  }

  Serial.println();
  Serial.println("Proxima tentativa em 2 segundos.");
  delay(2000);
}


