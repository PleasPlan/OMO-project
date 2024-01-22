package com.OmObe.OmO.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class MultiPageResponseDto<T> { // totalElements를 필요로 하는 데이터의 조회 시 사용할 클래스
    private List<T> data;
    private PageInfo pageInfo;

    public MultiPageResponseDto(List<T> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PageInfo {
        private int page;
        private int size;
        private long totalElements; // 총 데이터 수
        private int totalPages; // 총 페이지 수
    }
}


