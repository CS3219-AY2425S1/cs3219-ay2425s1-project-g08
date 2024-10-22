package com.example.questionbank.model;

public enum Category {
    ARRAYS("Arrays"),
    HASHING("Hashing"),
    TWO_POINTERS("Two Pointers"),
    STACK("Stack"),
    BINARY_SEARCH("Binary Search"),
    SLIDING_WINDOW("Sliding Window"),
    LINKED_LIST("Linked List"),
    TREES("Trees"),
    TRIES("Tries"),
    BACKTRACKING("Backtracking"),
    HEAP_OR_PRIORITY_QUEUE("Heap or Priority Queue"),
    INTERVALS("Intervals"),
    GREEDY("Greedy"),
    ADVANCED_GRAPHS("Advanced Graphs"),
    ONE_D_DYNAMIC_PROGRAMMING("1-D Dynamic Programming"),
    TWO_D_DYNAMIC_PROGRAMMING("2-D Dynamic Programming"),
    BIT_MANIPULATION("Bit Manipulation"),
    MATH_AND_GEOMETRY("Math and Geometry"),
    MATRIX("Matrix"),
    STRINGS("Strings"),
    ALGORITHMS("Algorithms"),
    DATA_STRUCTURES("Data Structures"),
    RECURSION("Recursion"),
    DATABASES("Databases"),
    BRAINTEASERS("Brainteasers");

    private final String displayName;

    Category(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
