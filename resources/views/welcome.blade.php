@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row">
        <div class="jumbotron">
            <h1 class="text-center">Welcome to our blog</h1>
            <p class="text-center">
                Here you can find many interesting articles from different kinds of fields. If you are not a member, you will be able only to read our articles. Otherwise, if you have had an account, you will be able to create some awesome articles. However, have a nice time.
            </p>
            @if(Auth::guest())
                <p class="text-center"><a class="btn btn-primary btn-lg" href="{{ url('/login') }}" role="button">Login</a></p>
            @else
                <p class="text-center"><a class="btn btn-primary btn-lg" href="{{ url('/logout') }}" role="button">Logout</a></p>
            @endif
        </div>
    </div>
</div>

@endsection
