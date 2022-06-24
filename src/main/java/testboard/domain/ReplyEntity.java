package testboard.domain;


import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name="reply")
@Entity
public class ReplyEntity extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rno;
    private String rwriter;
    private String rcontent;
    private String rpw;
    private int rindex;
    @ManyToOne
    @JoinColumn(name = "no")
    private BoardEntity boardEntity;

}