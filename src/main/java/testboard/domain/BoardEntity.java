package testboard.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name="board")
@Entity
public class BoardEntity extends BaseTime{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int no;
    private String title;
    private String content;
    private String pw;
    private String writer;
    @ManyToOne
    @JoinColumn(name = "cno")
    private CategoryEntity categoryEntity;
    @OneToMany(mappedBy="boardEntity",cascade=CascadeType.ALL)
    private List<ReplyEntity> replyEntityList = new ArrayList<>();
}