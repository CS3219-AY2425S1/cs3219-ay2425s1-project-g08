package com.example.questionbank.model;

import lombok.Getter;

/**
 * Enumeration representing various categories of questions.
 * <p>
 * Each category has a corresponding display name that is user-friendly
 * and can be used for presentation purposes in the application.
 * </p>
 */
@Getter // Lombok will generate the getter for the displayName field
public enum Category {

    /** Category for questions involving arrays and their manipulations. */
    ARRAYS("Arrays"),

    /** Category for questions involving hashing and hash-based
     * data structures. */
    HASHING("Hashing"),

    /** Category for questions involving the two-pointers technique. */
    TWO_POINTERS("Two Pointers"),

    /** Category for questions involving stack data structure concepts. */
    STACK("Stack"),

    /** Category for questions based on binary search algorithms. */
    BINARY_SEARCH("Binary Search"),

    /** Category for questions involving the sliding window technique. */
    SLIDING_WINDOW("Sliding Window"),

    /** Category for questions involving linked list data structures. */
    LINKED_LIST("Linked List"),

    /** Category for questions based on tree data structures and their
     * operations. */
    TREES("Trees"),

    /** Category for questions involving tries data structure. */
    TRIES("Tries"),

    /** Category for questions based on backtracking algorithms. */
    BACKTRACKING("Backtracking"),

    /** Category for questions involving heap or priority queue data
     * structures. */
    HEAP_OR_PRIORITY_QUEUE("Heap or Priority Queue"),

    /** Category for questions dealing with intervals and range-based
     * problems. */
    INTERVALS("Intervals"),

    /** Category for questions based on greedy algorithm techniques. */
    GREEDY("Greedy"),

    /** Category for advanced graph algorithm questions. */
    ADVANCED_GRAPHS("Advanced Graphs"),

    /** Category for one-dimensional dynamic programming questions. */
    ONE_D_DYNAMIC_PROGRAMMING("1-D Dynamic Programming"),

    /** Category for two-dimensional dynamic programming questions. */
    TWO_D_DYNAMIC_PROGRAMMING("2-D Dynamic Programming"),

    /** Category for questions involving bit manipulation techniques. */
    BIT_MANIPULATION("Bit Manipulation"),

    /** Category for math and geometry-based questions. */
    MATH_AND_GEOMETRY("Math and Geometry"),

    /** Category for questions based on matrix operations and
     * manipulations. */
    MATRIX("Matrix"),

    /** Category for questions involving strings and string
     * manipulation. */
    STRINGS("Strings"),

    /** Category for general algorithm questions. */
    ALGORITHMS("Algorithms"),

    /** Category for questions involving data structures in general. */
    DATA_STRUCTURES("Data Structures"),

    /** Category for questions based on recursive techniques. */
    RECURSION("Recursion"),

    /** Category for questions related to databases and database
     * operations. */
    DATABASES("Databases"),

    /** Category for brainteaser or puzzle-based questions. */
    BRAINTEASERS("Brainteasers");

    /** The display name of the category, which is user-friendly. */
    private final String displayName;

    /**
     * Constructs a new {@code Category} enum constant with the specified
     * display name.
     *
     * @param displayName the display name of the category
     */
    Category(String displayName) {
        this.displayName = displayName;
    }
}
