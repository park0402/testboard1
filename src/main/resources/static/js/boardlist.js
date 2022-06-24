let current_cno = 0; // 카테고리 선택
let current_page = 1;
let current_key = ""; // 현재 검색된 키 [ 없을경우 공백 ]
let current_keyword = ""; // 현재 검색된 키워드 [ 없을경우 공백 ]

boardlist( 0 , 1  , "" , "");       //  cno , page , key , keyword
getcategorylist();

let no = Request("no");

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

function boardlist(cno, page, key, keyword){

    current_cno = cno; // 카테고리 선택
    current_page = page;
    current_key = key; // 현재 검색된 키 [ 없을경우 공백 ]
    current_keyword = keyword; // 현재 검색된 키워드 [ 없을경우 공백 ]
    $.ajax({
        url : "/board/getlist",
        data : {"cno" : current_cno , "key" :  current_key  , "keyword" : current_keyword , "page" : current_page } ,
        method : "GET",
        success : function(result){
            let html = '<thead><tr><td>번호</td><td>제목</td><td>작성자</td></tr></thead>';
            if(result["data"].length == 0){
                html+= '<tr><td colspan="3">검색 결과가 없습니다.</td></tr>';
            }else{
                for(let i = 0 ; i < result["data"].length ; i ++){
                html+= '<tr><td>'+result["data"][i].no+'</td><td><a href="/boardview?no='+result["data"][i].no+'">'+result["data"][i].title+'</a></td><td>'+result["data"][i].writer+'</td></tr>'
                }
            }
            let pagehtml = '';
            if(page==1){
                pagehtml+='<li class="page-item"><button class="page-link" type="button" onclick="boardlist('+cno+','+(page)+',\''+current_key+'\',\''+current_keyword+'\')">이전</button></li>'
            }
            else{
                pagehtml+='<li class="page-item"><button class="page-link" type="button" onclick="boardlist('+cno+','+(page-1)+',\''+current_key+'\',\''+current_keyword+'\')">이전</button></li>'
            }
            for(let i = result["startbtn"] ; i <= result["endbtn"] ; i++){
                pagehtml+='<li class="page-item"><button class="page-link" type="button" onclick="boardlist('+cno+','+(i)+',\''+current_key+'\',\''+current_keyword+'\')">'+(i)+'</button></li>'
            }
            if(page==result["totalpage"]){
                pagehtml+='<li class="page-item"><button class="page-link" type="button" onclick="boardlist('+cno+','+(page)+',\''+current_key+'\',\''+current_keyword+'\')">다음</button></li>'
            }
            else{
                pagehtml+='<li class="page-item"><button class="page-link" type="button" onclick="boardlist('+cno+','+(page+1)+',\''+current_key+'\',\''+current_keyword+'\')">다음</button></li>'
            }

            $("#boardtable").html(html);
            $("#pagebtnbox").html(pagehtml);
        }
    })
}

function getcategorylist(){
    $.ajax({
        url : "/board/getcategorylist",
        method : "GET",
        success : function(result){
            html = '';
            for(let i = 0 ; i < result.length ; i++ ){
                html+= '<button class="btn btn-secondary" onclick="boardlist('+result[i].cno+','+1+',\''+current_key+'\',\''+current_keyword+'\')" type="button">'+result[i].cname+'</button> ';
            }
            html += '<button class="btn btn-secondary" onclick="boardlist('+0+','+1+',\''+current_key+'\',\''+current_keyword+'\')" type="button">전체보기</button>';
            $("#categorybox").html(html);
        }
    })
}

// 검색버튼을 눌렀을때
function search(){
    let key = $("#key").val();
    let keyword = $("#keyword").val();
    // 키 와 키워드 입력받음
    boardlist( current_cno , 1 ,  key , keyword );
}