<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
         return Inertia::render('Posts/Index', [
            'posts' => Post::with('user:id,name')->latest()->get()
         ]); 
        
    }

    
    public function store(Request $request)
    {
        //Validar datos
        $validated= $request->validate([ 
            'title'=>'required|string|max:60',
            'body' => 'required|string|max:2550',
        ]);

       
    $request->user()->posts()->create($validated);
       return redirect(route('posts.index'));
       
    }

    public function update(Request $request, Post $post)
    {
        $this->authorize('update', $post);

        //Validar datos
        $validated= $request->validate([ 
            'title'=>'required|string|max:60',
            'body' => 'required|string|max:2550',
        ]);

        $post->update($validated);
        return redirect(route('posts.index'));
    }

    public function destroy(Post $post)
    {
        $this->authorize('delete', $post);
        $post->delete();
        return redirect(route('posts.index'));
    }
}
