package com.application.crud;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

public class UserAdapter extends BaseAdapter {
    private List<User> userList;
    private Context context;

    public UserAdapter(List<User> userList, Context context) {
        this.userList = userList;
        this.context = context;
    }

    @Override
    public int getCount() {
        return userList.size();
    }

    @Override
    public Object getItem(int i) {
        return userList.get(i);
    }

    @Override
    public long getItemId(int i) {
        return i;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        if (view == null){
            view = LayoutInflater.from(context).inflate(R.layout.template_list, viewGroup, false);
        }

        User user = userList.get(i);

        TextView username = view.findViewById(R.id.tv_username);
        TextView password = view.findViewById(R.id.tv_password);
        Button btn_edit = view.findViewById(R.id.btn_edit);
        Button btn_delete = view.findViewById(R.id.btn_delete);

        btn_edit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(context, MainActivity2.class);
                intent.putExtra("id", user.getId());
                context.startActivity(intent);
            }
        });

        btn_delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                StringRequest request = new StringRequest(Request.Method.DELETE, URL.UserWithID(user.getId()), new Response.Listener<String>() {
                    @Override
                    public void onResponse(String s) {
                        try {
                            JSONObject jsonObject = new JSONObject(s);
                            String message = jsonObject.getString("message");
                            Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
                            context.startActivity(new Intent(context, MainActivity.class));
                        } catch (JSONException e) {
                            Toast.makeText(context, e.getMessage(), Toast.LENGTH_SHORT).show();
                            throw new RuntimeException(e);
                        }
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError volleyError) {
                        Toast.makeText(context, volleyError.getMessage(), Toast.LENGTH_SHORT).show();
                        throw new RuntimeException(volleyError);
                    }
                });
                RequestQueue queue = Volley.newRequestQueue(context);
                queue.add(request);
            }
        });

        username.setText(user.getUsername());
        password.setText(user.getPassword());

        return view;
    }
}
