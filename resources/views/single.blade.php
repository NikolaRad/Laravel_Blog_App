@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <a title="Back to all articles" href="{{url('/home')}}" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-arrow-left"></span></a>
            </div>
            <div class="col-md-8">
                <h1>{{$article->title}}</h1>
                <p class="lead">
                    by <span style="font-weight: bold;">{{$article->user->name}}</span>
                </p>
                <hr>
                <p><span class="glyphicon glyphicon-time"></span> Posted {{$article->created_at->diffForHumans()}} <span class="pull-right"><span class="glyphicon glyphicon-time"></span> Last update {{$article->updated_at->diffForHumans()}}</span></p>
                <hr>
                <img class="img-responsive" src="{{$article->image ? ('/images/'.$article->image) : 'http://placehold.it/800x300'}}" alt="">
                <hr>
                <p class="text-justify">{{$article->content}}</p>
                <hr>
            </div>
        </div>
    </div>
@endsection