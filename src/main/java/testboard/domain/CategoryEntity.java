package testboard.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor @ToString
@Table(name="category")
@Entity
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int cno;
    private String cname;
    @Builder.Default
    @OneToMany(mappedBy="categoryEntity",cascade=CascadeType.ALL)
    private List<BoardEntity> boardEntityList = new ArrayList<>();



}