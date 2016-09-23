<?php

namespace App\Http\Controllers;

use App\Article;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;

class ArticlesController extends Controller
{
    private $articles_per_page = 5;

    public function index()
    {
        $articles = Article::all();
        $users = User::all();
        return view('home',compact('users','articles'));
    }

    public function allArticles()
    {
        $total_articles = count(Article::all());
        $total_pages = ceil($total_articles/$this->articles_per_page);
        $articles = Article::orderBy('id','desc')->limit($this->articles_per_page)->get();
        sleep(0.5);
        return response()->json(['articles'=>$articles,'total'=>$total_articles,'articles_per_page'=>$this->articles_per_page,'total_pages'=>$total_pages]);
    }

    public function pagination_all(Request $request)
    {
        $total_articles = count(Article::all());
        $total_pages = ceil($total_articles/$this->articles_per_page);
        $page = $request->get('page');
        $offset = $page * $this->articles_per_page - $this->articles_per_page;
        $articles = Article::orderBy('id','desc')->offset($offset)->limit($this->articles_per_page)->get();
        return response()->json(['articles'=>$articles,'total_pages'=>$total_pages]);
    }

    public function author_articles(Request $request)
    {
        $user_id = $request->get('user_id');
        $user = User::findOrFail($user_id);
        $total_articles = count(Article::where('user_id',$user_id)->get());
        $total_pages = ceil($total_articles/$this->articles_per_page);
        $articles = Article::where('user_id',$user_id)->orderBy('id','desc')->limit($this->articles_per_page)->get();
        return response()->json(['username'=>$user->name,'articles'=>$articles,'total'=>$total_articles,'articles_per_page'=>$this->articles_per_page,'total_pages'=>$total_pages]);
    }

    public function pagination_author(Request $request)
    {
        $user_id = $request->get('user_id');
        $total_articles = count(Article::where('user_id',$user_id)->get());
        $total_pages = ceil($total_articles/$this->articles_per_page);
        $page = $request->get('page');
        $offset = $page * $this->articles_per_page - $this->articles_per_page;
        $articles = Article::where('user_id',$user_id)->orderBy('id','desc')->offset($offset)->limit($this->articles_per_page)->get();
        return response()->json(['articles'=>$articles,'total_pages'=>$total_pages]);
    }

    public function create(){
        return view('create');
    }

    public function store(Request $request)
    {
        $article = new Article();
        $title = $request->get('title');
        $content = $request->get('content');
        $image = '';
        if($request->file('image')){
            $image = $request->file('image')->getClientOriginalName() . time();
            $request->file('image')->move(base_path('public/images'),$image);
            $article->image = $image;
        }
        $user_id = Auth::user()->id;
        $article->title = $title;
        $article->content = $content;
        $article->user_id = $user_id;
        if($article->save()){
            $message = "Article has been successfully created.";
        }else{
            $message = "There was an error and article wasn't been created.";
        }
        return response()->json(['article_id'=>$article->id,'message'=>$message]);
    }

    public function show($id)
    {
        $article = Article::findOrFail($id);
        return view('single',compact('article'));
    }

    public function edit($id)
    {
        $article = Article::findOrFail($id);
        return view('edit',compact('article'));
    }

    public function update(Request $request, $id)
    {
        $this->validate($request,['title'=>'required','content'=>'required']);
        $article = Article::findOrFail($id);
        $title = $request->get('title');
        $content = $request->get('content');
        if($image = $request->file('image')){
            $name = $image->getClientOriginalName() . time();
            $image->move(base_path('public/images'),$name);
            $article->image = $name;
        }
        $article->title = $title;
        $article->content = $content;
        if($article->save()){
            $request->session()->flash('article_updated','Article ' . $article->title . ' has been successfully updated.');
        }
        return redirect('/home');
    }

    public function destroy(Request $request)
    {
        $article_id = $request->get('article_id');
        $article = Article::findOrFail($article_id);
        if($article->image){
            unlink(public_path() . '/images/' . $article->image);
        }
        $title = $article->title;
        if($article->delete()){
            $message = "Article " . $title . " has been successfully deleted.";
        }else{
            $message = "There was an error. Article " . $title . " was not deleted.";
        }
        $total_articles = count(Article::all());
        $total_pages = ceil($total_articles/$this->articles_per_page);
        $articles = Article::orderBy('id','desc')->limit($this->articles_per_page)->get();
        return response()->json(['articles'=>$articles,'total'=>$total_articles,'articles_per_page'=>$this->articles_per_page,'total_pages'=>$total_pages,'message'=>$message]);
    }
}
