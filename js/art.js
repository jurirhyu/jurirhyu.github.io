$(function(){

    $.ajax({
        url:'art_sub.xml',
        success:function(data){
console.log(data);
            var detail;

            function funList2(idx){
                $(data).find('item').each(function(i){
                    detail = $(this).html();
                });

                $('.art .artBig').append(detail);
                // setTimeout(function(){$('.artBig').hide();},500);
                artjs();
                artGallery();
                    


            }
            funList2()

        }

    })


    function artjs(){
        var isOpen = false;
        var view1 = document.querySelector("#view1");  // #view 요소를 가져옴
        // var view2 = document.querySelector("#view2");  // #view 요소를 가져옴
        var view3 = document.querySelector("#view3");  // #view 요소를 가져옴
        var view4 = document.querySelector("#view4");  // #view 요소를 가져옴

                // ==============================================
        // view2.addEventListener("mouseover", function(){
        //     if(isOpen == false){//display:none;
        //         document.querySelector("#detail2").style.opacity="1";
        //         isOpen=true;
        //     }
        //     else{
        //         document.querySelector("#detail2").style.opacity="0";
        //         isOpen=false;
        //     }
        // })

        // view2.addEventListener("mouseout", function(){
        //     if(isOpen == true){//display:none;
        //         document.querySelector("#detail2").style.opacity="0";
        //         isOpen=false;
        //     }
        //     else{
        //         document.querySelector("#detail2").style.opacity="1";
        //         isOpen=true;
        //     }
        // })

        // ==============================================
        view3.addEventListener("mouseover", function(){
            if(isOpen == false){//display:none;
                document.querySelector("#detail3").style.opacity="1";
                isOpen=true;
            }
            else{
                document.querySelector("#detail3").style.opacity="0";
                isOpen=false;
            }
        })

        view3.addEventListener("mouseout", function(){
            if(isOpen == true){//display:none;
                document.querySelector("#detail3").style.opacity="0";
                isOpen=false;
            }
            else{
                document.querySelector("#detail3").style.opacity="1";
                isOpen=true;
            }
        })

        // ==============================================
        view4.addEventListener("mouseover", function(){
            if(isOpen == false){//display:none;
                document.querySelector("#detail4").style.opacity="1";
                isOpen=true;
            }
            else{
                document.querySelector("#detail4").style.opacity="0";
                isOpen=false;
            }
        })

        view4.addEventListener("mouseout", function(){
            if(isOpen == true){//display:none;
                document.querySelector("#detail4").style.opacity="0";
                isOpen=false;
            }
            else{
                document.querySelector("#detail4").style.opacity="1";
                isOpen=true;
            }
        })

        //////////////////////////////////////////////////////////////

    }
function artGallery(){
    
    $.ajax({
        url:'art_sub_gallery.xml',
        success:function(data){
            console.log('a')
            var photos;

            function photosFun(idx){
                $(data).find('item').each(function(i){
                    if(idx ==i){
                        photos=$(this).html();
                    }
                });

                $('.art .section-content').append(photos);
                setTimeout(function(){$('.artBig').hide();},500);

            }

            $('.artBig .left p').on('click',function(){
                
                var idx=$(this).attr('data-num');
                $('.art .section-title h3').text('Back to Art');
                $('.art .section-title h3').addClass('active');
                photosFun(idx);
            });
            
            $('.art .section-title h3').on('click', function(){
                console.log("hello")
                $('.artBig').show();
                $('.gallery').hide();
                $('.art .section-title h3').text('Art');
                $('.art .section-title h3').removeClass('active');
            });
        }
    })//ajax
}







})