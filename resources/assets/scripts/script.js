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
                '<a href="home/article/show/' + articles[val]['id'] + '">Read more</a>' +
                '<a class="pull-right" href="home/article/delete/' + articles[val]['id'] + '">Delete</a>' +
                '<a class="pull-right" href="home/article/edit/' + articles[val]['id'] + '">Edit' +
                '<span class="glyphicon glyphicon-option-vertical"></span>' +
                '</a>' +
                '</p>' +
                '</div>' +
                '</div><br>');
        }
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
                    '<a href="home/article/show/' + articles[val]['id'] + '">Read more</a>' +
                    '<a class="pull-right" href="">Delete</a>' +
                    '<a class="pull-right" href="">Edit <span class="glyphicon glyphicon-option-vertical"></span></a>' +
                    '</p>' +
                    '</div>' +
                    '</div><br>');
            }
        });
    });

    $('#create_article').on('click',function(){
        $('#create_form').slideToggle(1000);
    });

    $('#create_form').find('[type=submit]').on('click',function(){
        var form = $('#create_form');
        var title_field = form.find('[type=text]');
        var content_field = form.find('#content');
        var image_field = form.find('[type=file]');
        var title = title_field.val();
        var content = content_field.val();
        var image = image_field[0].files[0];
        var formData = new FormData();
        formData.append('title',title);
        formData.append('content',content);
        formData.append('image',image);
        if(title == ''){
            title_field.parent().addClass('has-error');
            form.parent().append('<div class="alert alert-danger alert-dismissible create_alert" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>Title field is required.' +
                '</div>');
        }else{
            title_field.parent().removeClass('has-error');
        }
        if(content == ''){
            content_field.parent().addClass('has-error');
            form.parent().append('<div class="alert alert-danger alert-dismissible create_alert" role="alert">' +
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>Content field is required.' +
                '</div>');
        }else{
            content_field.parent().removeClass('has-error');
        }
        if(title != '' && content != ''){
            $.ajax({
                'method':'POST',
                'url':create_url,
                'dataType':'json',
                'contentType':false,
                'processData':false,
                'data':formData,
                'headers':{'X-CSRF-TOKEN':token}
            }).done(function(response){
                $('#main').prepend('<div class="alert alert-info alert-dismissible text-center" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response['message'] + '</div>');
                var image = response['image'] != '' ? 'images/' + response['image'] : 'http://www.placehold.it/150x50';
                $('#main').find('#articles').prepend('<div class="media">' +
                    '<div class="media-left">' +
                    '<a href="home/article/show/' + articles[val]['id'] + '">' +
                    '<img width="150" class="media-object" src="' + image + '" alt="">' +
                    '</a>' +
                    '</div>' +
                    '<div class="media-body">' +
                    '<h4 class="media-heading">' + response['title'] + '</h4>' +
                    '<p class="text-justify">' + response['content'].substr(0,200) + '...</p>' +
                    '<p>' +
                    '<a href="home/article/show/' + articles[val]['id'] + '">Read more</a>' +
                    '<a class="pull-right" href="">Delete</a>' +
                    '<a class="pull-right" href="">Edit <span class="glyphicon glyphicon-option-vertical"></span></a>' +
                    '</p>' +
                    '</div>' +
                    '</div><br>');
                title_field.val('');
                content_field.val('');
                image_field.val('');
            });
        }
    });

});
