$(function(){
    //start
    //index_menu_uiux.js

    $.ajax({
        url:'index_menu_uiux.json',
        type:'get',
        data:{a:10},
      
        success:function(data){
 

            var imgSrc,title,content,responsive='',tagList;

            function funList(){
               
                tagList='';
                data.uiuxType.forEach(function(value,key){
                   
                    
                    imgSrc = value.imgSrc;
                    title = value.title;
                    content = value.content;
                    responsive = value.responsive;

                    
                    

                    tagList += "<figure data-num="+key+">";

                    tagList += "<p><img src='"+imgSrc+"' alt=''></p>";
                    tagList += "<figcaption>";
                    tagList += "<i>"+title+"</i>";
                    tagList += "<p>"+content+"</p>";
                    tagList += "<p>"+responsive+"</p>";
                    tagList += "</figure>";
                    
                });

                $('.list').html(tagList);

                setTimeout(slickFun,50);
               
 
            }

            funList();


            


        }
    });  

    function slickFun(){
        $(".list").slick({
            breakpoint: 300,
            arrows:false,
            dots: true,
            infinite: true,
            slidesToShow: 3,
            edgeFriction:10,
            slidesToScroll: 1
        });

        $('.list').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            $(this).addClass('active');
        });

        $('.list').on('afterChange', function(event, slick, currentSlide){
            $(this).removeClass('active');
        });
    }


    $.ajax({
        url:'uiux_sub.xml',
        success:function(data){

            var detail;

            function funList1(idx){
                $(data).find('item').each(function(i){
                    if(idx == i){
                        detail = $(this).html();
                    }
                });
                
                $('.uiux .section-content').append(detail);
                setTimeout(function(){$('.big-square').hide();},100);
            }


            $('figure').click(function(e){
                if(!$('.list').hasClass('active')){
                    var idx = $(this).attr('data-num');
                    $('.uiux .section-title h3').text('Back to UI/UX');
                    $('.uiux .section-title h3').addClass('active');
                    funList1(idx);
                }
            });

            $('.uiux .section-title').on('click',function(){
                $('.big-square').show();
                $('.bts-detail').hide();
                $('.uiux .section-title h3').text('UI/UX');
                $('.uiux .section-title h3').removeClass('active');
                slickFun(); 
            })


           


            // funList1();


            
        }

    });

    // $("#mouseWheels") on ('figure',function(e){

	// 	var wheelDelta = e.originalEvent.wheelDelta;

	// 	if(wheelDelta > 0){

	// 		console.log("up");

	// 		$(this).scrollLeft(-wheelDelta + $(this).scrollLeft());

	// 	}else{

	// 	console.log("down");

	// 		$(this).scrollLeft(-wheelDelta + $(this).scrollLeft());

    //     }
    // });

    // $(".side_scroll").mousewheel(function(event, delta) {
    //     this.scrollLeft -= (delta * 10);
    //     event.preventDefault();
    //   });
    
});
    //end