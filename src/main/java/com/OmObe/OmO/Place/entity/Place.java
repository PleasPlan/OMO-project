package com.OmObe.OmO.Place.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Place {
    @Id
    private long placeId;

    @Column
    private Long mine;

    @Column
    private Long recommend;
}
