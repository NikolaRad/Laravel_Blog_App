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
        form.parent().append('<div class="alert alert-danger alert-dismissible text-center create_alert" role="alert">' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>Title field is required.' +
            '</div>');
    }else{
        title_field.parent().removeClass('has-error');
    }
    if(content == ''){
        content_field.parent().addClass('has-error');
        form.parent().append('<div class="alert alert-danger alert-dismissible text-center create_alert" role="alert">' +
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
            $('#main').prepend('<div class="alert alert-info alert-dismissible text-center" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + response['message'] + ' <a href="/home/article/show/' + response['article_id'] + '">View</a></div>');
            title_field.val('');
            content_field.val('');
            image_field.val('');
        });
    }
});
