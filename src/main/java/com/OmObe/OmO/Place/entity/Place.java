package com.OmObe.OmO.Place.entity;

import com.OmObe.OmO.Comment.entity.Comment;
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
    private Long mine;

    @Column
    private Long recommend;

    @OneToMany(mappedBy = "place",cascade = CascadeType.PERSIST)
    private List<Comment> comments = new ArrayList<>();

    public void addComment(Comment comment){
        this.comments.add(comment);;
        comment.setPlace(this);
    }
}
