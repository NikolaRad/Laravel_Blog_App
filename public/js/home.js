$(document).ready(function(){

    $.ajax({
        'method':'GET',
        'url':all_articles_url,
        'data':{'_token':token}
    }).done(function(response){
        var articles = response['articles'];
        for(var val in articles){
            var image = articles[val]['image'] ? 'images/' + articles[val]['image'] : 'http://www.placehold.it/150x50';
            $('#main').find('#articles').append('<div class="media">' +
                '<div class="media-left">' +
                '<a href="home/article/show/' + articles[val]['id'] + '">' +
                '<img width="150" class="media-object" src="' + image + '" alt="">' +
                '</a>' +
                '</div>' +
                '<div class="media-body">' +
                '<h4 class="media-heading">' + articles[val]['title'] + '</h4>' +
                '<p class="text-justify">' + articles[val]['content'].substr(0,200) + '...</p>' +
                '<p>' +
                '<a class="btn btn-info" href="home/article/show/' + articles[val]['id'] + '">Read more</a>' +
                '<a href="#" class="btn btn-danger pull-right ' + ((auth_user == '') ? "invisible" : "") + ' ' + ((auth_user == articles[val]['user_id']) ? "" : "disabled") + ' delete_link" data-articleId="' + articles[val]['id'] + '">Delete</a>' +
                '<a class="btn btn-warning pull-right ' + ((auth_user == '') ? "invisible" : "") + ' ' + ((auth_user == articles[val]['user_id']) ? "" : "disabled") + ' " href="home/article/edit/' + articles[val]['id'] + '">Edit' +
                '</a>' +
                '</p>' +
                '</div>' +
                '</div><br>');
        }
        $('.loader').hide();

        $('#main').find('#articles').append('<div class="row text-center"><nav aria-label="Page navigation"><ul class="pagination links"></ul> </nav></div>');
        if(response['total_pages']>1){
            for(var i=1;i<=response['total_pages'];i++){
                $('#main').find('#articles').find('.links').append('<li><a class="pages" href="#" data-page="' + i + '">' + i + '</a></li>');
            }
        }

    });

    $('#articles').on('click','.pages',function(){
        var page = $(this).attr('data-page');
        $.ajax({
            'method':'GET',
            'url':pag_url,
            'data':{'page':page,'_token':token}
        }).done(function(response){
            $('#main').find('#articles').html('');
            var articles = response['articles'];
            for(var val in articles){
                var image = articles[val]['image'] ? 'images/' + articles[val]['image'] : 'http://www.placehold.it/150x50';
                $('#main').find('#articles').append('<div class="media">' +
                    '<div class="media-left">' +
                    '<a href="home/article/show/' + articles[val]['id'] + '">' +
                    '<img width="150" class="media-object" src="' + image + '" alt="">' +
                    '</a>' +
                    '</div>' +
                    '<div class="media-body">' +
                    '<h4 class="media-heading">' + articles[val]['title'] + '</h4>' +
                    '<p class="text-justify">' + articles[val]['content'].substr(0,200) + '...</p>' +
                    '<p>' +
                    '<a class="btn btn-info" href="home/article/show/' + articles[val]['id'] + '">Read more</a>' +
                    '<a href="#" class="btn btn-danger pull-right ' + ((auth_user == '') ? "invisible" : "") + ' ' + ((auth_user == articles[val]['user_id']) ? "" : "disabled") + ' delete_link" data-articleId="' + articles[val]['id'] + '">Delete</a>' +
                    '<a class="btn btn-warning pull-right ' + ((auth_user == '') ? "invisible" : "") + ' ' + ((auth_user == articles[val]['user_id']) ? "" : "disabled") + ' " href="home/article/edit/' + articles[val]['id'] + '">Edit' +
                    '</a>' +
                    '</p>' +
                    '</div>' +
                    '</div><br>');
            }

            $('#main').find('#articles').append('<div class="row text-center"><nav aria-label="Page navigation"><ul class="pagination links"></ul> </nav></div>');
            for(var i=1;i<=response['total_pages'];i++){
                $('#main').find('#articles').find('.links').append('<li class=""><a class="pages" href="#" data-page="' + i + '">' + i + '</a></li>');
            }

            $('#main').find('#articles').find('li').each(function(){
                if($(this).find('a').attr('data-page') === page){
                    $(this).addClass('active');
                }
            });
        });
    });

    $('.authors').on('click',function(){
        var user_id = $(this).attr('data-userId');
        $.ajax({
            'method':'GET',
            'url':author_articles_url,
            'data':{'user_id':user_id,'_token':token}
        }).done(function(response){
            $('#main').find('#articles').html('');
            var articles = response['articles'];
            if(articles != 0) {
                for (var val in articles) {
                    var image = articles[val]['image'] ? 'images/' + articles[val]['image'] : 'http://www.placehold.it/150x50';
                    $('#main').find('#articles').append('<div class="media">' +
                        '<div class="media-left">' +
                        '<a href="home/article/show/' + articles[val]['id'] + '">' +
                        '<img width="150" class="media-object" src="' + image + '" alt="">' +
                        '</a>' +
                        '</div>' +
                        '<div class="media-body">' +
                        '<h4 class="media-heading">' + articles[val]['title'] + '</h4>' +
                        '<p class="text-justify">' + articles[val]['content'].substr(0, 200) + '...</p>' +
                        '<p>' +
                        '<a class="btn btn-info" href="home/article/show/' + articles[val]['id'] + '">Read more</a>' +
                        '<a href="#" class="btn btn-danger pull-right ' + ((auth_user == '') ? "invisible" : "") + ' ' + ((auth_user == articles[val]['user_id']) ? "" : "disabled") + ' delete_link" data-articleId="' + articles[val]['id'] + '">Delete</a>' +
                        '<a class="btn btn-warning pull-right ' + ((auth_user == '') ? "invisible" : "") + ' ' + ((auth_user == articles[val]['user_id']) ? "" : "disabled") + ' " href="home/article/edit/' + articles[val]['id'] + '">Edit' +
                        '</a>' +
                        '</p>' +
                        '</div>' +
                        '</div><br>');
                }
            }else{
                $('#main').find('#articles').append('<div class="alert alert-info text-center"><h4>User ' + response['username'] + ' has no articles yet.</h4></div>');
            }

            $('#main').find('#articles').append('<div class="row text-center"><nav aria-label="Page navigation"><ul class="pagination links"></ul> </nav></div>');
            if(response['total_pages']>1){
                for(var i=1;i<=response['total_pages'];i++){
                    $('#main').find('#articles').find('.links').append('<li class=""><a class="pages_author" href="#" data-user-id="' + user_id + '" data-page="' + i + '">' + i + '</a></li>');
                }
            }
        });
    });

    $('#articles').on('click','.pages_author',function(){
        var page = $(this).attr('data-page');
        var user_id = $(this).attr('data-user-id');
        $.ajax({
            'method':'GET',
            'url':pag_author_url,
            'data':{'page':page,'user_id':user_id,'_token':token}
        }).done(function(response){
            $('#main').find('#articles').html('');
            var articles = response['articles'];
            for(var val in articles){
                var image = articles[val]['image'] ? 'images/' + articles[val]['image'] : 'http://www.placehold.it/150x50';
                $('#main').find('#articles').append('<div class="media">' +
                    '<div class="media-left">' +
                    '<a href="home/article/show/' + articles[val]['id'] + '">' +
                    '<img width="150" class="media-object" src="' + image + '" alt="">' +
                    '</a>' +
                    '</div>' +
                    '<div class="media-body">' +
                    '<h4 class="media-heading">' + articles[val]['title'] + '</h4>' +
                    '<p class="text-justify">' + articles[val]['content'].substr(0,200) + '...</p>' +
                    '<p>' +
                    '<a class="btn btn-info" href="home/article/show/' + articles[val]['id'] + '">Read more</a>' +
                    '<a href="#" class="btn btn-danger pull-right ' + ((auth_user == '') ? "invisible" : "") + ' ' + ((auth_user == articles[val]['user_id']) ? "" : "disabled") + ' delete_link" data-articleId="' + articles[val]['id'] + '">Delete</a>' +
                    '<a class="btn btn-warning pull-right ' + ((auth_user == '') ? "invisible" : "") + ' ' + ((auth_user == articles[val]['user_id']) ? "" : "disabled") + ' " href="home/article/edit/' + articles[val]['id'] + '">Edit' +
                    '</a>' +
                    '</p>' +
                    '</div>' +
                    '</div><br>');
            }

            $('#main').find('#articles').append('<div class="row text-center"><nav aria-label="Page navigation"><ul class="pagination links"></ul> </nav></div>');
            for(var i=1;i<=response['total_pages'];i++){
                $('#main').find('#articles').find('.links').append('<li class=""><a class="pages_author" href="#" data-user-id="' + user_id + '" data-page="' + i + '">' + i + '</a></li>');
            }

            $('#main').find('#articles').find('li').each(function(){
                if($(this).find('a').attr('data-page') === page){
                    $(this).addClass('active');
                }
            });
        });
    });

    $('#articles').on('click','.delete_link',function(){
        if(confirm("Are you sure you want to delete this article?")){
            var article_id = $(this).attr('data-articleId');
            $.ajax({
                'method':'POST',
                'url':delete_url,
                'data':{'article_id':article_id,'_token':token}
            }).done(function(response){
                $('#main').find('#articles').html('');
                var articles = response['articles'];
                $('#main').prepend('<div class="alert alert-info alert-dismissible text-center" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response['message'] + '</div>');
                for(var val in articles){
                    var image = articles[val]['image'] ? 'images/' + articles[val]['image'] : 'http://www.placehold.it/150x50';
                    $('#main').find('#articles').append('<div class="media">' +
                        '<div class="media-left">' +
                        '<a href="home/article/show/' + articles[val]['id'] + '">' +
                        '<img width="150" class="media-object" src="' + image + '" alt="">' +
                        '</a>' +
                        '</div>' +
                        '<div class="media-body">' +
                        '<h4 class="media-heading">' + articles[val]['title'] + '</h4>' +
                        '<p class="text-justify">' + articles[val]['content'].substr(0,200) + '...</p>' +
                        '<p>' +
                        '<a class="btn btn-info" href="home/article/show/' + articles[val]['id'] + '">Read more</a>' +
                        '<a href="#" class="btn btn-danger pull-right ' + ((auth_user == '') ? "invisible" : "") + ' ' + ((auth_user == articles[val]['user_id']) ? "" : "disabled") + ' delete_link" data-articleId="' + articles[val]['id'] + '">Delete</a>' + '<a class="btn btn-warning pull-right ' + ((auth_user == '') ? "invisible" : "") + ' ' + ((auth_user == articles[val]['user_id']) ? "" : "disabled") + ' " href="home/article/edit/' + articles[val]['id'] + '">Edit' +
                        '</a>' +
                        '</p>' +
                        '</div>' +
                        '</div><br>');
                }

                $('#main').find('#articles').append('<div class="row text-center"><nav aria-label="Page navigation"><ul class="pagination links"></ul> </nav></div>');
                if(response['total_pages']>1){
                    for(var i=1;i<=response['total_pages'];i++){
                        $('#main').find('#articles').find('.links').append('<li><a class="pages" href="#" data-page="' + i + '">' + i + '</a></li>');
                    }
                }
            });
        }
    });

});

