$(document).ready(function() {
    $("#compare").click(function(event) {
        const $regex=/^.*?\bindex_suppressed\b.*?\bwebsite_suppressed.*/s
        if($('#exSyx').val().match($regex)){
                    $.ajax({
                        
                        data : {
                            include : $("#incSyx").val(),
                            exclude : $("#exSyx").val()
                        },
                        
                        type : 'POST',
                        url : '/compare',
                        success : function(data) {
                            data = JSON.parse(data)
                            $('#result').val(data.result)
                            $('#result').css('height','90%')                            
                        }
                    })
                }
        else{
            alert("index_suppressed and website_suppressed attributes are not added");
            }
         });

    $("#fmissing").click(function(event) {
        $.ajax({
            data : {
                dockeys : $('#docKwds').val(),
                modelsyx : $('#msSyx').val()
            },
            type : 'POST',
            url : '/getmissingkeys',
            success : function(data) {
                data = JSON.parse(data);
                $('#mresult').val(data.result)
                $('#mresult').css('height', '90%')
            }
        })
    });

    $("#asinmissing").click(function(event) {
        $.ajax({
            data : {
                doc : $('#docAsin').val(),
                mod : $('#msAsin').val()
            },
            type : 'POST',
            url : '/findasin',
            success : function(data) {
                data = JSON.parse(data);
                const res = data.result.toString().replace(/,/g,'\n');
                $('#missres').val(res);
            }
        })
    });

    $('#checksp').click(function(event) {
        $.ajax({
            data : {
                syntax : $('#spSyx').val()
            },
            type : 'POST',
            url : '/syntaxcheck',
            success :function(data) {
                data = JSON.parse(data);
                $('#spresult').html(data.result)
            }
        })
    });

    $('#attrscheck').click(function(event) {
        $.ajax({
            data : {
                attributes : $('#attrs').val(),
                attrsyx : $('#attrSyx').val()
            },
            type : 'POST',
            url : '/spellcheck',
            success : function(data){
                data = JSON.parse(data)
                //console.log(data.result)
                dstring = ""
                for(let i = 0 ; i<data.result.length;i++){
                    key = Object.keys(data.result[i])[0];
                    dstring+= key + " : <span style='background-color: yellow'>" + data.result[i][key] + "</span><br /><br />";
                }
                $('#attrresult').html(dstring)
            }
        })
    });

    

    $(document).ready(function(){
        $.ajax({
            type:'GET',
            url: '/loadattrs',
            success: function(data){
                $('#attrs').val(data);
                $('#attrs').attr("readonly", true)
            }
        })
    });

    $('#replacesyx').click((event) => {
        $.ajax({
            type:'POST',
            data: {
                clicked: "replace",
                syntax: $("#repSyx").val()
            },
            url: '/getreplaceres',
            success: (data) => {
                data = JSON.parse(data);
                $("#repres").html(data['result'])
            }

        });
    });

    $('#createsyx').click((event) => {
        $.ajax({
            type:'POST',
            data: {
                clicked: "create",
                syntax: $("#repSyx").val()
            },
            url: '/getreplaceres',
            success: (data) => {
                data = JSON.parse(data);
                
                $("#repres").html(data['result'].replace(/\.\./g,'.'))
            }

        });
    });
});
