package com.OmObe.OmO.MyPage.service;

import com.OmObe.OmO.Board.entity.Board;
import com.OmObe.OmO.Board.repository.BoardRepository;
import com.OmObe.OmO.MyPage.utility.pageUtility;
import com.OmObe.OmO.Place.entity.Place;
import com.OmObe.OmO.Place.entity.PlaceLike;
import com.OmObe.OmO.Place.entity.PlaceRecommend;
import com.OmObe.OmO.Place.repository.PlaceLikeRepository;
import com.OmObe.OmO.Place.repository.PlaceRecommendRepository;
import com.OmObe.OmO.Place.service.PlaceService;
import com.OmObe.OmO.member.entity.Member;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.NullNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.*;

@Service
@Slf4j
public class MyPageService {

    @Value("${kakao-map.key}")
    private String key;

    private final PlaceLikeRepository placeLikeRepository;
    private final PlaceRecommendRepository placeRecommendRepository;
    private final BoardRepository boardRepository;
    private final PlaceService placeService;

    public MyPageService(PlaceLikeRepository placeLikeRepository, PlaceRecommendRepository placeRecommendRepository, BoardRepository boardRepository, PlaceService placeService) {
        this.placeLikeRepository = placeLikeRepository;
        this.placeRecommendRepository = placeRecommendRepository;
        this.boardRepository = boardRepository;
        this.placeService = placeService;
    }

    public String findPlaceLikedByMember(Member member, int page, int size){
        pageUtility<PlaceLike> utility = new pageUtility<>();
        Slice<PlaceLike> placeLikeSlice = utility.convertToSlice(placeLikeRepository.findAll(utility.withMember(member),PageRequest.of(page,size)));
        List<PlaceLike> placeLikeList = placeLikeSlice.getContent();

        if(!placeLikeList.isEmpty()) {
            StringBuilder placeList = new StringBuilder("[");
            for (PlaceLike placeLike : placeLikeList) {
                Place place = placeLike.getPlace();
                String findPlace = getPlace(place.getPlaceName(), place.getPlaceId(), member);
                placeList.append(findPlace).append(",");
            }
            placeList.replace(placeList.length() - 1, placeList.length(), "]");
            return placeList.toString();
        } else {
            return "null";
        }
    }

    public String findPlaceRecommendByMember(Member member, int page, int size){
        pageUtility<PlaceRecommend> utility = new pageUtility<>();
        Slice<PlaceRecommend> placeLikeSlice = utility.convertToSlice(placeRecommendRepository.findAll(utility.withMember(member),PageRequest.of(page,size)));
        List<PlaceRecommend> placeLikeList = placeLikeSlice.getContent();

        if(!placeLikeList.isEmpty()) {
            StringBuilder placeList = new StringBuilder("[");
            for (PlaceRecommend placeRecommend : placeLikeList) {
                Place place = placeRecommend.getPlace();
                String findPlace = getPlace(place.getPlaceName(), place.getPlaceId(), member);
                placeList.append(findPlace).append(",");
            }
            placeList.replace(placeList.length() - 1, placeList.length(), "]");
            return placeList.toString();
        } else {
            return null;
        }
    }

    public List<Board> getMyBoard(Member member, int page, int size) throws JsonProcessingException {
        pageUtility<Board> utility = new pageUtility<>();
        Slice<Board> boards = utility.convertToSlice(boardRepository.findAll(utility.withMember(member),PageRequest.of(page,size)));
        List<Board> boardList = boards.getContent();
        return boardList;
    }

    // TODO : 프론트엔드 작업 끝나면 그거에 맞춰서 설계 예정. 이하는 기본 틀.

//    public String findLastPlace(Member member,int page,int size,List<String> placeNameList, List<Long> placeIdList){
//        int index = size*page;
//        if(placeNameList.get(index+size) != null){
//            StringBuilder placeList = new StringBuilder("[");
//            for(int i = 0; i<size; i++){
//
//                String placeName = placeNameList.get(index);
//                Long placeId = placeIdList.get(index);
//                String findPlace = getPlace(placeName,placeId,member);
//                placeList.append(findPlace).append(",");
//            }
//            placeList.replace(placeList.length() - 1, placeList.length(), "]");
//            return placeList.toString();
//        } else {
//            return "null";
//        }
//    }

    public String getPlace(String placeName,long placeId,Member member) {

        String keyword;
        try{
            keyword = URLEncoder.encode(placeName, "UTF-8");
        }catch (UnsupportedEncodingException e){
            throw new RuntimeException("Encoding Failed",e);
        }

        String webAddress = "https://dapi.kakao.com/v2/local/search/keyword.json?page=1&query="+keyword;

        Map<String, String> requestHeader = new HashMap<>();
//        requestHeader.put("X-Naver-Client-Id", id);
//        requestHeader.put("X-Naver-Client-Secret", pw);
        requestHeader.put("Authorization", "KakaoAK "+key);
        String responseBody = get(webAddress, requestHeader);

        responseBody = getOnePlace(responseBody,placeId, member);
        // TODO: MBTI 통계 내야됨. 장소 찜 및 따봉은 구현 전
        return responseBody;
    }

    private String getOnePlace(String jsonData, long placeId, Member member) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode jsonNode = objectMapper.readTree(jsonData);

            ArrayNode placesNode = jsonNode.get("documents").deepCopy();

            for(int index = 0; index<placesNode.size(); index++){
                ObjectNode objectNode = (ObjectNode) placesNode.get(index);
                long id = placesNode.get(index).get("id").asLong();
                if(placeId == id) {
                    log.info("id : " + id);
                    Place place = placeService.findPlace(id);

                    boolean mine = false;
                    boolean recommend = false;
                    List<PlaceLike> placeLikes = place.getPlaceLikeList();
                    List<PlaceRecommend> placeRecommends = place.getPlaceRecommendList();
                    for(PlaceLike placeLike: placeLikes){
                        if(placeLike.getMember() == member){
                            mine = true;
                            break;
                        }
                    }
                    for(PlaceRecommend placeRecommend: placeRecommends){
                        if(placeRecommend.getMember() == member){
                            recommend = true;
                            break;
                        }
                    }


                    objectNode.put("mine", mine);
                    objectNode.put("recommend", recommend);

                    JsonNode changedNode = objectNode;
                    placesNode.set(index,changedNode);
                }
                else{
                    NullNode nullNode = NullNode.instance;
                    placesNode.set(index,nullNode);
                }
            }

            Iterator<JsonNode> iterator = placesNode.iterator();
            while (iterator.hasNext()){
                if(iterator.next().isNull()){
                    iterator.remove();
                }
            }

            JsonNode resultNode = placesNode.get(0);
            return objectMapper.writeValueAsString(resultNode);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
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

    private static String readBody(InputStream body) throws UnsupportedEncodingException {
        InputStreamReader streamReader = new InputStreamReader(body,"UTF-8");

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
