@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <a title="Back to all articles" href="{{url('/home')}}" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-arrow-left"></span></a>
            </div>
            <div id="main" class="col-md-8">
                <h1 class="text-center">Create new article</h1>

                @if(Auth::user())

                        <div  id="create_form" class="text-left">
                            <div class="form-group">
                                {!! Form::label('title','Title: ')!!}
                                {!! Form::text('title',null,['class'=>'form-control']) !!}
                            </div>
                            <div class="form-group">
                                {!! Form::label('content','Content: ') !!}
                                {!! Form::textarea('content',null,['class'=>'form-control']) !!}
                            </div>
                            <div class="form-group">
                                {!! Form::label('image','Main image: ') !!}
                                {!! Form::file('image') !!}
                            </div>
                            <div class="form-group">
                                {!! Form::submit('Create',['class'=>'form-control btn btn-primary']) !!}
                            </div>
                        </div>

                @endif

            </div>
        </div>
    </div>
    <script>
        var create_url = '{{route('store_article')}}';
        var token = '{{csrf_token()}}';
    </script>
@endsection

@section('script')
    {!! Html::script('js/create.js') !!}
@endsection