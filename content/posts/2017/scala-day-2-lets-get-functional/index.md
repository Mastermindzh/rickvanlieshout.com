---
title: Scala Day 2 - Let's get functional
date: "2017-04-03"
template: "post"
draft: false
category: "development"
tags:
  - "development"
  - "slsw"
description: "Today we'll focus on the functional aspects of Scala"
disqusId: "22"
---

I feel like I covered a lot in the first chapter but that I haven't yet found the real power of functional programming. Day 2 promises to change that by diving right into functional programming.

## Val vs Var

I've already looked at this on day 1, looking back at the chapter I realize I wasn't yet meant to find out about the difference between "val vs var". In short, val is immutable while var is mutable.

The remainder of the chapter emphasizes the importance of using val, especially while designing an application with concurrency in mind.

> This basic design philosophy is the key element that differentiates functional programming from object-oriented programming: mutable state limits concurrency.
>
> \- Tate, Bruce, Seven Languages in seven weeks (p 155)

## Collections

In the first blog I already pointed out some of the features I had discovered about collections. I used some of these awesome features in my day 1 self-study.

The second chapter goes into more detail about collections. First up are lists.

## Lists

Scala's lists, of type List, are ordered collections of elements with random access. One of the things the book immediately goes into is the ability to store different types of objects in the list. Take a look at the interpreters response when I try to create a list of two strings and an integer:

```scala
scala> List("one", "two", 3)
res6: List[Any] = List(one, two, 3)
```

This returns a list with data type "Any", which is the catchall data type for Scala. To access an item we use the "()" operator. Think of it as the list being a method on which you "call" a get function. Doing so will return an "Any" object, which to me is weird because it's type could be inferred as well.

```scala
scala> List("one", "two", 3)(2)
res7: Any = 3
```

Trying to access a number outside the list will throw either a "NoSuchElement" exception (if the index specified is too high) or a regular old "IndexOutOfBoundsException". (if the index is below 0)

## Sets

A set is like a list, but it doesn't have any explicit order. We can specify a set with the Set keyword like so:

```scala
scala> val animals = Set("lions", "tigers", "bears")
animals: scala.collection.immutable.Set[java.lang.String] = Set(lions, tigers, bears)
```

Adding or subtracting from it is as easy as using the + or - operator:

```scala
scala> animals + "armadillos"
res0: scala.collection.immutable.Set[String] = Set(lions, tigers, bears, armadillos)

scala> res0 - "tigers"
res2: scala.collection.immutable.Set[String] = Set(lions, bears, armadillos).
```

Combining sets can be done with the "++" operator (or list.union) and the "--" operator (or list.diff) will return a list of differences between the two lists:

```scala
scala> animals ++ Set("armadillos", "raccoons")
res3: scala.collection.immutable.Set[String] = Set(bears, tigers, lions, armadillos, raccoons)

scala> animals -- Set("lions", "bears")
res4: scala.collection.immutable.Set[String] = Set(tigers)
```

Set intersection can be done with "List.intersect" like so:

```scala
animals.intersect(Set("armadillos","raccoons","lions","tigers"))
res8: scala.collection.immutable.Set[String] = Set(lions, tigers)
```

As I've mentioned before, Sets, unlike lists, are independent of order. This rule will mean that equality for sets is different. Therefor evaluating two sets with the same elements in a different order will return true:

```scala
scala> Set(1, 2, 3) == Set(3, 2, 1)
res9: Boolean = true
```

## Maps

A map is a key-value pair, similar to hashmaps in Java. Specifying a map of ordinal numbers can be done with:

```scala
val ordinals = Map(0 -> "zero", 1 -> "one", 2 -> "two")
ordinals: scala.collection.immutable.Map[Int,String] = Map(0 -> zero, 1 -> one, 2 -> two)
```

We can also specify the type for a HashMap like so:

```scala
import scala.collection.mutable.HashMap
val map = new HashMap[Int, String]
```

We can then add items like so:

```scala
map += 4 -> "four"
map += 8 -> "eight"
```

## List methods

Scala supports anonymous functions, I've used this to solve some problems in the Tic-Tac-Toe game from the first blog.

Apart from the "foreach" method, there are some other useful list methods:

<!-- prettier-ignore -->
| Function     | What it does                                 |
| ------------ | -------------------------------------------- |
| List.head    | Returns the first element                    |
| List.tail    | Returns all but the first element            |
| List.last    | Returns the last element                     |
| list.init    | Returns all but the last element (recursion) |
| List.reverse | Reverses the list                            |
| List.drop(2) | Removes the first two objects.               |

## Count, map filter and Others

Scala has many other functions that manipulate lists in various ways. I won't go over these but the code examples below should give you an idea of the possibilities.

```scala
scala> val words = List("peg", "al", "bud", "kelly")
words: List[String] = List(peg, al, bud, kelly)

scala> words.count(word => word.size > 2)
res0: Int = 3

scala> words.filter(word => word.size > 2)
res1: List[String] = List(peg, bud, kelly)

scala> words.map(word => word.size)
res2: List[Int] = List(3, 2, 3, 5)

scala> words.forall(word => word.size > 1)
res3: Boolean = true

scala> words.exists(word => word.size > 5)
res4: Boolean = false
```

We can also parameterise our anonymous functions so that we can sort a list based on the first letter of each word. We do that like this:

```scala
words.sortWith((s, t) => s.charAt(0).toLower < t.charAt(0).toLower)
```

We can also sort by word size:

```scala
words.sort((s, t) => s.size undefined
```

## foldLeft

The foldLeft method takes an initial value and a code block. It will take the initial value and for each item in the list run the code block passing back in the calculated value. Let me show you:

```scala
val list = List(1, 2, 3)
val sum = (0 /: list) {(sum, i) => sum + i}
```

1. Initially, /: takes the initial value, 0 , and the first element of list , 1 ,and passes them into the code block. sum is 0 , i is 1 , and the result of 0 + 1 is 1 .
2. Next, /: takes 1 , the result returned from the code block, and folds it back into the calculation as sum . So, sum is 1 ; i is the next element of list , or 2 ; and the result of the code block is 3 .
3. Finally, /: takes 3, the result returned from the code block, and folds it back into the calculation as sum . So, sum is 3 ; i is the next element of list , or 3 ; and sum + i is 6 .

We can achieve the same thing by using the foldLeft method like so:

```scala
list.foldLeft(0)((sum, value) => sum + value)
```

## Self-Study

I'm starting to like Scala more and more, the practical challenge for this week was really fun albeit a bit simple.
The theoretical questions for day 2 are:

1. A discussion on how to use Scala files
2. What makes a closure different from a code block

Once again these questions are trivial if you've actually paid attention while reading the book. Anyway, here are the answers:

1. [https://docs.scala-lang.org/tutorials/scala-for-java-programmers.html](https://docs.scala-lang.org/tutorials/scala-for-java-programmers.html)
2. [https://stackoverflow.com/questions/1812401/exactly-what-is-the-difference-between-a-closure-and-a-block](https://stackoverflow.com/questions/1812401/exactly-what-is-the-difference-between-a-closure-and-a-block)

The results of the second day's practical assignments can found on [Github](https://github.com/Mastermindzh/Seven-Languages-in-Seven-Weeks/tree/master/Scala/Day%202/src/myApp) or below:

```scala
/**
   Self-Study day 2, practical assignments:

   • Use foldLeft to compute the total size of a list of strings.

   • Write a Censor trait with a method that will replace the curse words
     Shoot and Darn with Pucky and Beans alternatives. Use a map to
     store the curse words and their alternatives.

   • Load the curse words and alternatives from a file.

*/

trait Censor {

  val curseWords = Map("shoot" -> "pucky", "darn" -> "beans")

  /**
    * Awesome function which will build a curseWords map from a file.
    * @param input string input
    * @param path curseWords file
    * @return clean string
    */
  def censorTextUsingFile(input: String, path: String) : String = {
    // neat little statement which will read a file from a path, get its lines
    // for each line it will split on "=" and put the values in the map
    val myMap = io.Source.fromResource(path).getLines.foldLeft(Map[String, String]())((map, line) =>
      map + (line.split("=")(0) -> line.split("=")(1))
    )

    censorText(input, myMap)
  }

  /**
    * censors input text using the builtin curseWords map or @param map
    * @param input string to be censored
    * @param map optional, map of curse words
    * @return censored string
    */
  def censorText(input: String, map: Map[String, String] = curseWords) : String ={
    val words = input.split(" ")

    words.map(word => map.getOrElse(word.toLowerCase, word)).mkString(" ")

  }
}

object MyApp extends App with Censor{

  // print combined size of a list of strings
  val list = List("one", "two" , "three")
  println(list.foldLeft(0)((sum, value) => sum + value.length))

  val strToCensor = "Shoot !, this darn thing won't work!"

  // censor using builtin map
  println(this.censorText(strToCensor))

  // censor using curseWords.txt file from resources folder
  println(this.censorTextUsingFile(strToCensor, "curseWords.txt"))

}
```
