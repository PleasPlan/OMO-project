package com.OmObe.OmO.Board.response;

import lombok.Getter;
import org.springframework.data.domain.Slice;

import java.util.List;

@Getter
public class MultiResponseDto<T> {
    private List<T> data;
    private PageInfo pageInfo;
    public MultiResponseDto(List<T> data, Slice slice){
        this.data = data;
        this.pageInfo = new PageInfo(slice.getNumber() + 1,
                slice.getSize(), slice.hasNext());
    }
}
