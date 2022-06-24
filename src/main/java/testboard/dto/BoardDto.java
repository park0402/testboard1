package testboard.dto;


import lombok.*;

@Getter@Setter@Builder@NoArgsConstructor@AllArgsConstructor@ToString
public class BoardDto {
    private int no;
    private String title;
    private String content;
    private String pw;
    private String writer;
    private String category;

}
