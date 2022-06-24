package testboard.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
class BoardcontrollerTest {

    @Autowired
    MockMvc mvc;

    @Test
    void boardwrite() throws Exception {
        mvc.perform(post("/board/boardwrite")
                .param("title","테스트제목")
                .param("content","테스트내용")
                .param("pw","테스트비번")
                .param("writer","테스트작성자")
                .param("category","테스트카테고리")
        ).andDo(print());
    }

    @Test
    void getlist() throws Exception {
        mvc.perform(get("/board/getlist")
                .param("cno","0")
                .param("key","")
                .param("keyword","")
                .param("page","1")
        ).andDo(print());
    }

    @Test
    void getboard() throws Exception {
        mvc.perform(get("/board/getboard")
                .param("no","1")
        ).andDo(print());
    }

    @Test
    void deleteboard() throws Exception {
        mvc.perform(delete("/board/boarddelete")
                .param("no","1")
        ).andDo(print());
    }

    @Test
    void updateboard() throws Exception {
        mvc.perform(put("/board/boardupdate")
                .param("no","1")
                .param("title","제목수정")
                .param("content","내용수정")
        ).andDo(print());
    }

    @Test
    void getcategorylist() throws Exception {
        mvc.perform(get("/board/getcategorylist")
        ).andDo(print());
    }

    @Test
    void getreply() throws Exception {
        mvc.perform(get("/board/getreply")
                .param("no","1")
        ).andDo(print());
    }

    @Test
    void replysave() throws Exception {
        mvc.perform(get("/board/replysave")
                .param("no","1")
                .param("rcontent","댓글작성")
                .param("rwriter","댓수작성자")
                .param("rpw","댓수비번")
        ).andDo(print());
    }

    @Test
    void reresave() throws Exception {
        mvc.perform(get("/board/reresave")
                .param("no","1")
                .param("rno","1")
                .param("rerecontent","대댓글작성")
                .param("rerewriter","대댓수작성자")
                .param("rerepw","대댓수비번")
        ).andDo(print());
    }

    @Test
    void testGetreply() throws Exception {
        mvc.perform(post("/board/repdelete")
                .param("rno","1")
        ).andDo(print());
    }

    @Test
    void repupdateok() throws Exception {
        mvc.perform(post("/board/repupdateok")
                .param("rno","1")
                .param("reupdatecontent","댓글수정")
        ).andDo(print());
    }
}