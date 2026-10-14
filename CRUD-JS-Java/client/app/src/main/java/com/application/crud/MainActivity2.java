package com.application.crud;

import android.content.Intent;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class MainActivity2 extends AppCompatActivity {

    private Button btn_back, btn_submit;
    private EditText et_username, et_password;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);

        btn_back = findViewById(R.id.btn_back);

        btn_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(getApplicationContext(), MainActivity.class));
                finish();
            }
        });

        et_username = findViewById(R.id.et_username);
        et_password = findViewById(R.id.et_password);
        btn_submit = findViewById(R.id.btn_submit);

        String id = getIntent().getStringExtra("id");
        if (!id.equals("-")) {
            getUserById(id);
        }

        btn_submit.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String username = et_username.getText().toString().trim();
                String password = et_password.getText().toString().trim();

                if (username.isEmpty() || password.isEmpty()) {
                    Toast.makeText(MainActivity2.this, "all field is required...", Toast.LENGTH_SHORT).show();
                } else {
                    if (id.equals("-")) {
                        submitForm(username, password, Request.Method.POST, URL.User);
                    } else {
                        submitForm(username, password, Request.Method.PUT, URL.UserWithID(id));
                    }
                }
            }
        });
    }

    private void submitForm(String username, String password, int method, String url){
        StringRequest request = new StringRequest(method, url, new Response.Listener<String>() {
            @Override
            public void onResponse(String s) {
                try {
                    JSONObject jsonObject = new JSONObject(s);
                    String message = jsonObject.getString("message");
                    Toast.makeText(MainActivity2.this, message, Toast.LENGTH_SHORT).show();
                    startActivity(new Intent(MainActivity2.this, MainActivity.class));
                    finish();
                } catch (JSONException e) {
                    Toast.makeText(MainActivity2.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                    throw new RuntimeException(e);
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                Toast.makeText(MainActivity2.this, volleyError.getMessage(), Toast.LENGTH_SHORT).show();
                throw new RuntimeException(volleyError);
            }
        }) {
            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<>();
                params.put("username", username);
                params.put("password", password);
                return params;
            }
        };
        RequestQueue queue = Volley.newRequestQueue(MainActivity2.this);
        queue.add(request);
    }

    private void getUserById(String id) {
        StringRequest request = new StringRequest(Request.Method.GET, URL.UserWithID(id), new Response.Listener<String>() {
            @Override
            public void onResponse(String s) {
                try {
                    JSONObject jsonObject = new JSONObject(s);
                    et_username.setText(jsonObject.getString("username"));
                    et_password.setText(jsonObject.getString("password"));

                    int color = Color.parseColor("#4CAF50");
                    btn_submit.setBackgroundTintList(ColorStateList.valueOf(color));
                } catch (JSONException e) {
                    Toast.makeText(MainActivity2.this, e.getMessage(), Toast.LENGTH_SHORT).show();
                    throw new RuntimeException(e);
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError volleyError) {
                Toast.makeText(MainActivity2.this, volleyError.getMessage(), Toast.LENGTH_SHORT).show();
                throw new RuntimeException(volleyError);
            }
        });
        RequestQueue queue = Volley.newRequestQueue(MainActivity2.this);
        queue.add(request);
    }
}