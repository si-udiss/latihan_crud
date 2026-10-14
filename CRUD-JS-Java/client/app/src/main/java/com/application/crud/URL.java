package com.application.crud;

public class URL {
    public static final String IP = "http://192.168.0.100:3000";

    public static final String User = IP + "/users";
    public static String UserWithID(String id){
        return IP + "/users/" + id;
    }
}
