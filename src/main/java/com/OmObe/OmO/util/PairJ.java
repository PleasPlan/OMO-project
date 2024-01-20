package com.OmObe.OmO.util;

import lombok.Getter;
import lombok.Setter;

// Kotlin의 Pair과 같은 기능을 가지고 있음.
@Getter
@Setter
public class PairJ<F, S> {
    private F first;

    private S second;

    public PairJ() {
        this.first = first;
        this.second = second;
    }
}