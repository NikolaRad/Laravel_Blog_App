@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <a title="Back to all articles" href="{{url('/home')}}" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-arrow-left"></span></a>
            </div>
            <div class="col-md-8">
                <h1 class="text-center">Edit article</h1>

                @if($errors)
                    @foreach($errors->all() as $error)
                        <div class="alert alert-danger alert-dismissible text-center" role="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            {{$error}}
                        </div>
                    @endforeach
                @endif

                {!! Form::open(['method'=>'POST','action'=>['ArticlesController@update',$article->id],'files'=>true]) !!}
                <div class="form-group {{$errors->has('title') ? 'has-error' : ''}}">
                    {!! Form::label('title','Title: ')!!}
                    {!! Form::text('title',$article->title,['class'=>'form-control']) !!}
                </div>
                <div class="form-group {{$errors->has('content') ? 'has-error' : ''}}">
                    {!! Form::label('content','Content: ') !!}
                    {!! Form::textarea('content',$article->content,['class'=>'form-control']) !!}
                </div>
                <div class="form-group">
                    {!! Form::label('image','Main image: ') !!}
                    {!! Form::file('image') !!}
                </div>
                <div class="row">
                    <div class="col-md-12 text-center">
                        <img src="{{$article->image ? '/images/'.$article->image : 'http://www.placehold.it/800x200'}}" alt="" class="img-responsive img-thumbnail">
                        <p>Main image</p>
                    </div>
                </div>
                <br>
                <div class="form-group">
                    {!! Form::submit('Update',['class'=>'form-control btn btn-primary']) !!}
                </div>
                {!! Form::close() !!}

            </div>
        </div>
    </div>
@endsection