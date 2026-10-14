<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $result = User::all();
        return view('welcome', compact('result'));
    }

    public function create()
    {
        return view('add');
    }

    public function store(Request $request)
    {
        $user = User::create($request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone_number' => 'required',
            'password' => 'required',
        ]));

        $user->password = Hash::make($user->password);
        $user->save();

        return redirect('/');
    }

    public function show(string $id)
    {
        $result = User::find($id);
    }

    public function edit(string $id)
    {
        $result = User::find($id);
        return view('edit', compact('result'));
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id)->update($request->validate([
            'name' => 'required',
            'email' => 'required',
            'phone_number' => 'required',
        ]));

        if($request->password){
            User::find($id)->update([
                'password' => Hash::make($request->password),
            ]);
        }

        return redirect('/');
    }

    public function destroy(string $id)
    {
        User::destroy($id);

        return redirect('/');
    }
}
