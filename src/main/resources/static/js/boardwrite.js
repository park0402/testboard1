function boardwrite(){
    let title = $("#title").val();
    let writer = $("#writer").val();
    let pw = $("#pw").val();
    let content = $("#content").val();
    let category =$("#category").val();
    $.ajax({
        url : "/board/boardwrite",
        method : "POST",
        data : {"title":title,"writer":writer,"pw":pw,"content":content, "category" : category},
        success : function(result){
            if(result){
                alert("작성되었습니다");
                location.href="/"
            }
            else{alert("작성실패")};
        }
    })
}