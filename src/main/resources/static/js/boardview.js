let no = Request("no");// 게임방번호

function Request(valuename){
	let rtnval = "";
	let nowAddress = unescape(location.href);
	let parameters = (nowAddress.slice(nowAddress.indexOf("?")+1,nowAddress.length)).split("&");
	for(let i = 0 ; i < parameters.length ; i++){
		let varName = parameters[i].split("=")[0];
		if(varName.toUpperCase() == valuename.toUpperCase()){
			rtnval = parameters[i].split("=")[1];
			break;
		}
	}
	return rtnval;
}

$.ajax({
    url : "/board/getboard",
    method : "GET",
    data : {"no":no},
    success : function(result){
        no = result.no;
        $("#no").val(result.no);
        $("#title").val(result.title);
        $("#writer").val(result.writer);
        $("#content").val(result.content);
        $("#pw").val(result.pw);
        $.ajax({
            url : "/board/getreply",
            method : "GET",
            data : {"no" : no},
            success : function(result){
                    console.log(result);
                let html='';
                for(let i = 0 ; i < result["reply"].length ; i++){
                    html += '<tr><td> 댓글번호 : '+result["reply"][i].rno+'</td><td>댓글 작성자 : '+result["reply"][i].rwriter+'</td><td>댓글 내용 : '+result["reply"][i].rcontent+'</td><td><button type="button" onclick="repupdate('+no+','+result["reply"][i].rno+',\''+result["reply"][i].rpw+'\')">수정</button><button type="button" onclick="repdelete('+no+','+result["reply"][i].rno+',\''+result["reply"][i].rpw+'\')">삭제</button><button type="button" onclick="rereply('+no+','+result["reply"][i].rno+')">댓글</button></td></tr>'+
                            '<tr id="reupdatearea'+result["reply"][i].rno+'" hidden="true" ><td colspan="3"><input type="text" id="recontent'+result["reply"][i].rno+'" placeholder="'+result["reply"][i].rcontent+'"></td><td><button type="button" onclick="repupdateok('+result["reply"][i].rno+')">수정</button></td></tr>'+
                            '<tr id="rerearea'+result["reply"][i].rno+'" hidden="true" ><td><input type="text" placeholder="작성자" id="rerewriter'+result["reply"][i].rno+'"></td><td><input type="text" placeholder="비밀번호" id="rerepw'+result["reply"][i].rno+'"></td><td><input type="text" placeholder="내용" id="rerecontent'+result["reply"][i].rno+'"></td><td><button type="button" onclick="reprepok('+no+','+result["reply"][i].rno+')">작성</button></td></tr>';

                    for(let j = 0 ; j< result["rereply"].length ; j++){
                        if(result["reply"][i].rno==result["rereply"][j].rindex){
                            html+='<tr><td></td><td>대댓글 작성자 : '+result["rereply"][j].rwriter+'</td><td>대댓글 내용 : '+result["rereply"][j].rcontent+'</td><td><button type="button" onclick="reprepupdate('+no+','+result["rereply"][j].rno+',\''+result["rereply"][j].rpw+'\')">수정</button><button type="button" onclick="reprepdelete('+no+','+result["rereply"][j].rno+',\''+result["rereply"][j].rpw+'\')">삭제</button></td></tr>'+
                            '<tr id="rereupdatearea'+result["rereply"][j].rno+'" hidden="true" ><td></td><td colspan="2"><input type="text" id="rerecontent'+result["rereply"][j].rno+'" placeholder="'+result["rereply"][j].rcontent+'"></td><td><button type="button" onclick="reprepupdateok('+result["rereply"][j].rno+')">수정</button></td></tr>';
                        }
                    }

                }
                $("#replyarea").html(html);

            }
        })

    }
})

// 게시물 작성
function boardwrite(){
    let title = $("#title").val();
    let writer = $("#writer").val();
    let pw = $("#pw").val();
    let content = $("#content").val();
    $.ajax({
        url : "/board/boardwrite",
        method : "POST",
        data : {"title":title,"writer":writer,"pw":pw,"content":content},
        success : function(result){
            if(result){
                alert("작성되었습니다");
                location.href="/"
            }
            else{alert("작성실패")};
        }
    })
}

// 게시물 삭제
function boarddelete(){
    if(prompt("비밀번호를 입력해주세요","")==$("#pw").val()){
        $.ajax({
            url : "/board/boarddelete",
            method :"DELETE",
            data : {"no": $("#no").val()},
            success:function(result){
                if(result){
                    alert("삭제되었습니다");
                    location.href="/"
                }
                else{alert("삭제 실패")};
            }
        })
    }
    else{
        alert("비번틀림");
    }
}

// 게시물 수정 가능하게 바꿈
function boardupdate(){
    if(prompt("비밀번호를 입력해주세요","")==$("#pw").val()){
        alert("제목과 내용을 수정하세요");
        $("#title").attr("readonly",false);
        $("#content").attr("readonly",false);
        $("#boardupdate").attr("hidden",true);
        $("#boardrealupdate").attr("hidden",false);
    }else{
        alert("비번틀림");
    }
}

// 게시물 수정
function boardrealupdate(no){
    $.ajax({
        url : "/board/boardupdate",
        method :"PUT",
        data : {"no": $("#no").val() , "title" : $("#title").val() ,"content" : $("#content").val()},
        success:function(result){
            if(result){
                alert("수정되었습니다");
                location.href="/boardview?no="+$("#no").val() ;
            }
            else{alert("삭제 실패")};
        }
    })
}

// 댓글 작성
function replywrite(){
    $.ajax({
        url : "/board/replysave",
        method :"GET",
        data : {"no": no , "rcontent" : $("#rcontent").val() ,"rwriter" : $("#rwriter").val(),"rpw" : $("#rpw").val() },
        success:function(result){
            if(result){
                alert("작성되었습니다");
                location.href="/boardview?no="+$("#no").val() ;
            }
            else{alert("작성 실패")};
        }
    })
}

// 댓글 수정 공간 출력
function repupdate(no,rno,rpw){
    if(prompt("비밀번호를 입력해주세요","")==rpw){
        alert("수정할내용을 입력하세요");
        $("#reupdatearea"+rno).attr('hidden',false);

    }else{
        alert("비번틀림");
    }
}

// 댓글 수정
function repupdateok(rno){
    let reupdatecontent = $("#recontent"+rno).val();
    $.ajax({
        url: "/board/repupdateok",
        data : {"rno" : rno, "reupdatecontent" : reupdatecontent },
        method : "POST",
        success : function(result){
            if(result){
                alert("수정되었습니다");
                location.reload();
            }
            else{
                alert("삭제 실패");
            }
        }
    })
}

// 댓글 삭제
function repdelete(no,rno,rpw){
    if(prompt("비밀번호를 입력해주세요","")==rpw){
        $.ajax({
            url: "/board/repdelete",
            data : {"rno" : rno },
            method : "POST",
            success : function(result){
                if(result){
                    alert("삭제되었습니다");
                    location.reload();
                }
                else{
                    alert("삭제 실패");
                }
            }
        })
    }else{
        alert("비번틀림");
    }
}


// 대댓글 작성 공간 출력
function rereply(no,rno){
    $("#rerearea"+rno).attr('hidden',false);
}

// 대댓글 작성
function reprepok(no,rno){
    let rerewriter = $("#rerewriter"+rno).val();
    let rerepw = $("#rerepw"+rno).val();
    let rerecontent = $("#rerecontent"+rno).val();
    $.ajax({
        url: "/board/reresave",
        data : {"no": no, "rno" : rno, "rerewriter" : rerewriter ,"rerepw" : rerepw,"rerecontent" : rerecontent},
        method : "GET",
        success : function(result){
            if(result){
                alert("작성되었습니다");
                location.reload();
            }
            else{
                alert("삭제 실패");
            }
        }
    })
}



// 대댓글 수정 공간 출력
function reprepupdate(no,rno,rpw){
    if(prompt("비밀번호를 입력해주세요","")==rpw){
        alert("수정할내용을 입력하세요");
        $("#rereupdatearea"+rno).attr('hidden',false);

    }else{
        alert("비번틀림");
    }
}



// 대댓글 수정
function reprepupdateok(rno){
    let reupdatecontent = $("#rerecontent"+rno).val();
    $.ajax({
        url: "/board/repupdateok",
        data : {"rno" : rno, "reupdatecontent" : reupdatecontent },
        method : "POST",
        success : function(result){
            if(result){
                alert("수정되었습니다");
                location.reload();
            }
            else{
                alert("삭제 실패");
            }
        }
    })
}

// 대댓글 삭제
function reprepdelete(no,rno,rpw){
    if(prompt("비밀번호를 입력해주세요","")==rpw){
        $.ajax({
            url: "/board/repdelete",
            data : {"rno" : rno },
            method : "POST",
            success : function(result){
                if(result){
                    alert("삭제되었습니다");
                    location.reload();
                }
                else{
                    alert("삭제 실패");
                }
            }
        })
    }else{
        alert("비번틀림");
    }
}