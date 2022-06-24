package testboard.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReplyDto {
    private int rno;
    private String rwriter;
    private String rcontent;
    private String rpw;
    private int rindex;
    private int no;

}
