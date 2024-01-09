package com.OmObe.OmO.Review.service;

import com.OmObe.OmO.Review.entity.Review;
import com.OmObe.OmO.Review.repository.ReviewRepository;
import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.exception.ExceptionCode;
import com.OmObe.OmO.member.service.MemberService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final MemberService memberService;

    public ReviewService(ReviewRepository reviewRepository, MemberService memberService) {
        this.reviewRepository = reviewRepository;
        this.memberService = memberService;
    }

    public Review createReview(Review review){
        return reviewRepository.save(review);
    }

    public Review updateReview(Review review,long reviewId){
        Review findReview = findReview(reviewId);

        // 사용자 인증 상태 검증
        memberService.verifiedAuthenticatedMember(findReview.getMember().getMemberId());

        Optional.ofNullable(review.getContent())
                .ifPresent(content -> findReview.setContent(content));
        findReview.setModifiedAt(LocalDateTime.now());
        return reviewRepository.save(findReview);
    }

    public Review getReview(long reviewId){
        Review findReview = findReview(reviewId);
        return findReview;
    }

    public Page<Review> findReviewsByCreatedAt(long placeId, int page, int size){
        return reviewRepository.findAll(withPlaceId(placeId), PageRequest.of(page,size,
                Sort.by("createdAt").descending()));
    }

    public void deleteReview(long reviewId){
        Review findReview = findReview(reviewId);

        // 사용자 로그인 인증 상태 검증
        memberService.verifiedAuthenticatedMember(findReview.getMember().getMemberId());

        reviewRepository.delete(findReview);
    }

    public Review findReview(long reviewId){
        Optional<Review> optionalReview = reviewRepository.findById(reviewId);
        Review review = optionalReview.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));
        return review;
    }

    public static Specification<Review> withPlaceId(long placeId){
        return (Specification<Review>) ((root, query, builder) ->
                builder.equal(root.get("placeId"),placeId));
    }
}
