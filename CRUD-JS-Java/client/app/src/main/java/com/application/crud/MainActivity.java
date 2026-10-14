package com.application.crud;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {

    private Button btn_add;
    private ListView listView;
    private List<User> userList;
    private UserAdapter userAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btn_add = findViewById(R.id.btn_add);

        btn_add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(MainActivity.this, MainActivity2.class);
                intent.putExtra("id", "-");
                startActivity(intent);
                finish();
            }
        });

        userList = new ArrayList<>();
        listView = findViewById(R.id.listView);

        loadUsers();
    }

    private void loadUsers(){
        StringRequest request = new StringRequest(Request.Method.GET, URL.User, new Response.Listener<String>() {
            @Override
            public void onResponse(String s) {
                try {
                    JSONArray jsonArray = new JSONArray(s);

                    for (int i = 0; i < jsonArray.length(); i++) {
                        JSONObject jsonObject = jsonArray.getJSONObject(i);
                        String id = jsonObject.getString("id");
                        String username = jsonObject.getString("username");
                        String password = jsonObject.getString("password");

                        userList.add(new User(id, username, password));
                    }

                    userAdapter = new UserAdapter(userList, MainActivity.this);
                    listView.setAdapter(userAdapter);
                } catch (JSONException e) {
                    Toast.makeText(MainActivity.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                    throw new RuntimeException(e);
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                Toast.makeText(MainActivity.this, volleyError.getMessage(), Toast.LENGTH_SHORT).show();
                throw new RuntimeException(volleyError);
            }
        });
        RequestQueue queue = Volley.newRequestQueue(MainActivity.this);
        queue.add(request);
    }
}