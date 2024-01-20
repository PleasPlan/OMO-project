package com.OmObe.OmO.Place.entity;

import com.OmObe.OmO.Review.entity.Review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Place {
    @Id
    private long placeId;

    @Column
    private String placeName;

    @OneToMany(mappedBy = "place",cascade = CascadeType.PERSIST)
    private List<PlaceLike> placeLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "place",cascade = CascadeType.PERSIST)
    private List<PlaceRecommend> placeRecommendList = new ArrayList<>();

    public void addLikes(PlaceLike placeLike){
        this.placeLikeList.add(placeLike);
        placeLike.setPlace(this);
    }

    public void deleteLikes(PlaceLike placeLike){
        this.placeLikeList.remove(placeLike);
    }

    public void addRecommends(PlaceRecommend placeRecommend){
        this.placeRecommendList.add(placeRecommend);
        placeRecommend.setPlace(this);
    }

    public void deleteRecommends(PlaceRecommend placeRecommend){
        this.placeRecommendList.remove(placeRecommend);
    }
}
