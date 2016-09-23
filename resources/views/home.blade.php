@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-2">
            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    Choose Author
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    @if($users)
                        <li><a href="{{url('/home')}}">All<span class="badge pull-right">{{count($articles)}}</span></a></li>
                        @foreach($users as $user)
                            <li><a class="authors" href="#" data-userId="{{$user->id}}">{{$user->name}}<span class="badge pull-right">{{count($user->articles)}}</span></a></li>
                        @endforeach
                    @endif
                </ul>
            </div>
        </div>
        <div id="main" class="col-md-8">
            @if(session('article_updated'))
                <div class="alert alert-info alert-dismissible text-center" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    {{session('article_updated')}}
                </div>
            @endif
            <div class="page-header text-center">
                <h1>Articles</h1>
            </div>
            <div id="articles">
                <div class="loader"></div>
                @if(count($articles) == 0 && Auth::guest())
                    <div class="alert alert-info text-center"><h4>There is no recent articles. In order to create you have to be logged in.</h4></div>
                @elseif(count($articles) == 0 && Auth::user())
                    <div class="alert alert-info text-center"><h4>There is no recent articles. Click on "Create new article" and make something interesting.</h4></div>
                @endif
            </div>
        </div>
        <div class="col-md-2 text-center">
            @if(Auth::user())
                <a href="/home/article/create" class="btn btn-primary">Create new article</a>
            @endif
        </div>

    </div>
</div>

<script>
    var auth_user = '{{Auth::user() ? Auth::user()->id : ''}}';
    var all_articles_url = '{{route('all_articles')}}';
    var author_articles_url = '{{route('author_articles')}}';
    var delete_url = '{{route('delete_article')}}';
    var pag_url = '{{route('pagination')}}';
    var pag_author_url = '{{route('pagination_author')}}';
    var token = '{{csrf_token()}}';
</script>
@endsection

@section('script')
    {!! Html::script('js/home.js') !!}
@endsection
