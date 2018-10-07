$(document).ready(function() {
  var curColor;
  $("#get-quote")
  .mousedown(function() {
    $(this).css({
      "border" : "none"
    });
  })
  .mouseup(function(){
    $(this).css({
      "border-bottom" : "4px solid grey",
      "border-right" : "4px solid grey"
    });

  });
  
      $('.text-animation.fancy-string').mouseenter(function() {

        var selfv = $(this);

        if (selfv.data('processing'))
            return;

        selfv.data('processing', true);

        curColor = selfv.css("color");
        var text = $(this).text();
        var arrcopy = text;

        text = text.split("");
        arrcopy = arrcopy.split("");

        var len = arrcopy.length - 1;

        var rand1 = Math.floor((Math.random() * len / 2) + 0);
        var rand2 = Math.floor((Math.random() * len) + len / 2);
        var rand3 = Math.floor((Math.random() * len / 2) + 0);
        var rand4 = Math.floor((Math.random() * len) + len / 2);

        arrcopy[rand1] = arrcopy[rand2];
        arrcopy[rand2] = text[rand1];

        arrcopy = arrcopy.join("");
        text = text.join("");

        selfv.text(arrcopy)
             .css("color", "#191901");

        setTimeout(function() {
            selfv.text(text);

            text = text.split("");
            arrcopy = arrcopy.split("");

            arrcopy[rand3] = arrcopy[rand4];
            arrcopy[rand4] = text[rand3];

            arrcopy = arrcopy.join("");
            text = text.join("");

            selfv.text(arrcopy);
            
            setTimeout(function() {
                selfv.text(text);
                selfv.data('processing', false);
            }, 150);
        }, 150);
    })
    .mouseleave(function() {
        $(this).css("color", curColor);
    });
  
  $.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        $('#quote-title').html("<i>- " + post.title + "</i>");
        $('#quote-content').html(post.content);

        // If the Source is available, use it. Otherwise hide it.
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source);
        } else { 
          $('#quote-source').text('');
        }
      },
      cache: false
    });
  
  
$("#get-quote").on("click", function(e) {
        e.preventDefault();
    $.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.S
        $('#quote-title').html("<i>- " + post.title + "</i>");
        $('#quote-content').html(post.content);

        // If the Source is available, use it. Otherwise hide it.
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source);
        } else { 
          $('#quote-source').text('');
        }
      },
      cache: false
    });
  });
});
    