package testboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import testboard.service.BoardService;

@Controller
public class Indexcontroller {


    @Autowired
    BoardService boardService;

    @GetMapping("/")
    public String index(){
        return "boardlist";
    }

    @GetMapping("/write")
    public String boardwrite(){
        return "boardwrite";
    }

    @GetMapping("/boardview")
    public String boardview(){
        return "boardview";
    }








}