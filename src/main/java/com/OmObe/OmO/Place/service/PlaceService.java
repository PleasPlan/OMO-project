package com.OmObe.OmO.Place.service;

import com.OmObe.OmO.Comment.service.CommentService;
import com.OmObe.OmO.Place.entity.Place;
import com.OmObe.OmO.Place.entity.PlaceLike;
import com.OmObe.OmO.Place.entity.PlaceRecommend;
import com.OmObe.OmO.Place.repository.PlaceLikeRepository;
import com.OmObe.OmO.Place.repository.PlaceRecommendRepository;
import com.OmObe.OmO.Place.repository.PlaceRepository;
import com.OmObe.OmO.Review.entity.Review;
import com.OmObe.OmO.Review.repository.ReviewRepository;
import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.member.service.MemberService;
import com.OmObe.OmO.util.PairJ;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class PlaceService {

//    @Value("${naver-map.id}")
//    private String id;
//    @Value("${naver-map.pw}")
//    private String pw;
    @Value("${kakao-map.key}")
    private String key;

    private final PlaceRepository placeRepository;
    private final ReviewRepository reviewRepository;
    private final PlaceLikeRepository placeLikeRepository;
    private final PlaceRecommendRepository placeRecommendRepository;
    private final CommentService commentService;
    private final MemberService memberService;

    public PlaceService(PlaceRepository placeRepository,
                        ReviewRepository reviewRepository,
                        PlaceLikeRepository placeLikeRepository,
                        PlaceRecommendRepository placeRecommendRepository,
                        CommentService commentService,
                        MemberService memberService) {
        this.placeRepository = placeRepository;
        this.reviewRepository = reviewRepository;
        this.placeLikeRepository = placeLikeRepository;
        this.placeRecommendRepository = placeRecommendRepository;
        this.commentService = commentService;
        this.memberService = memberService;
    }

    public String getPlaces(String category, PairJ<Double, Double> middle) {
        String keyword;
        try{
            keyword = URLEncoder.encode(category, "UTF-8");
        }catch (UnsupportedEncodingException e){
            throw new RuntimeException("Encoding Failed",e);
        }

        String y = middle.getFirst().toString();
        String x = middle.getSecond().toString();

        String webAddress = "https://dapi.kakao.com/v2/local/search/keyword.json?y="+y+"&x="+x+"&radius=20000&sort=distance&query="+keyword;

        Map<String, String> requestHeader = new HashMap<>();
//        requestHeader.put("X-Naver-Client-Id", id);
//        requestHeader.put("X-Naver-Client-Secret", pw);
        requestHeader.put("Authorization", "KakaoAK "+key);
        String responseBody = get(webAddress, requestHeader);

        responseBody = idTracker(responseBody);

        return responseBody;
    }

    public String getPlace(String placeName) {

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

        responseBody = getPlaceComments(responseBody);
        // TODO: MBTI 통계 내야됨. 장소 찜 및 따봉은 구현 전
        return responseBody;
    }

    public String putMineOrRecommend(long placeId,long memberId,boolean LR){
        Place place = findPlace(placeId);
        Member member = memberService.findVerifiedMember(memberId);


        Place newPlace = new Place();
        newPlace.setPlaceId(placeId);

        // Like = true, Recommend = false

        if(place != null){
            if(LR){
                Optional<PlaceLike> optionalPlaceLike = placeLikeRepository.findByMemberAndPlace(member,place);
                if(optionalPlaceLike.isPresent()){
                    PlaceLike existPlaceLike = optionalPlaceLike.orElseThrow();
                    place.deleteLikes(existPlaceLike);
                    placeLikeRepository.delete(existPlaceLike);
                } else {
                    PlaceLike like = new PlaceLike();
                    like.setPlace(place);
                    like.setMember(member);
                    place.addLikes(like);
                    placeLikeRepository.save(like);
                }

            }
            else{
                Optional<PlaceRecommend> optionalPlaceRecommend = placeRecommendRepository.findByMemberAndPlace(member,place);
                if(optionalPlaceRecommend.isPresent()){
                    PlaceRecommend existPlaceRecommend = optionalPlaceRecommend.orElseThrow();
                    place.deleteRecommends(existPlaceRecommend);
                    placeRecommendRepository.delete(existPlaceRecommend);
                } else {
                    PlaceRecommend recommend = new PlaceRecommend();
                    recommend.setPlace(place);
                    recommend.setMember(member);
                    place.addRecommends(recommend);
                    placeRecommendRepository.save(recommend);
                }
            }
            placeRepository.save(place);

            return "placeId : "+placeId+"\nmine : "+place.getPlaceLikeList().size()+"\nrecommend : "+place.getPlaceRecommendList().size();
        } else {
            if(LR){
                PlaceLike like = new PlaceLike();
                like.setPlace(place);
                like.setMember(member);
                newPlace.addLikes(like);
                placeLikeRepository.save(like);
            }
            else{
                PlaceRecommend recommend = new PlaceRecommend();
                recommend.setPlace(place);
                recommend.setMember(member);
                newPlace.addRecommends(recommend);
                placeRecommendRepository.save(recommend);
            }
            placeRepository.save(newPlace);
            return "placeId : "+newPlace.getPlaceId()+"\nmine : "+newPlace.getPlaceLikeList().size()+"\nrecommend : "+newPlace.getPlaceRecommendList().size();
        }
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

    private String idTracker(String jsonData) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(jsonData);

            JsonNode placesNode = jsonNode.get("documents");

            if(placesNode.isArray()){
                for(JsonNode placeNode : placesNode){
                    long id = placeNode.get("id").asLong();

                    log.info("id : "+id);

                    PairJ<Place, Boolean> place = findPlaceWithBoolean(id);

                    ObjectNode objectNode = (ObjectNode) placeNode;
                    if(place.getSecond()){
                        objectNode.put("mine", place.getFirst().getPlaceLikeList().size());
                        objectNode.put("recommend", place.getFirst().getPlaceRecommendList().size());
                    } else {
                        objectNode.put("mine",0);
                        objectNode.put("recommend", 0);
                    }
                    JsonNode changedNode = objectNode;
                    placeNode = changedNode;
                }
            }
            else {
                log.warn("No 'places' array found in the JSON data.");
            }

            return objectMapper.writeValueAsString(jsonNode);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private String getPlaceComments(String jsonData) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(jsonData);

            JsonNode placesNode = jsonNode.get("documents");

            if(placesNode.isArray()){
                for(JsonNode placeNode : placesNode){
                    long id = placeNode.get("id").asLong();

                    log.info("id : "+id);

                    PairJ<Place, Boolean> place = findPlaceWithBoolean(id);

                    ObjectNode objectNode = (ObjectNode) placeNode;
                    if(place.getSecond()){
                        objectNode.put("mine", place.getFirst().getPlaceLikeList().size());
                        objectNode.put("recommend", place.getFirst().getPlaceRecommendList().size());
                        ArrayNode reviews = JsonNodeFactory.instance.arrayNode();
                        Optional<List<Review>> optionalReviewList = reviewRepository.findByPlaceName(place.getFirst().getPlaceName());
                        if(optionalReviewList.isPresent()){
                            List<Review> reviewList = optionalReviewList.get();
                            for(Review review: reviewList){
                                ObjectNode reviewNode = objectMapper.createObjectNode();
                                reviewNode.put("writer", review.getMember().getNickname());
                                reviewNode.put("content", review.getContent());
                                // TODO: 이미지 넣어야 됨.
                                reviews.add(reviewNode);
                            }
                        }
                        objectNode.set("reviews", reviews);
                    } else {
                        objectNode.put("mine",0);
                        objectNode.put("recommend", 0);
                    }
                    JsonNode changedNode = objectNode;
                    placeNode = changedNode;
                }
            }
            else {
                log.warn("No 'place' array found in the JSON data.");
            }

            return objectMapper.writeValueAsString(jsonNode);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private PairJ<Place, Boolean> findPlaceWithBoolean(long placeId){
        Optional<Place> optionalPlace = placeRepository.findById(placeId);
        PairJ<Place, Boolean> result = new PairJ<>();
        result.setSecond(optionalPlace.isPresent());    // false면 없고 true면 있음
        if(optionalPlace.isEmpty()){
            result.setFirst(null);
        } else {
            result.setFirst(optionalPlace.orElseThrow());
        }
        return result;
    }

    private Place findPlace(long placeId){
        Optional<Place> optionalPlace = placeRepository.findById(placeId);
        if(optionalPlace.isEmpty()){
            return null;
        }else {
            Place place = optionalPlace.orElseThrow();
            return place;
        }
    }


}
