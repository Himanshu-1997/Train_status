$(document).ready(function(){
  $('.delete-article').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type:'DELETE',
      url: '/articles/'+id,
      success: function(response){
        alert('Deleting Article');
        window.location.href='/';
      },
      error: function(err){
        console.log(err);
      }
    });
  });
            $("#mycarousel").carousel( { interval: 2000 } );
            $("#carousel-button").click(function(){
				if ($("#carousel-button").children("span").hasClass("fa-pause")) {
                    $("#mycarousel").carousel("pause");
                    $("#carousel-button").children("span").removeClass("fa-pause");
                    $("#carousel-button").children("span").addClass("fa-play");
                }
                else if ($("#carousel-button").children("span").hasClass("fa-play")){
                    $("#mycarousel").carousel("cycle");
                    $("#carousel-button").children("span").removeClass("fa-play");
                    $("#carousel-button").children("span").addClass("fa-pause");                    
                }
            });
});
