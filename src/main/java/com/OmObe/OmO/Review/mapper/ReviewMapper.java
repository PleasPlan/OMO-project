package com.OmObe.OmO.Review.mapper;

import com.OmObe.OmO.Review.dto.ReviewDto;
import com.OmObe.OmO.Review.entity.Review;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ReviewMapper {
    public Review reviewPostDtoToReview(ReviewDto.Post postDto){
        if(postDto == null){
            return null;
        }
        else{
            Review review = new Review();
            review.setContent(postDto.getContent());
            review.setPlaceId(postDto.getPlaceId());
            return review;
        }
    }

    public Review reviewPatchDtoToReview(ReviewDto.Patch patchDto){
        if(patchDto == null){
            return null;
        }
        else{
            Review review = new Review();
            review.setContent(patchDto.getContent());
            return review;
        }
    }

    public ReviewDto.Response reviewToReviewResponseDto(Review review){
        if(review == null){
            return null;
        }
        else{
            long reviewId = review.getReviewId();
            String content = review.getContent();
            LocalDateTime createdTime = review.getCreatedAt();
            String writer = review.getMember().getNickname();
            Long placeId = review.getPlaceId();

            ReviewDto.Response response = new ReviewDto.Response(reviewId,content,writer,createdTime,placeId);
            return response;
        }
    }
}
