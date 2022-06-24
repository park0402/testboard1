
package testboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import testboard.dto.BoardDto;
import testboard.dto.ReplyDto;
import testboard.service.BoardService;

import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/board")
public class Boardcontroller {
    @Autowired
    BoardService boardService;

    //게시글 작성
    @PostMapping("/boardwrite")
    @ResponseBody
    public boolean boardwrite(@RequestParam("title")String title, @RequestParam("content")String content, @RequestParam("pw")String pw, @RequestParam("writer")String writer, @RequestParam("category")String category  ){
        BoardDto boardDto = BoardDto.builder().title(title).pw(pw).content(content).writer(writer).category(category).build();
        return boardService.boardwrite(boardDto);
    }


    // 전체 게시글 호출

    // 개별 게시글 호출

    // 게시글 삭제

    // 게시글 수정

    // 카테고리버튼 출력

    // 모든댓글 호출

    // 댓글 작성

    // 대댓글 작성

    // 댓글, 대댓글 삭제

    // 댓글 대댓글 수정


}


