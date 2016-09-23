<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::auth();

Route::get('/home','ArticlesController@index');

Route::get('/home/article',['uses'=>'ArticlesController@allArticles','as'=>'all_articles']);

Route::get('/home/article/author',['uses'=>'ArticlesController@author_articles','as'=>'author_articles']);

Route::post('/home/article/store',['middleware'=>'auth','uses'=>'ArticlesController@store','as'=>'store_article']);

Route::get('/home/article/create',['middleware'=>'auth','uses'=>'ArticlesController@create']);

Route::get('/home/article/show/{id}','ArticlesController@show');

Route::get('/home/article/edit/{id}',['middleware'=>'auth','uses'=>'ArticlesController@edit']);

Route::post('/home/article/update/{id}',['middleware'=>'auth','uses'=>'ArticlesController@update']);

Route::post('/home/article/delete',['middleware'=>'auth','uses'=>'ArticlesController@destroy','as'=>'delete_article']);

Route::get('/home/article/page',['uses'=>'ArticlesController@pagination_all','as'=>'pagination']);

Route::get('/home/article/author/page',['uses'=>'ArticlesController@pagination_author','as'=>'pagination_author']);



