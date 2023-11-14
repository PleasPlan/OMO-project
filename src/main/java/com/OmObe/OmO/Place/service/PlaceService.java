package com.OmObe.OmO.Place.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class PlaceService {

    @Value("${naver-map.id}")
    private String id;
    @Value("${naver-map.pw}")
    private String pw;

    public String getPlaces(String category) {
        String keyword;
        try{
            keyword = URLEncoder.encode(category, "UTF-8");
        }catch (UnsupportedEncodingException e){
            throw new RuntimeException("Encoding Failed",e);
        }

        String webAddress = "https://openapi.naver.com/v1/search/local.json?query="+keyword+"&display=10&start=1&sort=random";

        Map<String, String> requestHeader = new HashMap<>();
        requestHeader.put("X-Naver-Client-Id", id);
        requestHeader.put("X-Naver-Client-Secret", pw);
        String responseBody = get(webAddress, requestHeader);

        log.debug(responseBody);

        return responseBody;
    }

    private static String get(String webAddress, Map<String, String> requestHeader) {
        HttpURLConnection con = connect(webAddress);
        try{
            con.setRequestMethod("GET");
            for(Map.Entry<String, String> header : requestHeader.entrySet()){
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            int responseCode = con.getResponseCode();
            if(responseCode == HttpURLConnection.HTTP_OK){
                return readBody(con.getInputStream());
            } else {
                return readBody(con.getErrorStream());
            }
        } catch (IOException e){
            throw new RuntimeException("API request and response failed", e);
        } finally {
            con.disconnect();
        }
    }

    private static HttpURLConnection connect(String webAddress) {
        try {
            URL url = new URL(webAddress);
            return (HttpURLConnection)url.openConnection();
        }catch (MalformedURLException e){
            throw new RuntimeException("API URL is wrong. : " + webAddress, e);
        }catch (IOException e){
            throw new RuntimeException("Connection Failed. : " + webAddress, e);
        }
    }

    private static String readBody(InputStream body) {
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API response reading failed.", e);
        }
    }
}
